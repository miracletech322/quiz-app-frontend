import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import config from '../../config/index';
import { Accordion } from "@szhsin/react-accordion";
import AccordionItem from "./../../components/Accordian/AccordianItem";
import { toast } from 'react-toastify';
import CheckboxP from './../../components/Checkboxes/ChecoboxP';

const Examination: React.FC = () => {

    const [selectedOption, setSelectedOption] = useState<string>('');
    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleExamination();
        }
    };

    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [isStart, setIsStart] = useState(false);
    const [count, setCount] = useState(0);
    const [problemList, setProblemList] = useState([])

    const readQuiz = () => {
        const requestData = {
            type: selectedOption,
            count: count
        }

        axios.post(`${config.SERVER_URL}exam/read`, requestData).then(res => {
            if (res.data.status == 'success') {
                for (let i = 0; i < res.data.problems.length; i++) {
                    res.data.problems[i].answer = '';
                }
                setProblemList(res.data.problems);
            }
        })
    }

    const handleExamination = () => {
        if (selectedOption == "") {
            toast.warn("Please choose subject");
            return;
        }

        if (count == "") {
            toast.warn("Please input problem count");
            return;
        }
        setIsStart(true);
        readQuiz();
    }

    const handleSubmit = () => {
        axios.post(`${config.SERVER_URL}exam/save`, problemList).then(res => {
            if (res.data.status == 'success') {
                toast.success("Your grade is " + res.data.mark.toFixed(0) + " points");
            }
        })
        setIsStart(false);
    }

    const handleFinish = () => {
        setIsStart(false);
    }

    const handleCheck = (item, answer) => {
        item.answer = answer;
        setProblemList(prevList =>
            prevList.map(problem =>
                problem._id == item._id ? { ...problem, ...item } : problem
            )
        );
    }

    useEffect(() => {
    }, [problemList])

    return (
        <>
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Examination" />

                <div className="grid grid-cols-1 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Examination Pannel
                                </h3>
                            </div>
                            <div className="p-7">
                                {
                                    isStart == false ?
                                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                            <div className="w-full sm:w-1/3">
                                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                    <select
                                                        value={selectedOption}
                                                        onChange={(e) => {
                                                            setSelectedOption(e.target.value);
                                                            changeTextColor();
                                                        }}
                                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                                                            }`}
                                                    >
                                                        <option value="" disabled className="text-body dark:text-bodydark">
                                                            Select your subject
                                                        </option>
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
                                            <div className="w-full sm:w-1/3">
                                                <input
                                                    type="number"
                                                    placeholder="Count of Problem"
                                                    onChange={(e) => setCount(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                            <div className="w-full sm:w-1/3">
                                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleExamination}>
                                                    Start Examination
                                                </button>
                                            </div>
                                        </div> :
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Total: {problemList.length} Problem(s)
                                            </h3>
                                            <div className="mx-2 my-4 border-t">
                                                {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
                                                <Accordion transition transitionTimeout={200}>
                                                    {

                                                        problemList.map((item, i) => {
                                                            return (<AccordionItem key={i} header={item.problem} initialEntered>
                                                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                                                        {item.problem}
                                                                    </div>
                                                                    <div className="flex flex-col gap-5.5 p-6.5">
                                                                        {
                                                                            item.items.map((text, j) => <CheckboxP
                                                                                key={j}
                                                                                setChecked={handleCheck}
                                                                                text={text}
                                                                                problem={item}
                                                                            />)
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </AccordionItem>)
                                                        })
                                                    }
                                                </Accordion>
                                            </div>
                                            <div className="flex justify-end gap-4.5">
                                                <button
                                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 mr-5"
                                                    type="button"
                                                    onClick={handleSubmit}

                                                >
                                                    Submit Answer
                                                </button>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Examination;
