import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Description } from '@radix-ui/react-dialog'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses } from '@/redux/expenseSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, slideIn } from '@/lib/animations'
import { useTheme } from '@/hooks/use-theme'

const CreateExpense = () => {
  const [formData, setFormdata] = useState({
    description: '',
    amount: '',
    category: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const expenses = useSelector(store => store.expense.expenses);
  const { theme } = useTheme();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  const handleCategoryChange = (value) => {
    setFormdata((prevData) => ({
      ...prevData,
      category: value
    }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/expense/add', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setExpenses([...expenses, res.data.expense]));
        toast.success(res.data.message);
        setIsOpen(false);
        setFormdata({ description: '', amount: '', category: '' });
        setErrors({});
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className={`${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}>
            <Plus className="w-4 h-4 mr-2" />
            Create Expense
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''
      }`}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <DialogHeader>
            <DialogTitle className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Add Expense
            </DialogTitle>
            <DialogDescription className={
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }>
              Create a new expense entry. Fill in the details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              variants={slideIn}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label className={
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }>
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Enter expense description"
                  name="description"
                  className={`w-full ${
                    errors.description 
                      ? 'border-red-500' 
                      : theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-white'
                        : 'border-gray-200'
                  }`}
                  onChange={handleEventChange}
                  value={formData.description}
                />
                <AnimatePresence>
                  {errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500"
                    >
                      {errors.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <Label className={
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }>
                  Amount (₹)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  name="amount"
                  className={`w-full ${
                    errors.amount 
                      ? 'border-red-500' 
                      : theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-white'
                        : 'border-gray-200'
                  }`}
                  onChange={handleEventChange}
                  value={formData.amount}
                />
                <AnimatePresence>
                  {errors.amount && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500"
                    >
                      {errors.amount}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <Label className={
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }>
                  Category
                </Label>
                <Select onValueChange={handleCategoryChange} value={formData.category}>
                  <SelectTrigger className={`w-full ${
                    errors.category 
                      ? 'border-red-500' 
                      : theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-white'
                        : 'border-gray-200'
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
                <AnimatePresence>
                  {errors.category && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500"
                    >
                      {errors.category}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  'Add Expense'
                )}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateExpense