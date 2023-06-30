/* eslint-disable @next/next/no-img-element */
import React from 'react';

const TrustedBy = () => {
   const trustedImage = [
      'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png',
      'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png',
      'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png',
      'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png',
      'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png',
   ];
   return (
      <div className='py-[20px]'>
         <div className='container mx-auto flex justify-center items-center gap-4'>
            <span className='font-medium text-gray-300'>Trusted by: </span>
            {trustedImage.map((imgUrl, index) => {
               return (
                  <img className='h-[50px]' key={index} src={imgUrl} alt='' />
               );
            })}
         </div>
      </div>
   );
};

export default TrustedBy;
