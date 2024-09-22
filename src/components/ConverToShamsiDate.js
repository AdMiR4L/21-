import React from 'react';
import jalaali from 'jalaali-js';

const ConvertToShamsiDate = ({ gregorianDate, name, article, slider, leaderboard, archive, comment, single }) => {
    // Extract year, month, and day from the Gregorian date
    const date = new Date(gregorianDate);
    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth() + 1; // getMonth() is zero-based, so add 1
    const gregorianDay = date.getDate();

    const shamsiMonthNames = [
        "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
    ];
    /*const shamsiDayNames = [
        "شنبه", "یک ‌شنبه", "دوشنبه", "سه ‌شنبه", "چهارشنبه", "پنج ‌شنبه", "جمعه"
    ];*/
    const shamsiDayNames = [
        "سه ‌شنبه", "چهارشنبه", "پنج ‌شنبه", "جمعه", "شنبه", "یک ‌شنبه", "دوشنبه"
    ];
    // const tehranDateString  = date.toLocaleString('fa-IR', {
    //     timeZone: 'Asia/Tehran',
    //     year: 'numeric',
    //     month: 'numeric',
    //     day: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     hour12: false,  // 24-hour format
    // });


    // Get the current time
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMillis = now - date;

    // Convert milliseconds to minutes and hours
    const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
    const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInMillis / (1000 * 60 * 60 * 24 * 7));
    const rtf = new Intl.RelativeTimeFormat('fa-IR', { numeric: 'auto' });

    const getRelativeTime = () => {
        if (diffInMinutes < 60) {
            return rtf.format(-diffInMinutes, 'minute'); // "X دقیقه پیش"
        } else if (diffInHours < 24) {
            return rtf.format(-diffInHours, 'hour'); // "X ساعت پیش"
        } else if (diffInDays < 7) {
            return rtf.format(-diffInDays, 'day'); // "X روز پیش"
        } else {
            return rtf.format(-diffInWeeks, 'week'); // "X هفته پیش"
        }
    };

    // Convert to Jalali (Shamsi) date
    const { jy, jm, jd } = jalaali.toJalaali(gregorianYear, gregorianMonth, gregorianDay);


    const shamsiMonthName = shamsiMonthNames[jm - 1];


    const dayOfWeekIndex = date.getDay();
    const shamsiDayName = shamsiDayNames[dayOfWeekIndex];

    // Separate Year, Month, and Day
    const shamsiYear = jy;
    const shamsiMonth = jm.toString().padStart(2, '0'); // Ensure two digits for month
    const shamsiDay = jd.toString().padStart(2, '0');   // Ensure two digits for day

    if (name)
        return (
            <span className="date">{shamsiDay+" "+shamsiMonthName+" "+shamsiYear}</span>
        );
    else if (article)
        return (
          shamsiDay+" "+shamsiMonthName
        );
    else if (single)
        return (
            shamsiDay+" "+shamsiMonthName+" "+shamsiYear
        );
    else if (comment)
        return (
            getRelativeTime()
        );
    else if(leaderboard)
        return (
            shamsiMonthName+" "+shamsiYear
        );
    else if(archive)
        return (
           <>
               <div className="archive-date">
                   <span className="day-name">
                       {shamsiDayName}
                   </span>
                   <span className="rest-date">
                        {+shamsiDay+1 + " " + shamsiMonthName + " " + shamsiYear}
                   </span>
               </div>

           </>
        );
    else if (slider)
        return (
            <>
                <div className="day">
                    {shamsiDay}
                </div>
                <div className="month">
                    {shamsiMonthName}
                </div>
                <div className="month">
                    ماه
                </div>
            </>
        )
        else return (
            <div>
                <span className="number">{shamsiYear}</span>
                <span className="slash">/</span>
                <span className="number">{shamsiMonth}</span>
                <span className="slash">/</span>
                <span className="number">{shamsiDay}</span>
            </div>
        );
};

export default ConvertToShamsiDate;
