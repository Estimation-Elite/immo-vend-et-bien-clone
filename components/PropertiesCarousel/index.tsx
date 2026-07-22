'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CTAButton from '@/components/CTAButton';

const ALESSIA = '/images/agents/alessia.jpeg';
const SEBASTIEN = '/images/agents/sebastien.png';
const VERONIQUE = '/images/agents/veronique.jpg';

const slides = [
  { photo: '/images/properties/epernay-315.jpeg', city: 'Épernay', surface: 152, price: '315 000', agent: ALESSIA, agentName: 'Alessia', badge: 'Vendu en 15 jours' },
  { photo: '/images/properties/vauciennes-305.jpg', city: 'Vauciennes', surface: 136, price: '305 000', agent: SEBASTIEN, agentName: 'Sébastien', badge: 'Vendu en 3 semaines' },
  { photo: '/images/properties/epernay-490.jpeg', city: 'Epernay', surface: 136, price: '490 000', agent: VERONIQUE, agentName: 'Véronique', badge: 'Vendu en 3 semaines' },
  { photo: '/images/properties/epernay-129.jpg', city: 'Épernay', surface: 80, price: '129 000', agent: ALESSIA, agentName: 'Alessia', badge: 'Vendu en 3 semaines' },
  { photo: '/images/properties/reims-francoise.jpg', city: 'Épernay', surface: 213, price: '499 000', agent: SEBASTIEN, agentName: 'Sébastien', badge: 'Vendu en 15 jours' },
  { photo: '/images/properties/reims-219.jpeg', city: 'Reims', surface: 90, price: '219 000', agent: VERONIQUE, agentName: 'Véronique', badge: 'Vendu en 3 semaines' },
  { photo: '/images/properties/montbre-610.jpg', city: 'Montbré', surface: 160, price: '610 000', agent: ALESSIA, agentName: 'Alessia', badge: 'Vendu en 3 semaines' },
  { photo: '/images/properties/reims-349.jpeg', city: 'Reims', surface: 120, price: '349 000', agent: VERONIQUE, agentName: 'Véronique', badge: 'Vendu en 3 semaines' },
  { photo: '/images/properties/reims-353.jpg', city: 'Reims', surface: 93, price: '353 000', agent: ALESSIA, agentName: 'Alessia', badge: 'Vendu en 3 semaines' },
  { photo: '/images/properties/bezannes-319.jpeg', city: 'Bezannes', surface: 104, price: '319 000', agent: VERONIQUE, agentName: 'Véronique', badge: 'Vendu en 3 semaines' },
];

