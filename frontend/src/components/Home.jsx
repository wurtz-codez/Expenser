import React from 'react'
import Navbar from './Navbar'
import CreateExpense from './CreateExpense'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { useDispatch } from 'react-redux'
import { setCategory } from '@/redux/expenseSlice'
import { setMarkAsDone } from '@/redux/expenseSlice'
import ExpenseTable from './ExpenseTable'
import useGetExpense from '@/hooks/useGetExpense'

const Home = () => {

  useGetExpense();
  
  const dispatch = useDispatch();
  
  const handleCategoryChange = (value) => {
    dispatch(setCategory(value));
  }

  const handleDoneChange = (value) => {
    dispatch(setMarkAsDone(value));
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: '100vh', padding: '10px', flexDirection: 'column', fontSize: 'medium' }}>
        <div style={{ width: '98.9vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginTop: '80px' }}>
          <h1>Expense</h1>
          <CreateExpense />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', marginTop: '20px' }}> 
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', marginTop: '20px' }}>
            <h1 style={{ font: 'medium', fontSize: 'large', textAlign: 'center' }}>Filter By: </h1>
            
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px] text-black border-black">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
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

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', marginTop: '20px' }}>
            <Select onValueChange={handleDoneChange}>
              <SelectTrigger className="w-[180px] text-black border-black">
                <SelectValue placeholder="Mark As" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="undone">Undone</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <ExpenseTable />
        
      </div>
   
    </>
  )
}

export default Home