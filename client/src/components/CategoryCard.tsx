/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

interface ICategoryCardProps {
   title: string;
   desc: string;
   img: string;
}

const CategoryCard = ({ title, desc, img }: ICategoryCardProps) => {
   return (
      <>
         <Link href='/gigs/sfds'>
            <div className='w-[252px] h-[344px] relative bg-white'>
               <img
                  className='w-[252px] h-[344px] object-cover'
                  src={img}
                  alt=''
               />
               <span>{desc}</span>
               <span>{title}</span>
            </div>
         </Link>
      </>
   );
};

export default CategoryCard;
