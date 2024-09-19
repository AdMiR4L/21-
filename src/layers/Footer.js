import Dice from "../assets/icons/dice.svg";
import Lock from "../assets/icons/lock.svg";
import Return from "../assets/icons/return.svg";
import Logo from "../assets/icons/footer-logo.svg";
import Stoic from "../assets/stloic.png";
import Telephone from "../assets/telephone.png";


import "./Footer.css";
import {Link, useLocation} from "react-router-dom";

function Footer(props) {

    const location  = useLocation();
    return (
        <footer className="">
            <div className="main-footer d-none d-md-block">
                <div className="space-25"></div>
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="right-side">
                                <div className="img-container">
                                    <a href="/">
                                        <img src={Logo} alt="logo"/>
                                    </a>
                                </div>
                                <ul className="benefits">
                                    <li className="item">
                                        <div className="icon-container">
                                            <img src={Dice} alt="dice"/>
                                        </div>
                                        <div className="content">
                                            <div className="head">
                                                رتبه یک گیم
                                            </div>
                                            <div className="description">
                                                معتبرترین مرکز گیم شمال
                                            </div>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <div className="icon-container">
                                            <img src={Lock} alt="lock"/>
                                        </div>
                                        <div className="content">
                                            <div className="head">
                                                پرداخت امن
                                            </div>
                                            <div className="description">
                                                متصل به سه درگاه پرداخت
                                            </div>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <div className="icon-container">
                                            <img src={Return} alt="return"/>
                                        </div>
                                        <div className="content">
                                            <div className="head">
                                                بازگشت وجه
                                            </div>
                                            <div className="description">
                                                ضمانت برگشت در صورت مشکل
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="center-footer">
                                <div className="about">
                                    <h2>مجموعه ورزشی <span className="color-primary">بیست و یک</span> درجه</h2>
                                    <p>
                                        مفتخر است از میهمانان عزیز در فضاهای تفکیک شده شامل کافی شاپ، سالن بازی، سالن
                                        مافیا
                                        و
                                        ... پذیرایی کند. ما طی گذشت سالهای اخیر، نیاز و کاستی های شهر خود را دیده و
                                        تصمیم به
                                        برطرف کردن گوشه ای از آن خلا ها گرفته ایم و هدف خود را ابتدا مشخص کردیم‌. ما با
                                        خود
                                        قرار
                                        گذاشته ایم تا به وقت تمام بی خیالی ها، شما را از دنیای خود خارج کرده و به دنیایی
                                        پر
                                        از
                                        رنگ، شادی، بازی و... وارد کنیم
                                        چه چیزی بهتر از یک دور همی و یک سفارش دلچسب و بازی کردن در محیطی صمیمانه! ما
                                        مفتخریم
                                        که
                                        این محیط رنگارنگ را با برد گیم های متنوع در اختیار شما قرار داده ایم‌
                                    </p>
                                </div>
                                <ul className="main-info">
                                    <li className="address">
                                        <div className="inline-block">
                                            <svg className="loc-icon" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 37.12 62.08">
                                                <path
                                                    d="M36.6,14.66C34.9,6.07,27.32-.09,18.57,0h-.02C9.8-.09,2.23,6.06.52,14.64c-2.45,11.29,4.16,20.85,10.14,26.86,4.22,4.36,11.17,4.48,15.53.26.09-.08.17-.17.26-.26,5.98-6.02,12.59-15.55,10.14-26.84ZM18.57,25.62c-3.72-.09-6.67-3.17-6.59-6.89-.08-3.72,2.87-6.81,6.59-6.89,3.72.09,6.67,3.17,6.59,6.89.08,3.72-2.87,6.81-6.59,6.89Z"/>
                                                <ellipse cx="18.04" cy="57.05" rx="17.09" ry="5.03"/>
                                            </svg>
                                        </div>
                                        <ul className="inline-block text-right">
                                            <li className="tag">Address</li>
                                            <li className="txt">
                                            <span className="strong">
                                                گیلان، رشت
                                            </span>
                                                - بلوار سمیه، پشت بیمارستان گلســار
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul className='mail-side'>
                                            <li className="tag left">
                                                Critics and suggestions
                                            </li>
                                            <li className="txt mail">
                                                info@21sport.club
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className="space-50"></div>
                                <div className="navigation">
                                    <ul className="nav-box">
                                        <li className="item">
                                            <a href="">اخبار و مقالات</a>
                                        </li>
                                        <li className="item">
                                            <a href="">تماس با ما</a>
                                        </li>
                                        <li className="item">
                                            <a href="">باشگاه مشتریان</a>
                                        </li>
                                    </ul>
                                    <div className="line"></div>
                                    <ul className="nav-box">
                                        <li className="item">
                                            <a href="">راهنمای خرید</a>
                                        </li>
                                        <li className="item">
                                            <a href="">پرسش و پاسخ</a>
                                        </li>
                                        <li className="item">
                                            <a href="">قوانین و مقررات</a>
                                        </li>
                                    </ul>
                                    <div className="line"></div>
                                    <ul className="nav-box">
                                        <li className="item">
                                            <a href="">فروش سازمانی</a>
                                        </li>
                                        <li className="item">
                                            <a href="">فرصت های شغلی</a>
                                        </li>
                                        <li className="item">
                                            <a href="">درباره ما</a>
                                        </li>
                                    </ul>
                                    <div className="stoic">
                                        <div className="arrow" onClick={() => window.scrollTo({
                                            top: 0, behavior: 'smooth'})}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.58 36.47">
                                                <path
                                                    d="M12.13.48L.52,12.08c-.66.63-.69,1.68-.06,2.34s1.68.69,2.34.06l.06-.06L11.63,5.64v29.17c0,.92.74,1.66,1.66,1.66.92,0,1.66-.74,1.66-1.66h0V5.66s8.78,8.77,8.78,8.77c.63.66,1.68.69,2.34.06.66-.63.69-1.68.06-2.34h0l-.06-.06L14.47.49c-.64-.65-1.68-.65-2.33,0,0,0,0,0,0,0h0Z"/>
                                            </svg>
                                        </div>
                                        <div className="footer-img-container">
                                            <img src={Stoic} alt="stoic"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="support">
                                <div className="img-container">
                                    <img src={Telephone} alt="telephone"/>
                                </div>
                                <ul className="content">
                                    <li className="head">
                                        پشتیبانی
                                    </li>
                                    <li className="description">
                                        هر روز هفته 10 الی 23
                                        کنار شما هستیم
                                    </li>
                                    <li className="number">
                                        013-32119611
                                    </li>
                                    <li>
                                        <ul className="social">
                                            <li>
                                                <a href="">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57.89 57.89">
                                                        <path
                                                            d="M43.58,17.88c-.63-1.64-1.93-2.93-3.56-3.56-1.12-.41-2.3-.63-3.49-.65-1.98-.09-2.57-.11-7.58-.11s-5.61.02-7.58.11c-1.19.01-2.37.23-3.49.65-1.64.63-2.93,1.93-3.56,3.56-.41,1.12-.63,2.3-.65,3.49-.09,1.98-.11,2.57-.11,7.58s.02,5.61.11,7.58c.01,1.19.23,2.37.65,3.49.63,1.64,1.93,2.93,3.56,3.56,1.12.41,2.3.63,3.49.65,1.98.09,2.57.11,7.58.11s5.61-.02,7.58-.11c1.19-.01,2.37-.23,3.49-.65,1.64-.63,2.93-1.93,3.56-3.56.41-1.12.63-2.3.65-3.49.09-1.98.11-2.57.11-7.58s-.02-5.61-.11-7.58c-.01-1.19-.23-2.37-.65-3.49ZM28.96,38.58h-.01,0c-5.32,0-9.64-4.32-9.64-9.64s4.31-9.64,9.64-9.64,9.64,4.31,9.64,9.64c0,5.32-4.31,9.64-9.63,9.64ZM38.96,21.18c-1.24,0-2.25-1.01-2.25-2.25s1.01-2.25,2.25-2.25,2.25,1.01,2.25,2.25-1.01,2.25-2.25,2.25Z"/>
                                                        <path
                                                            d="M28.95,22.69h0c-3.46,0-6.26,2.8-6.26,6.26s2.8,6.26,6.26,6.26,6.26-2.8,6.26-6.26c0-3.45-2.8-6.26-6.25-6.26Z"/>
                                                        <path
                                                            d="M28.94,0C12.96,0,0,12.96,0,28.95c0,15.99,12.96,28.94,28.95,28.94,15.99,0,28.94-12.96,28.94-28.95,0-15.99-12.96-28.95-28.95-28.95ZM47.6,36.68c-.03,1.56-.33,3.1-.87,4.56-.98,2.52-2.97,4.51-5.49,5.49-1.46.55-3,.84-4.56.87-2,.09-2.64.11-7.74.11s-5.74-.02-7.74-.11c-1.56-.03-3.1-.33-4.56-.87-2.52-.98-4.51-2.97-5.49-5.49-.55-1.46-.84-3-.87-4.56-.09-2-.11-2.64-.11-7.74s.02-5.74.11-7.74c.03-1.56.33-3.1.87-4.56.98-2.52,2.97-4.51,5.49-5.49,1.46-.55,3-.84,4.56-.87,2-.09,2.64-.1,7.74-.1s5.74.02,7.74.11c1.56.03,3.1.33,4.56.87,2.52.98,4.51,2.97,5.49,5.49.55,1.46.84,3,.87,4.56.09,2,.11,2.64.11,7.74s-.02,5.73-.11,7.73Z"/>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.67 38.67">
                                                        <polygon
                                                            points="10.89 9.44 24.75 29.27 27.76 29.27 13.9 9.44 10.89 9.44"/>
                                                        <path
                                                            d="M19.33,0C8.65,0,0,8.66,0,19.33s8.66,19.33,19.33,19.33c10.68,0,19.33-8.66,19.33-19.33,0-10.68-8.66-19.33-19.33-19.33ZM23.83,30.68l-6.06-8.82-7.59,8.82h-1.96l8.68-10.09L8.22,7.96h6.62l5.74,8.35,7.19-8.35h1.96l-8.28,9.62,9,13.1h-6.62Z"/>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.67 38.67">
                                                        <path
                                                            d="M14.7,17.58c-1.28,0-2.37.96-2.51,2.24-.16,1.39.84,2.64,2.22,2.8s2.64-.84,2.8-2.22c.08-1.47-1.04-2.73-2.51-2.82Z"/>
                                                        <path
                                                            d="M23.98,17.58c-1.28,0-2.37.96-2.51,2.24-.16,1.39.84,2.64,2.22,2.8s2.64-.84,2.8-2.22h0c.08-1.48-1.04-2.73-2.51-2.82Z"/>
                                                        <path
                                                            d="M19.33,0C8.65,0,0,8.66,0,19.33s8.66,19.33,19.33,19.33c10.68,0,19.33-8.66,19.33-19.33,0-10.68-8.66-19.33-19.33-19.33ZM33.15,26.45c-2.11,1.56-4.47,2.76-6.99,3.53-.04.01-.08,0-.1-.03-.53-.74-1.01-1.51-1.43-2.32-.02-.04,0-.1.04-.12,0,0,0,0,0,0,.75-.28,1.48-.63,2.18-1.04.04-.03.06-.08.03-.12,0,0-.01-.02-.02-.03-.15-.11-.29-.23-.43-.34-.03-.02-.06-.03-.09-.01-4.45,2.09-9.59,2.09-14.04,0-.03-.01-.06,0-.09.01-.14.11-.29.23-.43.34-.04.03-.05.09-.02.13,0,0,.02.02.03.02.7.4,1.43.75,2.18,1.04.05.02.07.07.05.11,0,0,0,0,0,.01-.41.81-.89,1.59-1.43,2.32-.02.03-.06.04-.1.03-2.51-.77-4.87-1.96-6.98-3.53-.02-.02-.03-.04-.04-.07-.57-5.62.89-11.27,4.13-15.9,0-.01.02-.03.04-.03,1.81-.83,3.72-1.43,5.69-1.76.04,0,.07.01.09.04.27.47.51.96.72,1.46,2.12-.32,4.27-.32,6.39,0,.21-.5.45-.98.71-1.46.02-.03.05-.05.09-.04,1.96.34,3.88.93,5.69,1.76.02,0,.03.02.04.03,3.25,4.63,4.72,10.28,4.13,15.9,0,.03-.02.05-.04.06h0Z"/>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.67 38.67">
                                                        <path
                                                            d="M19.33,0C8.65,0,0,8.66,0,19.33s8.66,19.33,19.33,19.33c10.68,0,19.33-8.66,19.33-19.33,0-10.68-8.66-19.33-19.33-19.33ZM19.33,33.98c-8.09,0-14.65-6.56-14.65-14.65s6.56-14.65,14.65-14.65,14.65,6.56,14.65,14.65-6.56,14.65-14.65,14.65Z"/>
                                                        <path
                                                            d="M25.9,13.67c-.17-.11-.37-.17-.57-.17-.55.01-1.4.31-5.46,2-1.43.59-4.27,1.82-8.54,3.68-.69.27-1.06.54-1.09.81-.06.51.67.66,1.58.96.74.26,1.5.45,2.28.54.58-.03,1.13-.23,1.59-.59,3.99-2.69,6.05-4.06,6.18-4.09.1-.04.21-.03.3.03.06.07.09.17.07.26-.07.31-3.82,3.72-4.04,3.94-.83.86-1.76,1.38-.32,2.33,1.25.83,1.98,1.35,3.27,2.2.82.54,1.47,1.18,2.32,1.1.39-.03.79-.4,1-1.5.49-2.59,1.44-8.22,1.66-10.53.02-.19,0-.39-.02-.58-.02-.15-.09-.3-.21-.4Z"/>
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="container">
                        <div className="copyright">
                            Copyright all rights reserved to 21CafeGame & 21SportClub 2018 - 2024
                        </div>
                    </div>
                </div>
            </div>
            <ul className="mobile-nav d-md-none">
                <li className="item">
                    <Link to="/">
                        {
                            location.pathname=== "/" ?
                                <svg className="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 511.68">
                                    <path d="M256,319.68c-35.35,0-64,28.65-64,64v128h128v-128c0-35.35-28.65-64-64-64Z"/>
                                    <path
                                        d="M362.67,383.68v128h85.33c35.35,0,64-28.65,64-64v-194.58c0-11.08-4.3-21.73-12.01-29.7L318.7,27.41c-31.99-34.61-85.98-36.74-120.59-4.75-1.64,1.52-3.23,3.1-4.75,4.75L12.4,223.34C4.45,231.34,0,242.15,0,253.42v194.26C0,483.03,28.65,511.68,64,511.68h85.33v-128c.4-58.17,47.37-105.68,104.07-107.04,58.6-1.41,108.81,46.9,109.26,107.04Z"/>
                                    <path d="M256,319.68c-35.35,0-64,28.65-64,64v128h128v-128c0-35.35-28.65-64-64-64Z"/>
                                </svg>
                                :
                                <svg className="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 505.8">
                                    <path
                                        d="M284.54,10.95c-16.23-14.61-40.86-14.61-57.09,0L0,215.67v221.87c0,37.7,30.56,68.27,68.27,68.27h375.47c37.7,0,68.27-30.56,68.27-68.27h0v-221.87L284.54,10.95ZM320,463.07h-128v-107.22c0-35.35,28.65-64,64-64s64,28.65,64,64v107.22ZM469.33,437.47c0,14.14-11.46,25.6-25.6,25.6h-81.07v-107.22c0-58.91-47.76-106.67-106.67-106.67s-106.67,47.76-106.67,106.67v107.22h-81.07c-14.14,0-25.6-11.46-25.6-25.6h0v-202.82L256,42.66l213.33,192v202.82Z"/>
                                </svg>
                        }
                        <div className="title">
                            خـانه
                        </div>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/articles/archive?page=1">
                        {location.pathname !== "/articles/archive" ?
                        <svg className="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.01 469.83">
                            <path d="M470.56,90.72L313.25,15.77c-34.63-20.68-77.73-21.05-112.7-.96L41.46,90.72c-.6.3-1.22.62-1.79.96C1.92,113.26-11.19,161.37,10.4,199.12c7.32,12.8,18.08,23.28,31.06,30.27l43.88,20.91v104.53c.03,46.74,30.44,88.04,75.07,101.93,31.06,8.99,63.26,13.38,95.6,13.06,32.33.36,64.53-4,95.6-12.95,44.63-13.89,75.05-55.19,75.07-101.93v-104.68l42.67-20.4v175.96c0,11.78,9.55,21.33,21.33,21.33s21.33-9.55,21.33-21.33V149.81c.14-25.05-19.64-48.19-41.45-59.09h0ZM384.01,354.93c.01,27.96-18.13,52.69-44.8,61.08-27.05,7.73-55.07,11.48-83.2,11.14-28.13.34-56.15-3.41-83.2-11.14-26.67-8.39-44.81-33.12-44.8-61.08v-84.31l70.76,33.71c17.46,10.37,37.4,15.82,57.71,15.77,19.33.14,38.33-4.98,54.98-14.8l72.55-34.67v84.31ZM452.28,190.88l-160.9,76.8c-22.43,13.06-50.24,12.69-72.32-.96L61.64,191.84c-17.55-9.46-24.1-31.36-14.64-48.9,3.2-5.93,8-10.85,13.85-14.2L220.75,52.36c22.44-13.03,50.23-12.67,72.32.96l157.31,74.94c11.57,6.42,18.81,18.56,18.96,31.79.02,12.53-6.43,24.19-17.07,30.83h0Z"/>
                        </svg>
                            :
                        <svg className="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.01 469.83">
                            <path d="M512.01,160.05v245.76c0,11.78-9.55,21.33-21.33,21.33s-21.33-9.55-21.33-21.33v-175.96l-157.87,75.43c-16.65,9.82-35.65,14.94-54.98,14.81-20.27.03-40.17-5.42-57.6-15.77L41.46,229.38C3.16,208.78-11.19,161.04,9.41,122.74c6.98-12.98,17.47-23.75,30.27-31.06.58-.34,1.19-.66,1.79-.96L200.55,14.81c34.97-20.08,78.06-19.72,112.68.96l157.33,74.94c25.27,13.98,41.1,40.45,41.45,69.33ZM256.48,362.71c-27.29.06-54.12-7.09-77.76-20.74l-93.38-44.57v57.6c.03,46.74,30.44,88.04,75.07,101.93,31.07,8.92,63.27,13.25,95.59,12.86,32.33.36,64.53-4,95.59-12.95,44.63-13.89,75.05-55.19,75.07-101.93v-57.41l-95.13,45.44c-22.83,13.12-48.74,19.95-75.07,19.8v-.04Z"/>
                        </svg>
                        }
                        <div className="title">
                            آموزش
                        </div>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/leaderboard">


                        {location.pathname !== "/leaderboard" ?
                            <svg className="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 469.33 512.12">
                                <path
                                    d="M417.54,92.05L289.54,15.25c-33.76-20.33-76-20.33-109.76,0L51.78,92.05C19.73,111.41.11,146.08,0,183.52v145.07c.11,37.44,19.73,72.11,51.78,91.48l128,76.8c33.76,20.34,76,20.34,109.76,0l128-76.8c32.05-19.36,51.69-54.03,51.8-91.48v-145.07c-.11-37.44-19.75-72.12-51.8-91.48h0ZM201.75,51.86c20.25-12.2,45.59-12.2,65.83,0l128,76.8c3.5,2.1,6.78,4.54,9.81,7.27l-170.67,102.4-170.67-102.4c3.03-2.74,6.31-5.18,9.81-7.27l127.87-76.8ZM73.75,383.48c-19.24-11.61-31.02-32.42-31.08-54.89v-145.07c0-3.39.28-6.78.83-10.13l169.83,101.87v190.46c-4.03-1.44-7.91-3.27-11.58-5.48l-128-76.76ZM426.67,328.59c-.07,22.47-11.85,43.27-31.08,54.89l-128,76.8c-3.67,2.21-7.55,4.04-11.58,5.48v-190.51l169.83-101.89c.56,3.36.84,6.75.83,10.15v145.07Z"/>
                            </svg>
                            :
                            <svg className="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0"
                                 y="0" viewBox="0 0 24 24">
                                <g>
                                    <path
                                        d="M14.762 11.587a5.5 5.5 0 0 1-1.762.636v11.651a4.922 4.922 0 0 0 1.5-.557l6.027-3.479a5.016 5.016 0 0 0 2.5-4.331v-6.96a4.959 4.959 0 0 0-.265-1.57ZM10.242 9.857a3.531 3.531 0 0 0 3.521 0l8-4.61a4.983 4.983 0 0 0-1.238-1.027L14.5.737a5.015 5.015 0 0 0-5 0l-6.027 3.48a4.974 4.974 0 0 0-1.2.983ZM11 12.223a5.493 5.493 0 0 1-1.763-.636l-7.98-4.664a4.956 4.956 0 0 0-.284 1.624v6.96a5.016 5.016 0 0 0 2.5 4.331L9.5 23.317a4.922 4.922 0 0 0 1.5.557Z">
                                    </path>
                                </g>
                            </svg>
                        }
                        <div className="title">
                            لیدر برد
                        </div>
                    </Link>
                </li>
                <li className="item">
                    <Link to="/dashboard"
                          onClick={(event) => {
                              if (!localStorage.authToken) {
                                  event.preventDefault(); // Prevent default navigation
                                  props.setloginModal(true); // Open login modal
                              }
                          }}>
                        {
                            location.pathname !== "/dashboard" ?
                                <svg className="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 384 512">
                                    <path
                                        d="M384,512h-42.67v-107.58c-.04-34.82-28.26-63.05-63.08-63.08H105.75c-34.82.04-63.05,28.26-63.08,63.08v107.58H0v-107.58c.07-58.37,47.37-105.68,105.75-105.75h172.5c58.37.07,105.68,47.37,105.75,105.75v107.58ZM192,256c-70.69,0-128-57.31-128-128S121.31,0,192,0s128,57.31,128,128c-.07,70.66-57.34,127.93-128,128ZM192,42.67c-47.13,0-85.33,38.21-85.33,85.33s38.21,85.33,85.33,85.33,85.33-38.21,85.33-85.33-38.21-85.33-85.33-85.33Z"/>
                                </svg>
                                :
                                <svg className="mobile-nav-icon" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 384 512">
                                    <path
                                        d="M278.25,298.67H105.75c-58.37.07-105.68,47.37-105.75,105.75v107.58h384v-107.58c-.07-58.37-47.37-105.68-105.75-105.75Z"/>
                                    <circle cx="192" cy="128" r="128"/>
                                </svg>
                        }
                        <div className="title">
                            پروفایل
                        </div>
                    </Link>
                </li>
            </ul>

        </footer>
    );
}

export default Footer;

