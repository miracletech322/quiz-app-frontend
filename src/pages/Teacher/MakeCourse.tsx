import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import config from '../../config/index';
import { Accordion } from "@szhsin/react-accordion";
import AccordionItem from "./../../components/Accordian/AccordianItem";
import { toast } from 'react-toastify';
import Checkbox from '../../components/Checkboxes/Checkbox';
import CheckboxProC from '../../components/Checkboxes/CheckboxProC';
import { useNavigate } from 'react-router-dom';

const MakeCourse: React.FC = () => {

  const [selectedOption, setSelectedOption] = useState<string>('');
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const [problemList, setProblemList] = useState([])
  const [total, setTotal] = useState(false)

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    firstname: '',
    lastname: '',
    role: '',
  })

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      makeQuestion();
    }
};

  const makeQuestion = () => {

    if (document.getElementById("problemPdf").files.length == 0) {
      toast.warn("Please choose PDF file");
      return;
    }

    if (count == '') {
      toast.warn("Please input problem count");
      return;
    }

    if (selectedOption == '') {
      toast.warn("Please input problem count");
      return;
    }

    const problemPdf = document.getElementById("problemPdf").files[0];

    const formData = new FormData();
    formData.append("count", count);
    formData.append("problemPdf", problemPdf);
    formData.append("type", selectedOption);


    axios.post(`${config.SERVER_URL}course/make-problem`, formData).then(res => {
      toast.info("Completed upload and made problems successfully")
      readQuiz();
    })
  }

  const handleSetAll = (value: boolean) => {
    setTotal(value)
  }

  useEffect(() => {
    const json = localStorage.getItem("user");
    const userObj = JSON.parse(json);
    console.log();
    // setUser(userObj);
    if(userObj.role=="0"){
      navigate("/chat");
    }
    readQuiz();
  }, [])

  useEffect(() => {
    readQuiz();
  }, [selectedOption, total])

  const readQuiz = () => {
    let type = selectedOption;
    if (selectedOption == "")
      type = "Mathematics";

    const requestData = {
      type: type,
    }

    let url = `${config.SERVER_URL}course/read-mine`;
    if (total) {
      url = `${config.SERVER_URL}course/read`;
    }

    axios.post(url, requestData).then(res => {
      if (res.data.status == 'success') {
        setProblemList(res.data.problems);
      }
    })
  }

  const handleDelete = (event, item: Object) => {
    const requestData = {
      _id: item._id
    }
    axios.post(`${config.SERVER_URL}course/delete`, requestData).then(res => {
      toast.info("Delete successfully")
      readQuiz();
    })
  }

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Main Course" />

        <div className="grid grid-cols-1 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Make Course Panel
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div>
                    <input
                      id="problemPdf"
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
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
                  <div>
                    <input
                      type="number"
                      placeholder="Count of Problem"
                      onChange={(e) => setCount(e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className='py-3'>
                    <CheckboxProC isChecked={total} setIsChecked={handleSetAll} />
                  </div>
                </div>
                <button  onKeyDown={handleKeyDown} onClick={makeQuestion} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Make Question(s)
                </button>
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
                                <div className='justify-between gap-4 sm:flex'>
                                  <div>
                                    <div className="py-2">
                                      {item.problem}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="relative z-20 inline-block">
                                      <button
                                        className="flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                        type="button"

                                        onClick={(event) => handleDelete(event, item)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-5.5 p-6.5">
                                {
                                  item.items.map((text, j) =>
                                    text == item.answer ?
                                      <Checkbox checked={true} key={j} text={text} /> :
                                      <Checkbox checked={false} key={j} text={text} />
                                  )
                                }
                              </div>
                            </div>
                          </AccordionItem>)
                        })
                      }
                    </Accordion>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeCourse;
