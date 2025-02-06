import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Description } from '@radix-ui/react-dialog'
import axios from 'axios'
import { toast } from 'sonner'
import { Edit2, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses, setSingleExpense } from '@/redux/expenseSlice'


const UpdateExpense = ({expense}) => {

  const expenses = useSelector(store => store.expense.expenses);
  const singleExpense = useSelector(store => store.expense.singleExpense);
  const [formData, setFormdata] = useState({
    description: singleExpense?.description,
    amount: singleExpense?.amount,
    category: singleExpense?.category
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormdata({
      description: singleExpense?.description,
      amount: singleExpense?.amount,
      category: singleExpense?.category
    })
  }, [singleExpense])
  
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleCategoryChange = (value) => {
    setFormdata((prevData) => ({
      ...prevData,
      category: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:8000/api/v1/expense/update/${expense._id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        const updatedExpenses = expenses.map(exp => exp._id === expense._id ? res.data.expense : exp);
        dispatch(setExpenses(updatedExpenses));
        toast.success(res.data.message);
        setIsOpen(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the expense';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="black" onClick={() => {
          dispatch(setSingleExpense(expense))
          setIsOpen(false);
        }}
        size='icon'
        className='rounded-full border border-green-500 text-green-600 hover:border-transparent'
        ><Edit2/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle style={{ color: 'black' }}>Update Expense</DialogTitle>
          <DialogDescription style={{ color: 'black' }}>
            Update expense here. Click update when you are done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right" style={{ color: 'black', fontWeight: 'bold' }}>
                Description
              </Label>
              <Input
                id="description"
                placeholder="Enter description"
                name="description"
                className="col-span-3 border-black text-black"
                onChange={handleEventChange}
                value={formData.description}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right" style={{ color: 'black', fontWeight: 'bold' }}>
                Amount
              </Label>
              <Input
                id="amount"
                placeholder="Enter amount in Rupees"
                name="amount"
                className="col-span-3 border-black text-black"
                onChange={handleEventChange}
                value={formData.amount}
              />
            </div>
          </div>

          <Select value={formData.category} onValueChange={handleCategoryChange}>
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

          <DialogFooter>
            {
              loading ? <Button>
                <Loader2 className='animate-spin'>Updating..</Loader2>
              </Button> : <Button type="submit">Update</Button>

            }
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default UpdateExpense