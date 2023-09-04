import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ApiService from '../services/ApiServices';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";


function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state;
    const [email, setEmail] = useState(data?.email ?? "");
    const [password, setPassword] = useState(data?.password ?? "");
    let [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        setLoading(true); 
        e.preventDefault();
        const formData = {
            email,
            password
        }
        try {
            sessionStorage.clear();
            localStorage.clear(); 
            const response = await ApiService.login(formData);
            if (response.status !== 200) {
                setLoading(false); 
                return toast.error("Failed to Login ", response.data.error);
            }
            localStorage.setItem("TOKEN", response.data.token);
            sessionStorage.setItem("isLoggedIn", true);
            localStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("UID", response.data.data);
            localStorage.setItem("UID", response.data.data);
            setLoading(false); 
            toast('🦄 Logged in Successfully. \n Redirecting to Profile page');
            setTimeout(() => {
                // console.log("Before : ",localStorage.getItem("UID"));
                navigate("/profile", { userId: localStorage.getItem("UID") });
                // console.log("After : ",localStorage.getItem("UID"));
            }, 3000)
        }
        catch (err) {
            console.log(err);
        }
    }
    const override = {
        margin: "0 auto",
        borderColor: "blue",
        position: "absolute",
        // width : "", 
        top: "40%",
        left: "45%",
        marginLeft: "auto",
        display: "block",
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <MoonLoader
                color={"#ffffff"}
                loading={loading}
                cssOverride={override}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

            <section id='Login' className='px-8 mt-16'>
                <div className='flex justify-center border-white border-2 flex-col items-center md:w-[40%] xs:w-[80%] xs:px-4 md:px-0 mx-auto py-8 rounded-lg'>
                    <h2 className='text-3xl font-semibold mb-8 text-center'>Login</h2>
                    <form action="" encType='multipart/form-data' className='md:w-[80%] sm:w-full' onSubmit={handleSubmit}>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="email">Email</label>
                            <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id='email' name='email' className='py-2 rounded-md text-black px-4' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className='mb-3 flex flex-col content-start'>
                            <label htmlFor="password">Password</label>
                            <input type="password" className='py-2 rounded-md text-black px-4' required id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='mb-3 mt-5 flex justify-between'>
                            <button type='submit' className='py-2 px-8 rounded-md btn-primary'>Login</button>
                            <span className='flex flex-col'>Not a Member? <Link className='font-bold text-[#79279F]' to={"/signup"}>Sign Up</Link></span>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
