import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { Main_context } from "../../stores/main_store/main_store";
import Admin_Main from "./Admin_Main";
import { useNavigate } from "react-router";
export function Admin() {
  const adminLoginFromRef = useRef(null);
  const context = useContext(Main_context);
  let navigator = useNavigate();
  async function adminLoginHandler(defs) {
    try {
      defs.preventDefault();
      let adminLoginForm = new FormData(adminLoginFromRef.current);
      let adminLoginFormData = Object.fromEntries(adminLoginForm.entries());
      console.log(adminLoginFormData);
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin-login`,
        adminLoginFormData,
        { withCredentials: true }
      );
      console.log(response);
      if (response?.data?.success && !response?.data?.error) {
        console.log("hello");

        context.uiStates.setadminAccount((prev) => {
          return {
            ...prev,
            login: true,
            user_id: response?.data?.adminData?._id,
            user_email: response?.data?.adminData?.email,
            user_password: response?.data?.adminData?.password,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function adminLoginCheck() {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin-login-check`,
        { withCredentials: true }
      );
      console.log(response);
      if (response?.data?.success && !response?.data?.error) {
        context.uiStates.setadminAccount((prev) => {
          return {
            ...prev,
            login: true,
            user_id: response?.data?.adminData?._id,
            user_email: response?.data?.adminData?.email,
            user_password: response?.data?.adminData?.password,
          };
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  useEffect(() => {
    adminLoginCheck();
  }, []);

  return (
    <>
      {!context.uiStates.adminAccount?.login ? (
        <div className="relative bg-gray-100 min-h-screen flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute text-white font-semibold top-[35px] left-[35px] px-[12px] py-[5px] rounded-[7px] bg-blue-500 flex items-center justify-center gap-[5px] flex-nowrap flex-row"
            onClick={() => navigator("/")}
          >
            <svg
              className="w-[22px] h-[22px] fill-white"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
            Go To Home Page
          </button>
          <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back! Please enter your details.
              </p>
            </div>

            <div className="p-6">
              <form ref={adminLoginFromRef} onSubmit={adminLoginHandler}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="adminEmail"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="adminPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>

                {/* <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                    </div>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                    </div> */}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Sign in
                </button>
              </form>

              {/* <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                Don&apos;t have an account? 
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Sign up</a>
                    </p>
            </div> */}
            </div>
          </div>
        </div>
      ) : (
        <Admin_Main />
      )}
    </>
  );
}
