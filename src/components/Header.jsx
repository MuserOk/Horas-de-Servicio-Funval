import React from 'react'

export default function Header() {
  return (
    <div className='dark:bg-[#153862] min-h-2 flex justify-between px-2 py-2'>
      {/*COMPONENTE MENU */}

      <img className='block dark:hidden w-[50%]' src="/images/funval-img-light.png" alt="logo funval" />
      <img className="hidden dark:block w-[50%]" src="/images/funval-img-dark.jpg" alt="logo funval"/>
      
      {/*COMPONENTE LOG IN */}
    </div>
  )
}
