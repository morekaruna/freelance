import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import Dashboard from './pages/Dashboard';

export default function App(){
  const token = localStorage.getItem('token');
  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white shadow p-4'>
        <div className='max-w-4xl mx-auto flex justify-between'>
          <Link to='/' className='font-bold'>MiniFiverr</Link>
          <div className='space-x-2'>
            <Link to='/' className='px-2'>Home</Link>
            <Link to='/jobs' className='px-2'>Jobs</Link>
            {token ? <Link to='/dashboard' className='px-2'>Dashboard</Link> : <><Link to='/login' className='px-2'>Login</Link><Link to='/register' className='px-2'>Register</Link></>}
          </div>
        </div>
      </nav>
      <div className='max-w-4xl mx-auto p-6'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/jobs' element={<Jobs/>} />
          <Route path='/post-job' element={<PostJob/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </div>
    </div>
  );
}
