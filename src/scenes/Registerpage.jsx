import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { email, password, confirmPassword, name });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: ' + error.response.data.message);
        }
    };

    return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
      <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border" required />
                </div>
                <div>
                    <label className="block">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border" required />
                </div>
                <div>
                    <label className="block">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border" required />
                </div>
                <div>
                    <label className="block">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border" required />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2">Sign Up</button>
            </form>
            {message && <p className="mt-4 text-red-600">{message}</p>}
            <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>Already have account?</p>
                    <Link to="/login" className='text-violet-500 text-base font-medium ml-2'>Login</Link>
                </div>
        </div>
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"/>
        <div className="w-full h-1/2 absolute bg-white/10 backdrop-blur-lg bottom-0"/>
      </div>
    </div>

        // <div className="max-w-md mx-auto">
        //     <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        //     <form onSubmit={handleSubmit} className="space-y-4">
        //         <div>
        //             <label className="block">Name</label>
        //             <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border" required />
        //         </div>
        //         <div>
        //             <label className="block">Email</label>
        //             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border" required />
        //         </div>
        //         <div>
        //             <label className="block">Password</label>
        //             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border" required />
        //         </div>
        //         <div>
        //             <label className="block">Confirm Password</label>
        //             <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border" required />
        //         </div>
        //         <button type="submit" className="w-full bg-blue-600 text-white p-2">Sign Up</button>
        //     </form>
        //     {message && <p className="mt-4 text-red-600">{message}</p>}
        // </div>
    );
};

export default Signup;
