import React from 'react'
import MenuH from './MenuH'


// NECESITAMOS UN useSATE Y useEFFECT PARA QUE EL INICIAR SESION ACTIVE LA PÁGINA DE LOG IN



export default function Header() {
  return (
    <div className='relative w-full dark:bg-[#153862] h-[15%] flex justify-between items-center px-2 dark:md:px-6 dark:lg:px-10 pt-4 shadow-sm pb-2 md:pb-0'>
      
      <MenuH/>
      <img className='block dark:hidden h-10 md:h-16 lg:h-18' src="/images/funval-img-light.png" alt="logo funval" />
      <img className="hidden dark:block h-10 md:h-16 lg:h-18" src="/images/funval-img-dark.jpg" alt="logo funval"/>
      
      <div>
        {/*iniciar sesion cambia a cerrar sesion */}
        <p className='text-blue-800 font-medium text-center md:text-lg cursor-pointer hover:text-blue-400 active:text-blue-950 dark:text-white'>Iniciar Sesión</p>
        {/*aparece al iniciar sesión */}
        <p className='text-xs lg:text-md font-medium animate-pulse text-center dark:text-white dark:font-bold'>Pepito Juanito</p>
      </div>

    </div>
  )
}
