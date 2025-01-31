import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Description } from '@radix-ui/react-dialog'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const CreateExpense = () => {

  const [formData, setFormdata] = useState({
    description: '',
    amount: '',
    category: ''
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEventChange = (e) => {
    const {name,value} = e.target;
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/expense/add', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if(res.data.success) {
        toast.success(res.data.message);
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="black" onClick={()=> {
          setIsOpen(true);
        }}>Create Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle style={{ color: 'black' }}>Add Expense</DialogTitle>
          <DialogDescription style={{ color: 'black' }}>
            Create expense here. Click add when you are done.
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

          <DialogFooter>
            {
              loading ? <Button>
                <Loader2 className='animate-spin'>Adding..</Loader2>
              </Button> : <Button type="submit">Add</Button>

            }
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default CreateExpense