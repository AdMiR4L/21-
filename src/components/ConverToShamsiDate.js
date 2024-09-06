import React from 'react';
import jalaali from 'jalaali-js';

const ConvertToShamsiDate = ({ gregorianDate, name, article, slider, leaderboard }) => {
    // Extract year, month, and day from the Gregorian date
    const date = new Date(gregorianDate);
    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth() + 1; // getMonth() is zero-based, so add 1
    const gregorianDay = date.getDate();

    const shamsiMonthNames = [
        "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
    ];

    // Convert to Jalali (Shamsi) date
    const { jy, jm, jd } = jalaali.toJalaali(gregorianYear, gregorianMonth, gregorianDay);

    const shamsiMonthName = shamsiMonthNames[jm - 1];

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
    else if(leaderboard)
        return (
            shamsiMonthName+" "+shamsiYear
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
