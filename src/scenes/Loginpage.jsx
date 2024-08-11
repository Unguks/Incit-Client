import * as React from 'react';
// import axios from "axios";
import Facebook from '../icons/Facebook';
import { Link, useNavigate } from 'react-router-dom';

export default function Form() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const history = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', 
            });

            const data = await response.json();
            console.log(data); 

            if (response.ok) {
                history.push('/dashboard'); 
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
                    <h1 className='text-5xl font-semibold items-center'>Welcome</h1>
                    <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your account.</p>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <div className='mt-8'>
                        <div>
                            <label className='text-lg font-medium'>Email</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                type="text"
                                placeholder='Enter your email address'
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div>
                            <label className='text-lg font-medium'>Password</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                type="password"
                                placeholder='Enter your password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className='mt-8 flex justify-between items-center'>
                            <div>
                                <input
                                    type="checkbox"
                                    id='remember'
                                />
                                <label className='ml-2 font-medium text-base' htmlFor="remember">Remember me!</label>
                            </div>
                            <button className='font-medium text-base text-violet-500'>Forgot password</button>
                        </div>
                        <div className='mt-8 flex flex-col gap-y-4'>
                            <button
                                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                                onClick={handleLogin}
                            >
                                Sign in
                            </button>

                            <a
                                href="http://localhost:3000/auth/google"
                                className='flex rounded-xl py-2 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out'
                            >
                                <svg className='max-h-5' viewBox="0 0 48 48">
                                    <title>Google Logo</title>
                                    <clipPath id="g">
                                        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                                    </clipPath>
                                    <g className="colors" clipPath="url(#g)">
                                        <path fill="#FBBC05" d="M0 37V11l17 13z" />
                                        <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                                        <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                                        <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                                    </g>
                                </svg>
                                Sign in with Google
                            </a>

                            <a
                                href="http://localhost:3000/auth/facebook"
                                className='flex rounded-xl py-2 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out'
                            >
                                <Facebook />
                                Sign in with Facebook
                            </a>

                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>Don't have an account?</p>
                            <Link to="/register" className='text-violet-500 text-base font-medium ml-2'>Sign up</Link>
                        </div>

                    </div>
                </div>
            </div>
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" />
                <div className="w-full h-1/2 absolute bg-white/10 backdrop-blur-lg bottom-0" />
            </div>
        </div>
    );
}
