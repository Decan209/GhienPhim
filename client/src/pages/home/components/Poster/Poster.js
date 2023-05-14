import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
import Image from "next/image";

const Poster = ({data}) => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container"
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
      >
        {data?.map((i) => (
          <SwiperSlide key={i._id}>
            <img src={i.poster} alt="slide_image" className="max-w-xl max-h-80" style={{backgroundSize: "cover"}}/>
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <AiFillCaretLeft className="arrow-back-outline" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <AiFillCaretRight className="arrow-forward-outline" />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </>
  );
};

export default Poster;
