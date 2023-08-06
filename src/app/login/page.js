"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
export default function Home() {
  const [login, setLogin] = useState({
    password: "",
    email: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/login", {
      email: login.email,
      password: login.password,
    });
    if(response.status==200){
      console.log(response.data)
      toast.success(response.data.data.message,{
        position:"top-right"
      })
    }
  };
  const onchangeUser = (e) => {
    const { name, value } = e.target
    setLogin({
      ...login,
      [name]: value,
    });
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-20 h-20 mr-2" src="/icon.jpeg" alt="logo" />
            LaFleur Bouquet
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login account</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={registerUser}>
               
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => onchangeUser(e)}
                    placeholder="example@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => onchangeUser(e)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-start">
                 

                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                Login Account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  no have an account?{" "}
                  <Link href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
