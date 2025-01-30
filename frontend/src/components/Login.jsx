import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import Logo from './shared/Logo'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'sonner'

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res);
      if(res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>

      <form onSubmit={submitHandler} className='p-8 bg-black rounded-lg shadow-lg w-96'>
        <div className='flex justify-center mb-4'>
          <Logo className='' />
        </div>

        <h1 className='text-2xl font-bold text-white mb-4 text-center'>Login</h1>

        <Label>Email</Label>
        <Input
          className='border-white bg-black mb-4'
          type='email'
          name='email'
          placeholder='Enter your email'
          onChange={handleChange}
          value={input.email} />

        <Label>Password</Label>
        <Input
          className='border-white bg-black mb-4'
          type='password'
          name='password'
          placeholder='Enter password'
          onChange={handleChange}
          value={input.password} />

        <div className='flex justify-center'>
          <Button className='text-center'>Login</Button>
        </div>

        <p className='text-center'>Don't have an account? <Link to={'/signup'}>Sign Up</Link></p>

      </form>
    </div>
  )
}

export default Login