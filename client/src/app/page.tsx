import Featured from '@/components/Featured';
import Slide from '@/components/Slide';
import TrustedBy from '@/components/TrustedBy';
import CategoryCard from '@/components/CategoryCard';
import { cards } from '@/data';

export default function Home() {
   return (
      <div className='h-[2000px]'>
         <Featured />
         <TrustedBy />
         <Slide slides={cards} />
      </div>
   );
}
