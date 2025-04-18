import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import CreateExpense from './CreateExpense'
import ExpenseTable from './ExpenseTable'
import { useTheme } from '@/hooks/use-theme'
import { fadeIn, slideIn } from '@/lib/animations'

const Home = () => {
  const { user } = useSelector(store => store.auth)
  const expenses = useSelector(store => store.expense.expenses)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const { theme } = useTheme()

  const filteredExpenses = expenses
    .filter(expense => 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || expense.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortBy === 'amount') {
        return sortOrder === 'desc' 
          ? b.amount - a.amount
          : a.amount - b.amount
      }
      return 0
    })

  const categories = ['all', 'rent', 'food', 'education', 'shopping', 'others']

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className={`min-h-screen pt-20 pb-8 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={slideIn}
          className={`mb-8 p-6 rounded-lg shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <h1 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Welcome, {user?.name}!
            </h1>
            <CreateExpense />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : ''
                }`}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                {categories.map(category => (
                  <SelectItem 
                    key={category} 
                    value={category}
                    className={theme === 'dark' ? 'text-white hover:bg-gray-700' : ''}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                  <SelectItem 
                    value="date"
                    className={theme === 'dark' ? 'text-white hover:bg-gray-700' : ''}
                  >
                    Date
                  </SelectItem>
                  <SelectItem 
                    value="amount"
                    className={theme === 'dark' ? 'text-white hover:bg-gray-700' : ''}
                  >
                    Amount
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className={theme === 'dark' ? 'border-gray-600 text-white hover:bg-gray-700' : ''}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>

          <ExpenseTable expenses={filteredExpenses} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Home