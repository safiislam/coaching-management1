"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "Tamim Hossain",
        course: "Class 6 - General Mathematics",
        review:
            "The lessons were so easy to follow! I finally understood fractions and algebra properly.",
        image: "https://randomuser.me/api/portraits/men/31.jpg",
        rating: 5,
    },
    {
        id: 2,
        name: "Sumaiya Akter",
        course: "Class 8 - Science",
        review:
            "Very helpful and interactive. I enjoyed the experiments and video explanations a lot!",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 4,
    },
    {
        id: 3,
        name: "Rakibul Islam",
        course: "Class 9 - ICT",
        review:
            "I learned so much about computers and the internet. This course helped me prepare for exams perfectly.",
        image: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 5,
    },
    {
        id: 4,
        name: "Sadia Jahan",
        course: "Class 7 - English Grammar",
        review:
            "Grammar rules were explained so clearly! My writing and speaking improved a lot.",
        image: "https://randomuser.me/api/portraits/women/39.jpg",
        rating: 4,
    },
    {
        id: 5,
        name: "Mizanur Rahman",
        course: "Class 10 - Bangla Literature",
        review:
            "This course made Bangla poems and stories much more interesting. The teacher was very engaging!",
        image: "https://randomuser.me/api/portraits/men/50.jpg",
        rating: 5,
    },
];


const TestimonialComponent = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Students Say</h2>
                <p className="text-gray-600 mb-10 text-sm sm:text-base">
                    Hear from learners who’ve transformed their careers with our courses.
                </p>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 1000 }}
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-white rounded-2xl shadow-lg p-6 m-2 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {testimonial.name}
                                </h3>
                                <p className="text-blue-600 text-sm mb-2">{testimonial.course}</p>
                                <div className="flex justify-center mb-3">
                                    {[...Array(testimonial.rating)].map((_, index) => (
                                        <FaStar key={index} className="text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm">
                                    “{testimonial.review}”
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialComponent;
