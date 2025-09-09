import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
export default function Login(){
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  async function onSubmit(data){
    try{
      const res = await axios.post((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/dashboard');
    }catch(e){ alert(e.response?.data?.error || e.message); }
  }
  return (
    <div className='bg-white p-6 rounded shadow max-w-md mx-auto'>
      <h2 className='text-xl font-semibold mb-4'>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <input {...register('email')} placeholder='Email' className='p-2 border rounded w-full' />
        <input {...register('password')} type='password' placeholder='Password' className='p-2 border rounded w-full' />
        <button className='px-4 py-2 bg-blue-600 text-white rounded'>Login</button>
      </form>
    </div>
  );
}
