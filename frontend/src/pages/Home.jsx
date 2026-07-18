import React from 'react'
import Header from '../components/Header'
import Newuser from '../components/Newuser'
import Offers from '../components/Offers'


const Home = () => {
  return (
    <div className="pt-16">
      <div className="min-h-screen bg-white">
       <Header />
       <Newuser />
       <Offers />
      </div>
    </div>
  )
}

export default Home
