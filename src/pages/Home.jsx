import React from 'react'
/* import ServiceCarousel from "../components/ServiceCarousel"
 */

export default function Home() {
  return (
    <div className='h-auto flex items-center'>
     {/*  <ServiceCarousel /> */}
      <div className='md:relative flex flex-col justify-end items-end w-[46%]'>
        <p className='p-2 md:absolute md:top-0 text-center md:w-80 md:left-0 text-sm sm:text-lg md:text-3xl font-medium dark:text-white bg-blue-300/20 rounded-2xl'>
          <em>"Juntos construimos una comunidad más fuerte a través del trabajo digno, el respeto y la solidaridad."</em>
        </p>
        <img className='md:w-[50%] sm:h-[18rem] md:h-[20rem] object-center dark:opacity-80' src="/images/felices-sirviendo.png" alt="fondo de pantallas" />
      </div>
    </div>
  )
}
