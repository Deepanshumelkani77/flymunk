import React from 'react'
import Header from '../components/Header'
import Newuser from '../components/Newuser'


const Home = () => {
  return (
    <div className="pt-16">
      <div className="min-h-screen bg-white">
       <Header />
       <Newuser />
      </div>
    </div>
  )
}

export default Home
