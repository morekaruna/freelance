import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
export default function PostJob(){
  const { register, handleSubmit } = useForm();
  const api = import.meta.env.VITE_API_URL||'http://localhost:5000';
  async function onSubmit(data){
    try{
      const token = localStorage.getItem('token');
      await axios.post(api + '/api/jobs', data, { headers:{ Authorization: 'Bearer '+token }});
      alert('Job posted'); window.location='/jobs';
    }catch(e){ alert(e.response?.data?.error || e.message); }
  }
  return (
    <div className='bg-white p-4 rounded shadow max-w-md'>
      <h3 className='font-semibold mb-2'>Post a Job (Client)</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
        <input {...register('title')} placeholder='Job title' className='p-2 border rounded w-full' />
        <textarea {...register('description')} placeholder='Description' className='p-2 border rounded w-full' />
        <input type='number' {...register('budget')} placeholder='Budget' className='p-2 border rounded w-full' />
        <input type='date' {...register('deadline')} className='p-2 border rounded w-full' />
        <button className='px-3 py-1 bg-green-600 text-white rounded'>Post</button>
      </form>
    </div>
  );
}
