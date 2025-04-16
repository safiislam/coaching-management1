"use client";

import { useGetBannerQuery } from "../../Redux/features/Auth/auth.api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import { motion } from 'framer-motion';
import Link from "next/link";

export default function HeroSection() {
  const { data: banners } = useGetBannerQuery();

  return (
    <div className="h-screen">
      <section className=" relative h-screen w-full overflow-hidden">
        {banners?.data?.length > 0 ? (
          <Swiper
            modules={[Autoplay, EffectFade, Parallax]}
            effect="fade"
            speed={1000}
            parallax={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="h-full w-full"
          >
            {banners?.data?.map((banner) => (
              <SwiperSlide key={banner._id} className="relative">
                {/* Background Image with Parallax Effect */}
                <div
                  className="absolute inset-0 z-0"
                  data-swiper-parallax="-30%"
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="absolute h-full w-full object-cover"
                    loading="lazy" // Lazy loading for better performance
                    decoding="async" // Async decoding
                    width={1920} // Set appropriate width
                    height={1080} // Set appropriate height
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Content with Animations */}
                <div className="container mx-auto h-full flex items-center relative z-10 px-6">
                  <div className="max-w-3xl text-white">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                      data-swiper-parallax="-100"
                    >
                      {banner.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-lg md:text-xl mb-8"
                      data-swiper-parallax="-200"
                    >
                      {banner.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      data-swiper-parallax="-300"
                    >
                      <Link href={'/courses'} className="px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                        Learn More
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">No banners available</p>
          </div>
        )}
      </section>
      {/* <div className="flex gap-5 mt-2">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full hover:shadow-lg transition">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">React.js Crash Course</h3>
            <p className="text-sm text-gray-600 mt-1">Master the basics of React with modern hooks and real-world projects.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Class Based</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ongoing</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-sm font-medium text-yellow-600">$99</span>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">View</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full hover:shadow-lg transition">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">React.js Crash Course</h3>
            <p className="text-sm text-gray-600 mt-1">Master the basics of React with modern hooks and real-world projects.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Class Based</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ongoing</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-sm font-medium text-yellow-600">$99</span>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">View</button>
          </div>
        </div>



      </div> */}


    </div>
  );
}