// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
const Slider = ({items, className, textbg, titlesize, descsize}) => {

    return (
        <div className='w-full p-6 mb-8'>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                className={className}
            >
                {items.map((i,index)=>{
                    return <SwiperSlide key={index}>
                        <img src={i.image} alt="" className='w-full h-full object-cover '/>
                        <div className='absolute top-full -translate-y-full p-6 flex flex-col min-w-full text-center'>
                            {i.title && <h1 className={`${textbg} ${titlesize || "text-4xl mb-4 font-bold"} font-bold rounded-lg px-4 py-2 w-full`}>{i.title}</h1>}
                            {i.details && <p className={`${textbg}  ${descsize || "text-2xl"} rounded-lg px-4 py-2 mb-6 w-full`}>{i.details}</p>}
                        </div>

                        </SwiperSlide>
                })}
            </Swiper>
        </div>
    );
}

export default Slider;