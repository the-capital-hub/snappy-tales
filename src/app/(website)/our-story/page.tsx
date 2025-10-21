import Footer from '@/Components/Common/Footer'
import AboutPage from '@/Components/OurStory/AboutUs'
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
           <AboutPage/>
           <Footer/>
        </div>
        </ReactLenis>
  )
}

export default page