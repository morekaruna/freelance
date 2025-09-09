import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Dashboard(){
  const [jobs, setJobs] = useState([]);
  const api = import.meta.env.VITE_API_URL||'http://localhost:5000';
  const user = JSON.parse(localStorage.getItem('user')||'null');
  useEffect(()=>{ fetchMy(); },[]);
  async function fetchMy(){
    try{
      if(!user) return window.location='/login';
      if(user.role==='client'){
        const res = await axios.get(api + '/api/jobs');
        setJobs(res.data.filter(j=>j.userId===user.id || j.userId===user._id || j.userId===user._id?.toString()));
      } else {
        const res = await axios.get(api + '/api/jobs');
        setJobs(res.data);
      }
    }catch(e){ console.error(e); }
  }
  return (
    <div>
      <h2 className='text-xl font-semibold mb-3'>Dashboard</h2>
      <div className='space-y-3'>
        {jobs.map(j=>(
          <div key={j._id} className='p-3 bg-white rounded shadow'>
            <div className='font-medium'>{j.title}</div>
            <div className='text-sm text-gray-500'>{j.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
