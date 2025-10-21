import React from 'react'

export default function Header() {
  return (
    <div className=' w-full dark:bg-[#153862] h-[15%] flex justify-between items-end px-2 dark:md:px-6 dark:lg:px-10 pt-4 shadow-sm pb-2 md:pb-0'>
      {/*COMPONENTE MENU */}

      <img className='block dark:hidden h-10 md:h-16 lg:h-18' src="/images/funval-img-light.png" alt="logo funval" />
      <img className="hidden dark:block h-10 md:h-16 lg:h-18" src="/images/funval-img-dark.jpg" alt="logo funval"/>
      
      {/*COMPONENTE LOG IN */}
    </div>
  )
}
