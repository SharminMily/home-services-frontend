"use client";
import { DotLoader } from "react-spinners";
import useGetBannerData from "@/hooks/useGetBannerData";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay} from "swiper/modules";

const Hero = () => {
  const { data, error, isLoading } = useGetBannerData();

  if (error) return <p className="text-center text-red-500">{error.message}</p>;
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <DotLoader
          color="#ff0800"
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mx-auto"
        />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-center">No banner data available.</p>;
  }

  return (
    <div className="w-full">
      <style jsx>{`
        .mySwiper {
          width: 100%;
          height: auto;
          position: relative;
        }
        .mySwiper .swiper-slide {
          display: none;
          height: auto;
          min-height: 300px;
        }
        .mySwiper .swiper-slide-active {
          display: block;
        }
        .mySwiper .swiper-wrapper {
          display: flex;
          align-items: stretch;
        }
        .mySwiper .swiper-slide > div {
          height: 100%;
        }
        @media (min-width: 768px) {
          .mySwiper .swiper-slide {
            min-height: 500px;
          }
        }
      `}</style>

      <Swiper
        spaceBetween={0}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        modules={[ Autoplay]}
        className="mySwiper"
      >
        {data.map((banner,index) => (
          <SwiperSlide key={banner.id}>
            <div
              className={`flex flex-col ${index %2 === 0 ? "md:flex-row":"md:flex-row-reverse"} items-center justify-between max-w-7xl mx-auto md:py-20 gap-5 h-full`}
            >
              <div className="w-1/2 relative">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-auto lg:h-[500px] object-contain"
                  src={banner?.backgroundImage || "/fallback-image.jpg"}
                  alt={banner.title || "Banner image"}
                />
              </div>
              <div className="w-1/2 flex flex-col justify-center space-y-4">
                <h1 className="md:text-3xl lg:text-5xl font-semibold">
                  {banner.title}
                </h1>
                <p className="text-sm md:text-base lg:text-lg">
                  {banner.details}
                </p>
                <div className="flex gap-3">
                  <Link href={banner.buttonLink}>
                    <button className="text-sm md:text-base lg:text-lg font-semibold bg-primary px-4 py-1 text-white rounded-full hover:bg-secondary transition-all duration-300 ease-in-out cursor-pointer">
                      {banner.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;