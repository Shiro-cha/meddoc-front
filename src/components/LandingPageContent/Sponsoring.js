import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import AAL from '../../assets/partenaires/aal.png';
import AWS from '../../assets/partenaires/aws.png';
import Orange from '../../assets/partenaires/orangefab.png';
import Zafitody from '../../assets/partenaires/zafitody.png';
import incubeme from '../../assets/partenaires/incubeme.png';
import usaid from '../../assets/partenaires/usaid.png';



export default function Sponsoring() {
const image_slides=[
  AAL,
  AWS,
  Orange,
  Zafitody,
  incubeme,
  usaid,
]

  return (

   <section className='flex flex-col justify-center'>
<div className='text-center text-4xl font-bold mb-10'>


   <h2 className=''>Ils nous soutiennent </h2>
</div>

<div>
<Swiper
    spaceBetween={0}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper lg:w-1/2"
  >
      {image_slides.map((image, index) => (
        <SwiperSlide key={index} className="center-slide">
          <img src={image} alt={`Slide ${index}`} className="center-image m-auto" />
        </SwiperSlide>
      ))}

  </Swiper>
</div>
        


</section>   

  
  
  )
}


