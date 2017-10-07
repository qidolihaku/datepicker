import getMonth from 'date-fns/get_month'
import addDays from 'date-fns/add_days'
import startOfWeek from 'date-fns/start_of_week'
import addMonths from 'date-fns/add_months'

export const DAY_IN_MONTH = 42; //6 rows x 7 columns

export default function (startDay,
                         weekStartsOn = 0,
                         length = 2,
                         showOtherMonth = false) {
    const matrix = (new Array(DAY_IN_MONTH * length)).fill(null);

    let date = startDay;
    date.setDate(1);

    let curDate = startOfWeek(date, {weekStartsOn});

    for (let j = 0; j < length; j++) {
        curDate = startOfWeek(date, {weekStartsOn});
        for (let i = 0; i < DAY_IN_MONTH; i++) {
            const index = DAY_IN_MONTH * j + i;
            if (getMonth(curDate) !== getMonth(date) && showOtherMonth === false) {
                matrix[index] = {date: null};
            } else {
                matrix[index] = {date: curDate};
            }
            matrix[index].idx = index;
            matrix[index].status = {day: true};
            curDate = addDays(curDate, 1);
        }
        date = addMonths(date, 1);
    }


    return matrix;
}