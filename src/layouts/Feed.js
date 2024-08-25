
import FeedImage from "../assets/Feed.png"
import './Feed.css'
function Feed(props) {
    return (
        <div className="col-12 mt-3 mb-3 d-none d-md-block">
            <section className="feedback">
               <div className="feed">
                   <ul className="content">
                       <li className="head">
                           کافه گیم بیست و یک درجه
                       </li>
                       <li className="description">
                           چه چیزی بهتر از یک دور همی و یک سفارش دلچسب و بازی کردن در محیطی صمیمانه! ما مفتخریم که این محیط رنگارنگ را با برد گیم های متنوع در اختیار شما قرار داده ایم
                       </li>
                       <li className="number">
                           <div className="input-container">
                               <input className="feed-input" type="text" placeholder="شـمـاره تـلـفـن خـود را وارد کنـیــد"/>
                               <svg className="phone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
                                   <path d="M22.5,0C10.07,0,0,10.07,0,22.5s10.07,22.5,22.5,22.5,22.5-10.07,22.5-22.5S34.93,0,22.5,0ZM33.75,35.16c-13.2-.01-23.89-10.71-23.91-23.91,0-.78.63-1.41,1.41-1.41h5.19c.78,0,1.41.63,1.41,1.41-.01,2.38.53,4.74,1.57,6.88.34.7.05,1.54-.65,1.88,0,0,0,0,0,0l-2.1,1.01c1.74,3.04,4.26,5.56,7.3,7.3l1.01-2.1c.34-.7,1.18-.99,1.88-.65,0,0,0,0,0,0,2.14,1.04,4.49,1.58,6.88,1.57.78,0,1.41.63,1.41,1.41v5.2h0c0,.77-.62,1.4-1.4,1.41Z"/>
                               </svg>
                               <button className="register">ارسـال</button>
                           </div>
                       </li>
                   </ul>
                   <div className="img-container">
                       <img src={FeedImage} alt="Feed"/>
                   </div>
               </div>
            </section>
        </div>
    );
}

export default Feed;