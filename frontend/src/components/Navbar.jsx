import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Logo from './shared/Logo';
import { Avatar, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';

const Navbar = () => {

  const user = true;
  
  const navigate = useNavigate();
  
  const logoutHandler = async() => {
    const res = await axios.post('http://localhost:8000/api/v1/user/logout');
    try {
      if(res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <div className='border-b-2 border-gray-200 p-2 w-full fixed top-0 z-10'>
      <div className='flex justify-between items-center max-w-7xl mx-auto h-16'>
        <Logo />
        {
          user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <Button onClick={logoutHandler}>Logout</Button>
              </PopoverContent>
            </Popover>
          ) : (
            <div className='flex gap-2'>
              <Link to="/login"><Button>Login</Button></Link>
              <Link to="/signup"><Button>Sign Up</Button></Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar