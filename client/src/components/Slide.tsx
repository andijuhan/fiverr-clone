'use client';
import { useRef } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { BsArrowLeftShort } from 'react-icons/bs';
import CategoryCard from './CategoryCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css/bundle';

interface ISlideProps {
   slides: {
      id: number;
      title: string;
      desc: string;
      img: string;
   }[];
}

const Slide = ({ slides }: ISlideProps) => {
   const swiperRef = useRef<any>();

   return (
      <div>
         <div className='container mx-auto'>
            <div className='max-w-7xl mx-auto relative'>
               <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={5}
                  loop={true}
                  autoplay
                  slidesPerGroup={5}
                  onSwiper={(swiper) => {
                     swiperRef.current = swiper;
                  }}
               >
                  {slides.map((item, index) => {
                     return (
                        <SwiperSlide key={index}>
                           <CategoryCard
                              key={item.id}
                              title={item.title}
                              desc={item.desc}
                              img={item.img}
                           />
                        </SwiperSlide>
                     );
                  })}
               </Swiper>
               <button
                  onClick={() => swiperRef.current.slidePrev()}
                  className='p-1 h-[50px] text-gray-800 bg-gray-200 rounded-full drop-shadow-md z-100 absolute top-1/2 transform translate-y-[-50%] -ml-5 z-50'
               >
                  <BsArrowLeftShort size={40} />
               </button>
               <button
                  onClick={() => swiperRef.current.slideNext()}
                  className='p-1 h-[50px] text-gray-800 bg-gray-200 rounded-full drop-shadow-md absolute right-0 top-1/2 transform translate-y-[-50%] -mr-5 z-50'
               >
                  <BsArrowRightShort size={40} />
               </button>
            </div>
         </div>
      </div>
   );
};

export default Slide;
