import React from 'react'

export default function Footer() {
  return (
    <>
 
    <div className='w-full justify-between py-2 flex px-4 items-center bg-[url(/bg-footer.png)] lg:px-10 bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-950'>
        <div className='flex gap-2 md:gap-6'>
          <img className='w-6 h-6 sd:w-8 sd:h-8 md:w-10  md:h-10 hover:bg-blue-300 rounded active:bg-blue-400 m-0' src='/social/facebook-blue.svg' alt='facebook' />
          <img className='w-6 h-6 sd:w-8 sd:h-8 md:w-10  md:h-10 hover:bg-blue-300 rounded active:bg-blue-400 m-0' src='/social/instagram-blue.svg' alt='instagram' />
          <img className='w-6 h-6 sd:w-8 sd:h-8 md:w-10  md:h-10 hover:bg-blue-300 rounded active:bg-blue-400 m-0' src='/social/twitter-blue.svg' alt='twitter' />
        </div>
      
      <div className='flex flex-col gap-1 items-center justify-start'>
        <a href='#' className='text-[#5757ad] text-xs sm:text-lg font-medium dark:text-white'>Soporte</a>
        <a href='#' className='text-[#5252e2] text-xs sm:text-xl md:text-2xl font-bold animate-pulse dark:text-white'>Iniciar Tour</a>
      </div>
      <div className='flex flex-col items-center gap-1'>

        <h3 className='text-[#7676c2] text-xs sm:text-lg font-medium dark:text-white lg:text-2xl pb-4'>Descargar App</h3>
       <div className='flex flex-col gap-2 md:flex-row md:gap-6'>
        <img className='w-14 md:w-20 lg:w-32  m-0' src='/store/play-store.svg' alt='play store' />
        <img className='w-14 md:w-20 lg:w-32  m-0' src='/store/app-store.svg' alt='app store' />
        </div>
      </div>
    </div >
    </>
  )
}
