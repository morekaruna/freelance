import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
export default function Register(){
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  async function onSubmit(data){
    try{
      const res = await axios.post((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth/register', data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/dashboard');
    }catch(e){ alert(e.response?.data?.error || e.message); }
  }
  return (
    <div className='bg-white p-6 rounded shadow max-w-md mx-auto'>
      <h2 className='text-xl font-semibold mb-4'>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <input {...register('name')} placeholder='Full name' className='p-2 border rounded w-full' />
        <input {...register('email')} placeholder='Email' className='p-2 border rounded w-full' />
        <input {...register('password')} type='password' placeholder='Password' className='p-2 border rounded w-full' />
        <select {...register('role')} className='p-2 border rounded w-full'>
          <option value='freelancer'>Freelancer</option>
          <option value='client'>Client</option>
        </select>
        <button className='px-4 py-2 bg-green-600 text-white rounded'>Register</button>
      </form>
    </div>
  );
}
