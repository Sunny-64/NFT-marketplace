import React, { useState } from 'react'
import ApiService from '../services/ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [mobile, setMobile] = useState(""); 
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const user = {
                username, 
                email, 
                mobile, 
                password
            }

            const response = await ApiService.register(user); 
            // console.log(response);
            if(response.status !== 200){
                // console.log("Registration failed"); 
                return toast(`Failed to Sign up ${response.data.error ?? response.data.message}`)
            }
            toast('🦄 Registered Successfully. \n Redirecting to Login page'); 
            const data = {
                email, 
                password
            };
            setTimeout(() => {
                // console.log("Inside the setTimeout");
                navigate("/login", {state : data}) 
              }, 5000);
        }
        catch(err){
            console.log(err); 
        }

    }
    return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        <section id='Signup' className='px-8 mt-16'>
                <div className='flex justify-center border-white border-2 flex-col items-center md:w-[40%] xs:w-[80%] xs:px-4 md:px-0 mx-auto py-8 rounded-lg'>
                <h2 className='text-3xl font-semibold mb-8 text-center'>Sign Up</h2>
                    <form action="" encType='multipart/form-data' className='md:w-[80%] sm:w-full' onSubmit={handleSubmit}>
                        <div className='mb-3 flex flex-col'>
                            <label htmlFor="username">Username</label>
                            <input type="text" id='username' name='username' className='py-2 rounded-md text-black px-4' required value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="email">Email</label>
                            <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id='email' name='email' className='py-2 rounded-md text-black px-4' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" pattern="[789][0-9]{9}" name='mobile' id='mobile' className='py-2 rounded-md text-black px-4' required value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                        </div>
                        <div className='mb-3 flex flex-col content-start'>
                            <label htmlFor="password">Password</label>
                            <input type="password" className='py-2 rounded-md text-black px-4' required id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className='mb-3 mt-5 flex justify-between'>
                            <button className='py-2 px-8 rounded-md btn-primary'>Signup</button>
                            <span className='flex flex-col'>Already a user ? <Link to={"/login"} className='font-bold text-[#79279F]'>Login</Link></span>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Signup
