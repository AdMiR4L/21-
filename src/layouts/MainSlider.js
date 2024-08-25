import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Autoplay, FreeMode, Pagination, Navigation} from "swiper/modules";
import Slide from "../assets/delete/slide.jpg"
import CalenderIcon from "../assets/icons/calender-icon.svg"
import './MainSlider.css'
import { useSwiper } from 'swiper/react';
function MainSlider(props) {
    const swiper = useSwiper();
    return (
        <div className="col-12 mt-3 mb-3">
            <section className="main-slider">
                <div className="slider">
                    <ul className="date-calender">
                        <li className="item">
                            <img src={CalenderIcon} alt="" className="calender-icon"/>
                            <div>امــروز</div>
                        </li>
                        <li className="date">
                            <div className="day">
                                18
                            </div>
                            <div className="month">
                                تیـــر
                            </div>
                            <div className="month">
                                ماه
                            </div>
                        </li>
                        <li className="year">
                            1403
                        </li>
                    </ul>
                    <div className="swiping">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            // autoplay={{
                            //     delay: 3000,
                            //     disableOnInteraction: true,
                            // }}
                            // breakpoints={{
                            //     640: {
                            //         slidesPerView: 1,
                            //         spaceBetween: 20,
                            //     },
                            //     768: {
                            //         slidesPerView: 2,
                            //         spaceBetween: 20,
                            //     },
                            // }}
                            pagination={{clickable: true,}}
                            navigation={true}
                            modules={[Autoplay, Pagination, FreeMode, Navigation]}
                            className="main-slider"
                            //freeMode={true}
                        >
                            <SwiperSlide>
                                <div className="slider-item" >
                                    <ul className="slider-content">
                                        <li className="item head">شروع رویداد های مسابقاتی</li>
                                        <li className="item description">کلی رویــداد هیجــان انگیــز بـا برنامه های ویژه براتون داریم</li>
                                        <li className="item btn">
                                            <span className="txt">هیمن حالا ثبت نام کنید</span>
                                            <span className="arrow">
                                                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 10.49 7.65">
                                                    <path
                                                        d="M.14,4.17l3.34,3.34c.18.19.49.19.67.01.19-.18.19-.49.01-.67,0,0,0,0-.01-.01l-2.52-2.52h8.39c.26,0,.48-.21.48-.48s-.21-.48-.48-.48H1.63L4.15.83c.19-.18.21-.48.03-.67-.18-.19-.48-.21-.67-.03,0,0-.02.02-.03.03L.14,3.49c-.19.19-.19.49,0,.67h0Z"/>
                                                </svg>
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="img-container">
                                        <img src={Slide} alt="slide"/>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="slider-item">
                                    <div className="img-container">
                                        <img src={Slide} alt="slide"/>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="slider-item">
                                    <div className="img-container">
                                        <img src={Slide} alt="slide"/>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="slider-item">
                                    <div className="img-container">
                                        <img src={Slide} alt="slide"/>
                                    </div>
                                </div>
                            </SwiperSlide>


                        </Swiper>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainSlider;