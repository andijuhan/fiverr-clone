/* eslint-disable @next/next/no-img-element */
import { BiSearch } from 'react-icons/bi';

const Featured = () => {
   const popularCat = ['Web Design', 'Wordpress', 'Logo Design', 'AI Services'];

   return (
      <div className='bg-green-950 pt-[100px]'>
         <div className='container mx-auto flex justify-between items-center'>
            <div className='text-white flex flex-col gap-10'>
               <h1 className='text-5xl font-bold max-w-[800px] leading-tight'>
                  Find the perfect <span className='font-light'>freelance</span>{' '}
                  services for your bussiness
               </h1>
               <form className='w-full flex'>
                  <div className='w-full flex items-center relative'>
                     <BiSearch
                        className='absolute text-gray-500 left-1'
                        size={30}
                     />
                     <input
                        className='rounded-tl-md rounded-bl-md py-3 px-10 w-full focus:outline-none text-gray-800'
                        type='text'
                        placeholder='Try "Building mobile apps"'
                     />
                  </div>

                  <button
                     className='py-2 px-5 rounded-tr-md rounded-br-md bg-green-500 w-[200px] text-lg font-medium'
                     type='submit'
                  >
                     Search
                  </button>
               </form>
               <div>
                  <span>Popular : </span>
                  {popularCat.map((item, index) => {
                     return (
                        <button
                           className='border border-white rounded-full py-1 px-2 text-sm ml-2'
                           key={index}
                        >
                           {item}
                        </button>
                     );
                  })}
               </div>
            </div>
            <div className='relative'>
               <img src='/images/man.png' alt='' />
               <p className='absolute text-white opacity-80 drop-shadow-xl bottom-5 right-20'>
                  Zach <span className='font-bold'>Bar</span>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Featured;
