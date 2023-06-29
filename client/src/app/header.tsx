/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
   const [isScroll, setIsScroll] = useState(false);
   const [open, setOpen] = useState(false);
   const pathname = usePathname();

   useEffect(() => {
      const changeColor = () => {
         if (window.scrollY >= 90) {
            setIsScroll(true);
         } else {
            setIsScroll(false);
         }
      };
      window.addEventListener('scroll', changeColor);

      return () => {
         window.removeEventListener('scroll', changeColor);
      };
   }, []);

   const currentUser = {
      id: 1,
      username: 'John Doe',
      isSeller: true,
   };

   return (
      <div
         className={`fixed left-0 top-0 w-full z-10 ${
            isScroll || pathname !== '/' ? 'bg-white' : 'bg-green-950'
         } ease-in duration-300`}
      >
         <div
            className={`container mx-auto flex justify-between items-center py-[20px]  ${
               isScroll || pathname !== '/' ? 'text-gray-600' : 'text-white'
            }`}
         >
            <div className='font-bold text-4xl'>
               <span>
                  <Link href={'/'}>fiverr</Link>
               </span>
               <span className='text-green-500'>.</span>
            </div>
            <div className='flex gap-6 text-base font-medium items-center'>
               <Link href={'#'}>Fiverr Bussiness</Link>
               <Link href={'#'}>Explore</Link>
               <Link href={'#'}>English</Link>
               {!currentUser.isSeller ? (
                  <Link href={'#'}>Become a Seller</Link>
               ) : null}
               {!currentUser ? (
                  <Link
                     className={`py-[5px] px-[15px] rounded-[7px] ${
                        isScroll
                           ? 'border-green-500 text-green-500 bg-white'
                           : 'border-white text-white hover:bg-green-500 hover:border-green-500 bg-transparent'
                     } border `}
                     href={'#'}
                  >
                     Join
                  </Link>
               ) : null}
               {currentUser ? (
                  <div
                     onClick={() => setOpen(!open)}
                     className='flex cursor-pointer relative gap-2 items-center ml-5'
                  >
                     <img
                        className='w-[32px] rounded-full object-cover'
                        src='/images/user.jpg'
                        alt=''
                     />
                     <span>{currentUser.username}</span>
                     {open ? (
                        <div className='absolute right-0 top-[50px] px-5 py-3 flex flex-col w-[200px] text-gray-600 bg-white rounded-lg text-base font-normal border shadow-lg'>
                           {currentUser.isSeller ? (
                              <div className='flex flex-col gap-2'>
                                 <span>
                                    <Link href={'/mygigs'}>My Gigs</Link>
                                 </span>
                                 <span>Add New Gig</span>
                              </div>
                           ) : (
                              <div className='flex flex-col gap-2'>
                                 <span>Orders</span>
                                 <span>Message</span>
                                 <span>Logout</span>
                              </div>
                           )}
                        </div>
                     ) : null}
                  </div>
               ) : null}
            </div>
         </div>
         {isScroll ? (
            <>
               <div className='border-t border-gray-200'></div>
               <div
                  className={`container py-[10px] mx-auto font-light text-gray-500`}
               >
                  menu
               </div>
            </>
         ) : null}
      </div>
   );
};

export default Header;
