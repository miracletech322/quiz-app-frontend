import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultLayout from './layout/DefaultLayout';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import MakeCourse from './pages/Teacher/MakeCourse';
import Examination from './pages/Student/Examination';
import History from './pages/Student/History';
import ChatPage from './pages/Student/Chat';

function App() {

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
      // axios.defaults.sidebar.common['Authorization'] = localStorage.getItem("token");
    }
  }, [])

  const [loading, setLoading] = useState<boolean>(true)
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Signin Page | Quiz" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin Page | Quiz" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup Page | Quiz" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/make-course"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Make Course Page | Quiz" />
                <MakeCourse />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/examination"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Examination Page | Quiz" />
                <Examination />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="History Page | Quiz" />
                <History />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <DefaultLayout>
                <PageTitle title="Chat Page | Quiz" />
                <ChatPage />
              </DefaultLayout>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
