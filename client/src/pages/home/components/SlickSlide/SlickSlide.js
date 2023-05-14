import Link from "next/link";
// import { settings } from "./ConfigSlider";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};


const SlickSlide = ({ data }) => {
  return (
    <>
      <div className="lg:w-11/12 w-10/12 mx-auto">
        <Slider {...settings}>
          {data?.map((data) => (
            <Link
              href={`/details`}
              as={`/details/${data.slug}`}
              className="p-4 cursor-pointer hover:bg-gray-800"
              key={data._id}
            >
              <Image
                width={100}
                height={100}
                src={data.avatar}
                alt=""
                className="rounded-lg h-64 w-full max-sm:h-40"
              />
              <div className="text-xl font-medium font-mono text-center mt-3">
                {data.name}
              </div>
              <div className="text-center font-medium text-gray-300 font-serif">
                {data.englishName}
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SlickSlide;
