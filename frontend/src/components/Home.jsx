import React from 'react'
import Navbar from './Navbar'
import CreateExpense from './CreateExpense'

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: '100vh', padding: '10px', flexDirection: 'column', fontSize: 'medium' }}>
        <div style={{ width: '98.9vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginTop: '80px' }}>
          <h1>Expense</h1>
          <CreateExpense />
        </div>
        <h1 style={{font: 'medium', fontSize:'large', textAlign:'center'}}>Filter By : </h1>
      </div>
    </>
  )
}

export default Home