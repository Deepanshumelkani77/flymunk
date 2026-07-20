import React from 'react'
import Header from '../components/Header'
import Newuser from '../components/Newuser'
import Offers from '../components/Offers'
import Places from '../components/Places'
import Attractions from '../components/Attraction'
import Hotels from '../components/Hotels'

const Home = () => {
  return (
    <div className="pt-16">
      <div className="min-h-screen bg-white">
       <Header />
       <Offers />
       <Places />
          <Attractions />
          <Hotels />
      </div>
    </div>
  )
}

export default Home
