import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import config from '../../config/index';
import { Accordion } from "@szhsin/react-accordion";
import AccordionItem from "./../../components/Accordian/AccordianItem2";
import { toast } from 'react-toastify';
import Checkbox from '../../components/Checkboxes/Checkbox';
import CheckboxProC from '../../components/Checkboxes/CheckboxProC';

const MakeCourse: React.FC = () => {

    const [viewtype, setViewtype] = useState<string>('all');
    const changeViewTypeColor = () => {
        setIsViewtype(true);
    };
    const [isViewType, setIsViewtype] = useState<boolean>(false);

    const [courseType, setCourseType] = useState<string>('Mathematics');
    const changeCourseTypeColor = () => {
        setIsCourseType(true);
    };
    const [isCourseType, setIsCourseType] = useState<boolean>(false);

    const [history, setHistory] = useState([]);
    const [rightCout, setRightCout] = useState(0);
    const [allCout, seAllCout] = useState(0);
    const [wrongcout, seWrongCout] = useState(0);
    const [level, setlevel] = useState("Beginner");

    useEffect(() => {
        readQuiz();
    }, [])

    useEffect(() => {
        readQuiz();
        getcount("right")
        getcount("all")
        getcount("wrong")
    }, [viewtype, courseType])

    const getcount = (type) => {
        const requestData = {
            viewtype: type,
            courseType: courseType
        }

        let url = `${config.SERVER_URL}history/read`;

        axios.post(url, requestData).then(res => {
            if (res.data.status == 'success') {
                console.log(res.data.data.length);
                if (type == "all") {
                    seAllCout(res.data.data.length)
                }
                if (type == "right") {
                    setRightCout(res.data.data.length)
                    setlevel("Beginner");
                    if (res.data.data.length > 50) {
                        setlevel("Middle");
                        if (res.data.data.length > 100) {
                            setlevel("Senior");
                        }
                    }
                }
                if (type == "wrong") {
                    seWrongCout(res.data.data.length)
                }
            }
        })
    }

    const readQuiz = () => {
        const requestData = {
            viewtype: viewtype,
            courseType: courseType
        }

        let url = `${config.SERVER_URL}history/read`;

        axios.post(url, requestData).then(res => {
            if (res.data.status == 'success') {
                setHistory(res.data.data);
            }
        })
    }

    return (
        <>
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="History" />
                <div className="grid grid-cols-1 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    History Panel
                                </h3>
                            </div>
                            <div className="p-7">
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                    <div className="w-full sm:w-1/2">
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={viewtype}
                                                onChange={(e) => {
                                                    setViewtype(e.target.value);
                                                    changeViewTypeColor();
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isViewType ? 'text-black dark:text-white' : ''
                                                    }`}
                                            >
                                                <option value="all" className="text-body dark:text-bodydark">
                                                    All
                                                </option>
                                                <option value="right" className="text-body dark:text-bodydark">
                                                    Right
                                                </option>
                                                <option value="error" className="text-body dark:text-bodydark">
                                                    Wrong
                                                </option>

                                            </select>

                                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill=""
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={courseType}
                                                onChange={(e) => {
                                                    setCourseType(e.target.value);
                                                    changeCourseTypeColor();
                                                }}
                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isCourseType ? 'text-black dark:text-white' : ''
                                                    }`}
                                            >

                                                <option value="Mathematics" className="text-body dark:text-bodydark">
                                                    Mathematics
                                                </option>
                                                <option value="Physics" className="text-body dark:text-bodydark">
                                                    Physics
                                                </option>
                                                <option value="Chemistry" className="text-body dark:text-bodydark">
                                                    Chemistry
                                                </option>
                                            </select>

                                            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                <svg
                                                    className="fill-current"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill=""
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/3">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Total: {allCout} history(s)
                                            </h3>
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Level:{level}
                                            </h3>
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                            <div className="inline-flex rounded-full ml-auto bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success">Rigth:{rightCout}</div>
                                            <label htmlFor="">    </label>
                                            <div className="inline-flex rounded-full ml-auto bg-opacity-10 py-1 px-3 text-sm font-medium bg-danger text-danger">Wrong:{wrongcout}</div>
                                        </div>
                                    </div>
                                    <div className="mx-2 my-4 border-t">
                                        <Accordion transition transitionTimeout={200}>
                                            {
                                                history.map((item, i) =>
                                                    item.mark == 100 ?
                                                        < AccordionItem key={i} header={item.problem} result={"Right"} date={item.createdAt.split("T")[0]} initialEntered >
                                                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                                                    <div className='justify-between gap-4 sm:flex'>
                                                                        <div>
                                                                            <div className="py-2">
                                                                                {item.problem}
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-5.5 p-6.5">
                                                                    {
                                                                        item.items.map((text, j) =>
                                                                            text == item.answer ?
                                                                                <Checkbox checked={true} key={j} text={text} />
                                                                                :
                                                                                <Checkbox checked={false} key={j} text={text} />
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </AccordionItem>
                                                        :
                                                        < AccordionItem key={i} header={item.problem} result={"Wrong"} date={item.createdAt.split("T")[0]} initialEntered >
                                                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                                                    <div className='justify-between gap-4 sm:flex'>
                                                                        <div>
                                                                            <div className="py-2">
                                                                                {item.problem}
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-5.5 p-6.5">
                                                                    {
                                                                        item.items.map((text, j) =>
                                                                            text == item.answer ?
                                                                                <Checkbox checked={true} key={j} text={text} />
                                                                                :
                                                                                <Checkbox checked={false} key={j} text={text} />
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </AccordionItem>
                                                )
                                            }
                                        </Accordion>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default MakeCourse;
