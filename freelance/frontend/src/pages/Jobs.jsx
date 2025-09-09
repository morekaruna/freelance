import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Jobs(){
  const [jobs, setJobs] = useState([]);
  const api = import.meta.env.VITE_API_URL||'http://localhost:5000';
  useEffect(()=>{ fetchJobs(); },[]);
  async function fetchJobs(){ try{ const res = await axios.get(api + '/api/jobs'); setJobs(res.data); }catch(e){ console.error(e); } }
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>All Jobs</h2>
        <a href='/post-job' className='px-3 py-1 border rounded'>Post Job</a>
      </div>
      <div className='space-y-3'>
        {jobs.map(j=>(
          <div key={j._id} className='p-4 bg-white rounded shadow'>
            <h3 className='font-bold'>{j.title} - ₹{j.budget}</h3>
            <p className='text-sm text-gray-600'>{j.description}</p>
            <div className='text-xs text-gray-500 mt-2'>{new Date(j.createdAt).toLocaleString()}</div>
            <a className='mt-2 inline-block px-3 py-1 border rounded' href={'/jobs/'+j._id}>View & Bid</a>
          </div>
        ))}
      </div>
    </div>
  );
}
