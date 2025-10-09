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
    <div>
        <Herosection/>
        <Services/>
    </div>
    </ReactLenis>
  )
}

export default page