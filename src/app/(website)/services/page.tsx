import Footer from '@/Components/Common/Footer'
import Herosection from '@/Components/ServicesComponent/Herosection'
import Services from '@/Components/ServicesComponent/Services'
import ReactLenis from 'lenis/react'
import React from 'react'

const page = () => {
  return (
     <ReactLenis
      root
      options={{
        lerp: 0.1,        
        duration: 1.2,   
        smoothWheel: true,

      }}>
    <div className='dark:bg-black bg-white'>
        <Herosection/>
        <Services/>
        <Footer/>
    </div>
    </ReactLenis>
  )
}

export default page