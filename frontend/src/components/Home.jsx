import React from 'react'
import Navbar from './Navbar'
import CreateExpense from './CreateExpense'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { useDispatch } from 'react-redux'
import { setCategory } from '@/redux/expenseSlice'
import { setMarkAsDone } from '@/redux/expenseSlice'
import ExpenseTable from './ExpenseTable'
import useGetExpense from '@/hooks/useGetExpense'
import { motion } from 'framer-motion'
import { fadeIn, slideIn, staggerContainer } from '@/lib/animations'
import { ChartBarIcon, FilterIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/hooks/use-theme'

const Home = () => {
  useGetExpense();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  
  const handleCategoryChange = (value) => {
    dispatch(setCategory(value));
  }

  const handleDoneChange = (value) => {
    dispatch(setMarkAsDone(value));
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-200`}>
      <Navbar />
      <motion.div 
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="container mx-auto px-4 pt-24 pb-8"
      >
        <motion.div 
          variants={staggerContainer}
          className="grid gap-6"
        >
          {/* Header Section */}
          <motion.div 
            variants={slideIn}
            className={`flex flex-col md:flex-row justify-between items-center gap-4 p-6 rounded-lg shadow-sm ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-800'
            } transition-colors duration-200`}
          >
            <div className="flex items-center gap-2">
              <ChartBarIcon className={`h-8 w-8 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
              }`} />
              <h1 className="text-2xl font-bold">Expense Tracker</h1>
            </div>
            <CreateExpense />
          </motion.div>

          {/* Filters Section */}
          <motion.div 
            variants={slideIn}
            className={`p-6 rounded-lg shadow-sm ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-800'
            } transition-colors duration-200`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <FilterIcon className={`h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <h2 className="text-lg font-medium">Filter By:</h2>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className={`w-[200px] ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <Select onValueChange={handleDoneChange}>
                  <SelectTrigger className={`w-[200px] ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    <SelectValue placeholder="Mark As" />
                  </SelectTrigger>
                  <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                    <SelectGroup>
                      <SelectItem value="done">Done</SelectItem>
                      <SelectItem value="undone">Undone</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Table Section */}
          <motion.div 
            variants={slideIn}
            className={`p-6 rounded-lg shadow-sm overflow-hidden ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-800'
            } transition-colors duration-200`}
          >
            <ExpenseTable />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home