export default function PropertiesCarousel() {
  return (
    <section className="bg-(--color-teal) py-12 md:py-18">
      <div className="max-w-285 mx-auto px-5 text-center">
        <h2 className="font-['arista-pro','Roboto',sans-serif] text-[28px] md:text-[40px] text-white m-0 mb-8">
          Nos derniers biens vendus en moins de 30 jours
        </h2>
        <div className="mb-8 properties-carousel">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1025: { slidesPerView: 3 },
            }}
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
                  <div className="relative">
                    <img
                      src={slide.photo}
                      alt={slide.city}
                      className="w-full h-55 object-cover block"
                    />
                    <span className="absolute top-5 right-5 bg-(--color-orange) text-white font-['effra','Roboto',sans-serif] text-sm uppercase py-1 px-2">
                      {slide.badge}
                    </span>
                  </div>
                  <div className="px-8 py-4 flex gap-3 font-['effra','Roboto',sans-serif] text-2xl text-(--color-dark) flex-wrap justify-center">
                    <span className="flex items-center gap-2 font-bold">
                      <svg className="w-6 h-6 fill-(--color-orange) shrink-0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256,0C166.035,0,91,72.47,91,165c0,35.202,10.578,66.592,30.879,96.006l121.494,189.58c5.894,9.216,19.372,9.198,25.254,0l122.021-190.225C410.512,232.28,421,199.307,421,165C421,74.019,346.981,0,256,0z M256,240c-41.353,0-75-33.647-75-75c0-41.353,33.647-75,75-75c41.353,0,75,33.647,75,75C331,206.353,297.353,240,256,240z" /><path d="M373.264,344.695l-75.531,118.087c-19.551,30.482-64.024,30.382-83.481,0.029l-75.654-118.085C72.034,360.116,31,388.309,31,422c0,58.462,115.928,90,225,90s225-31.538,225-90C481,388.285,439.909,360.077,373.264,344.695z" /></svg>
                      {slide.city}
                    </span>
                    <span className="flex items-center gap-2 font-bold">
                      <svg className="w-6 h-6 fill-(--color-orange) shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m8 8.9c-.3 0-.5-.1-.7-.3l-5-4.9c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l5 4.9c.4.4.4 1 0 1.4-.2.3-.4.3-.7.3z" /><path d="m3 22c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-5 5c-.2.2-.4.3-.7.3z" /><path d="m21 22c-.3 0-.5-.1-.7-.3l-4.9-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.9 5c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z" /><path d="m16 8.9c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l5-4.9c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-5 4.9c-.2.3-.4.3-.7.3z" /><path d="m21 8.5c-.6 0-1-.4-1-1v-3.5h-3.5c-.6 0-1-.4-1-1s.4-1 1-1h4.5c.6 0 1 .4 1 1v4.5c0 .6-.4 1-1 1z" /><path d="m21 22h-4.5c-.6 0-1-.4-1-1s.4-1 1-1h3.5v-3.5c0-.6.4-1 1-1s1 .4 1 1v4.5c0 .6-.4 1-1 1z" /><path d="m7.5 22h-4.5c-.6 0-1-.4-1-1v-4.5c0-.6.4-1 1-1s1 .4 1 1v3.5h3.5c.6 0 1 .4 1 1s-.4 1-1 1z" /><path d="m3 8.5c-.6 0-1-.4-1-1v-4.5c0-.6.4-1 1-1h4.5c.6 0 1 .4 1 1s-.4 1-1 1h-3.5v3.5c0 .6-.4 1-1 1z" /></svg>
                      {slide.surface} m²
                    </span>
                    <span className="flex items-center gap-2 font-bold">
                      <svg className="w-6 h-6 fill-(--color-orange) shrink-0" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="m24 1.5a22.5 22.5 0 1 0 22.5 22.5 22.5 22.5 0 0 0 -22.5-22.5zm9.171 31.081a11.37 11.37 0 0 1 -18.171-4.693h-2.185a1.5 1.5 0 0 1 0-3h1.533c-.022-.288-.048-.588-.048-.888s.022-.6.045-.892h-1.53a1.5 1.5 0 0 1 0-3h2.185a11.391 11.391 0 0 1 10.682-7.491 11.267 11.267 0 0 1 7.03 2.43 1.5 1.5 0 1 1 -1.853 2.358 8.3 8.3 0 0 0 -5.177-1.788 8.387 8.387 0 0 0 -7.418 4.491h6.241a1.5 1.5 0 0 1 0 3h-7.153a8.466 8.466 0 0 0 -.052.892 8.6 8.6 0 0 0 .047.884h7.158a1.5 1.5 0 0 1 0 3h-6.24a8.376 8.376 0 0 0 12.935 2.437 1.5 1.5 0 0 1 1.973 2.26z" /></svg>
                      {slide.price}€
                    </span>
                  </div>
                  <div className="w-[80%] h-px bg-[#eee] mx-auto"></div>
                  <div className="p-4 flex items-center gap-3 justify-center">
                    <img
                      src={slide.agent}
                      alt={slide.agentName}
                      className="w-15 h-15 rounded-full object-cover bg-[#5D8D96]"
                    />
                    <span className="font-['effra','Roboto',sans-serif] text-(--color-dark)">
                      Vendu par {slide.agentName}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <CTAButton opensForm location="properties">Je vérifie l&apos;éligibilité de mon bien</CTAButton>
      </div>
    </section>
  );
}
