import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import emc from '../../assets/partenaires/emc.jpg';
import fiaro from '../../assets/partenaires/fiaro.png';
import hackama from '../../assets/partenaires/Hack@ma.png';
import gsps from '../../assets/partenaires/Logo GSPS.png';
import miary from '../../assets/partenaires/miary.jpg';
import poesam from '../../assets/partenaires/poesam.jpg';
import sprint from '../../assets/partenaires/sprint.png';

export default function Sponsoring() {
  const image_slides = [
    [AAL, AWS, emc],
    [fiaro, gsps,incubeme],
    [hackama, miary, Orange ],
    [poesam, sprint, Zafitody ]
  ];

  return (
    <section className="flex flex-col justify-center">
      <div className="text-center text-4xl font-bold mb-10">
        <h2 className="title-meddoc color-meddoc-dark">Nos partenaires</h2>
      </div>
      <div>
        <Swiper
          spaceBetween={30}
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
          className="mySwiper lg:w-3/4"
        >
          {image_slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center" style={{ height: '200px' }}> {/* Adjust height as needed */}
                {slide.map((partner, partnerIndex) => (
                  <img
                    key={partnerIndex}
                    src={partner}
                    alt={`Partner ${index}-${partnerIndex}`}
                    className="m-4 h-full object-cover" // Add object-cover to ensure the image covers the container
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

