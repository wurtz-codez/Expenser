import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Description } from '@radix-ui/react-dialog'
import axios from 'axios'
import { toast } from 'sonner'
import { Edit2, Loader2, Pencil } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses, setSingleExpense } from '@/redux/expenseSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, slideIn } from '@/lib/animations'
import { useTheme } from '@/hooks/use-theme'

const UpdateExpense = ({ expense }) => {
  const expenses = useSelector(store => store.expense.expenses);
  const singleExpense = useSelector(store => store.expense.singleExpense);
  const [formData, setFormdata] = useState({
    description: singleExpense?.description || '',
    amount: singleExpense?.amount || '',
    category: singleExpense?.category || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    if (singleExpense) {
      setFormdata({
        description: singleExpense.description,
        amount: singleExpense.amount,
        category: singleExpense.category
      });
      setErrors({});
    }
  }, [singleExpense]);

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
        setFormdata({ description: '', amount: '', category: '' });
        setErrors({});
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
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="icon" className={`${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}>
            <Pencil className="w-4 h-4" />
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
              Update Expense
            </DialogTitle>
            <DialogDescription className={
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }>
              Update the expense details below.
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
                    <span>Updating...</span>
                  </div>
                ) : (
                  'Update Expense'
                )}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateExpense