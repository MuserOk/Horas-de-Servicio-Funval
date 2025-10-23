import React from 'react'
/* import ServiceCarousel from "../components/ServiceCarousel"
 */

export default function Home() {
  return (
    <> 
    {/*desde md se puede agregar otra imagen al pricipio... y que aparezca solo en md , modificar a justify-betwin*/}
      <div className='flex flex-col h-auto md:flex-row sm:justify-end sm:ml-50'> 
        <img className='hidden' src="" alt="image" />
        <p className='p-2 absolute w-50 sm:w-70 lg:text-4xl lg:w-auto sm:top-14 sm:left-30 left-20 top-6 md:top-1/8 lg:top-1/5 text-center md:left-1/3 lg:left-1/2 transform -translate-y-1/8 lg:-translate-y-1/2 lg:-translate-x-1/2 -translate-x-1/3 text-sm sm:text-lg md:text-2xl font-medium dark:text-white bg-blue-300/20 rounded-2xl '>
          <em>"Juntos construimos una comunidad más fuerte a través del trabajo digno, el respeto y la solidaridad."</em>
        </p>
        <img className='md:w-[70%] object-center dark:opacity-80' src="/images/felices-sirviendo.png" alt="fondo de pantallas" />
      </div>
    </>
  )
}
