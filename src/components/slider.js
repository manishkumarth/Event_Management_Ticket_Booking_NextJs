"use client";
import React from 'react';


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
            >
                <SwiperSlide style={{height:"300px"}}>
                    <img height="100%" src="https://cdn.vectorstock.com/i/1000v/06/20/neon-event-sign-upcoming-vector-22430620.avif" alt="Slide 1"  />
                </SwiperSlide>
                <SwiperSlide style={{height:"300px"}}>
                    <img height="100%" src='https://cdn.vectorstock.com/i/750p/59/67/colorful-event-spectrum-word-sign-vector-48365967.avif' />
                </SwiperSlide>
                <SwiperSlide style={{height:"300px"}}>
                    <img height="100%" src='https://images.pexels.com/photos/2167382/pexels-photo-2167382.jpeg' />
                </SwiperSlide>
            </Swiper>

        </div>
    );
}

export default Slider;
