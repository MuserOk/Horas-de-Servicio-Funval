import React from 'react'

export default function Footer() {
  return (
    <div className='bg-[url(/bg-footer.png)] bg-cover bg-center xs:bg-blue-500 bg-amber-300 dark:bg-gray-800 w-full px-2 sm:px-8 md:px-10 flex items-start justify-between py-2'>
      <div className='flex flex-col gap-2 items-center'>
        <h3 className='text-[#18183b] text-xs sm:text-lg font-medium dark:text-white dark:animate-pulse'>Síguenos</h3>
        <div className='flex gap-2'>
          <img className='w-4 h-4 md:w-8 md:h-8 hover:bg-blue-300 rounded active:bg-blue-400' src="/social/facebook-blue.svg" alt="facebook" />
          <img className='w-4 h-4 md:w-8 md:h-8 hover:bg-blue-300 rounded active:bg-blue-400' src="/social/instagram-blue.svg" alt="instagram" />
          <img className='w-4 h-4 md:w-8 md:h-8 hover:bg-blue-300 rounded active:bg-blue-400' src="/social/twitter-blue.svg" alt="twiter" />
        </div>
      </div>
      <div className='flex flex-col gap-2 items-center justify-start'>
        <a href='#' className='text-[#5757ad] text-xs sm:text-lg font-medium dark:text-white' >Soporte</a>
        <a href='#' className='text-[#5252e2] text-xs sm:text-xl md:text-2xl font-bold animate-pulse dark:text-white'>Iniciar Tour</a>

      </div>
      <div className='flex flex-col items-center gap-1'>
        <h3 className='text-[#08089ed5] text-xs sm:text-lg font-medium dark:text-white'>Descargar App</h3>
        <img className='w-14 md:w-20 dark:animate-pulse' src="/store/play-store.svg" alt="play store" />
        <img className='w-14 md:w-20 dark:animate-pulse' src="/store/app-store.svg" alt="app store" />
      </div>

    </div>
  )
}
