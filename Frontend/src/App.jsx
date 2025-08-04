import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Expense from './pages/Expense.jsx'
import Login from './pages/Login.jsx'
import ExpenseLists from './pages/Expense_lists.jsx'
import About from './pages/About.jsx'
import Account from './pages/Account.jsx'


function App() {


  return (
    <>
    <Routes>    
      <Route path='/' element={<Home />} />
      <Route path='/expense' element={<Expense />} />
      <Route path='/login' element={<Login />} />
      <Route path='/expenselists' element={<ExpenseLists />} />
      <Route path='/about' element={<About />} />
      <Route path='/account' element={<Account />} />
    </Routes>
    </>
  )
}

export default App
