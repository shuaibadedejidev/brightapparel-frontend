import React from 'react'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Features from '../components/Features'
import Categories from '../components/Category'
import Footer from '../components/Footer'
import Newsletter from '../components/NewsLetter'
import PromoBanners from '../components/PromoBanners'

const Home = () => {

  return (
    <div className='bg-main-bg'>
        <Banner />
        <Header />
        <Hero />
        <FeaturedProducts />
        <Features />
        <Categories />
        <PromoBanners />
        <Newsletter />
        <Footer />
    </div>
  )
}

export default Home