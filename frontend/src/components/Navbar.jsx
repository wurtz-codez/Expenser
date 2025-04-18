import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Logo from './shared/Logo';
import { Avatar, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { fadeIn, slideIn, scaleIn } from '../lib/animations';
import { ThemeToggle } from './ui/theme-toggle';
import { useTheme } from '@/hooks/use-theme';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  const logoutHandler = async() => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/user/logout');
      if(res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`border-b-2 ${
        theme === 'dark' 
          ? 'border-gray-800 bg-gray-900/80' 
          : 'border-gray-200 bg-white/80'
      } p-2 w-full fixed top-0 z-10 backdrop-blur-md transition-colors duration-200`}
    >
      <div className='flex justify-between items-center max-w-7xl mx-auto h-16 px-4'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo />
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg ${
            theme === 'dark' 
              ? 'hover:bg-gray-800 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Popover>
              <PopoverTrigger>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Avatar className={`cursor-pointer hover:ring-2 ${
                    theme === 'dark' 
                      ? 'hover:ring-blue-400' 
                      : 'hover:ring-blue-500'
                  } transition-all`}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="p-2"
                >
                  <Button 
                    onClick={logoutHandler}
                    className={`w-full ${
                      theme === 'dark'
                        ? 'hover:bg-red-900 hover:text-white'
                        : 'hover:bg-red-500 hover:text-white'
                    } transition-colors`}
                  >
                    Logout
                  </Button>
                </motion.div>
              </PopoverContent>
            </Popover>
          ) : (
            <motion.div
              variants={slideIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex gap-2"
            >
              <Link to="/login">
                <Button variant="ghost" className={theme === 'dark' ? 'text-gray-300 hover:text-white' : ''}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className={theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : ''}>
                  Register
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`absolute top-16 left-0 right-0 ${
                theme === 'dark' 
                  ? 'bg-gray-900 border-gray-800' 
                  : 'bg-white border-gray-200'
              } border-b-2 p-4 md:hidden`}
            >
              <div className="flex flex-col gap-4">
                <ThemeToggle />
                {user ? (
                  <Button 
                    onClick={logoutHandler}
                    className={`w-full ${
                      theme === 'dark'
                        ? 'hover:bg-red-900 hover:text-white'
                        : 'hover:bg-red-500 hover:text-white'
                    } transition-colors`}
                  >
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login">
                      <Button variant="ghost" className={`w-full ${theme === 'dark' ? 'text-gray-300 hover:text-white' : ''}`}>
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className={`w-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Navbar