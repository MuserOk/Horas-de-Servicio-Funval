import React from 'react'

export default function Home() {
  return (
    <div className='dark:bg-gray-800 flex items-center overflow-hidden pt-6'>
      <p className='text-sm sm:text-lg md:text-3xl sm:pl-4 md:pl-8 lg:pl-10 font-medium pl-2 dark:text-white'><em>"Juntos construimos una comunidad más fuerte a través del trabajo digno, el respeto y la solidaridad."</em></p>
      <img className='w-[50%] sm:w-[60%] sm:h-[18rem] md:h-[24rem] object-center dark:opacity-80' src="/images/felices-sirviendo.png" alt="fondo de pantallas" />

    </div>
  )
}
