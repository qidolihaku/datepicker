import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";
import format from "date-fns/format";
import isBefore from "date-fns/is_before";
import isAfter from "date-fns/is_after";
import lastDayOfMonth from "date-fns/last_day_of_month";
import startOfMonth from "date-fns/start_of_month";
import isSameDay from "date-fns/is_same_day";
import isWithinRange from "date-fns/is_within_range";

import _ from "lodash";
import update from "immutability-helper";
import { applyRules, DayStatus } from "./rules";

import * as ActionType from "../actions";
import dateTableGenerator from "../containers/calendar_matrix";
import { ARROW_KEYS } from "../actions";
import { UPDATE_STYLING } from "../actions";
import { UPDATE_CALENDAR } from "../actions";
import { PREV_MONTH } from "../actions";


const CalendarReducer = (state, action) => {
    const {
        calendarStartDate,
        calendarEndDate
    } = state.config;

    const {
        currentMonth,
        startDate,
        endDate
    } = state;

    switch (action.type) {
        case ActionType.SET_SELECTION:
            return update(state, {
                selection: {
                    $set: action.selection
                }
            });
            break;

        case ActionType.UPDATE_CALENDAR:
            return generateCalendar(state);
            break;

        case ActionType.PREV_MONTH:
            if (isAfter(startOfMonth(currentMonth), calendarStartDate)) {
                return CalendarReducer(
                    {...state, currentMonth: subMonths(state.currentMonth, 1)},
                    {type: UPDATE_CALENDAR}
                );
            } else {
                return state;
            }
            break;


        case ActionType.NEXT_MONTH:
            if (isWithinRange(addMonths(currentMonth, 1), calendarStartDate, subMonths(calendarEndDate, 1))) {
                return CalendarReducer(
                    {...state, currentMonth: addMonths(state.currentMonth, 1)},
                    {type: UPDATE_CALENDAR}
                );
            } else {
                return state;
            }
            break;

        case ActionType.CLOSE_CALENDAR:
            return update(state, {isVisible: {$set: false}});
            break;

        case ActionType.OPEN_CALENDAR:
            return CalendarReducer(
                {...state, isVisible: true, inputIndex: action.inputIndex},
                {type: UPDATE_CALENDAR}
            );
            break;

        case ActionType.RANGE_SELECT:
            return CalendarReducer(handleRangeSelection(state, action), {type: UPDATE_STYLING});
            break;

        case ActionType.UPDATE_STYLING:
            return applyRules(state);
            break;

        case ActionType.SWITCH_INPUT:
            return CalendarReducer(
                update(state, {inputIndex: {$set: action.index}}),
                {type: UPDATE_STYLING}
            );
            break;

        case ActionType.MOVE_CURSOR:
            return moveCursor(state, action);
            break;

        default:
            return state;
    }
};


function moveCursor(state, action) {
    /*
     let selectedDate = state.selection[state.inputIndex];
     let cursorIdx = state.cursor;
     let dates = state.calendarTables.dates;

     let nextIdx;
     if(cursorIdx) {  //with existing cursor
     nextIdx = cursorIdx + action.step;
     nextIdx = (nextIdx < 0 ? 0 : nextIdx) || (nextIdx >= dates.length ? dates)
     }


     return update(state, {
     cursor: {$set: cursorIdx},
     });
     */
}

function generateCalendar(state) {
    let currentMonth = state.currentMonth;
    let length = state.config.calendarPages;
    let monthsTable = [];


    let datesTable = dateTableGenerator(
        currentMonth,
        state.config.weekStartsOn,
        state.config.calendarPages,
        state.config.showOtherMonth
    );

    for (let i = 0; i < length; i++) {
        monthsTable.push(format(currentMonth, state.config.monthFormat));
        currentMonth = addMonths(currentMonth, 1);
    }

    let newState = update(state, {
        calendarTables: {
            $set: {
                dates: datesTable,
                months: monthsTable
            }
        }
    });

    return applyRules(newState);
}

function handleRangeSelection(state, action) {
    let selection = state.selection;
    let inputIndex = state.inputIndex;
    let isVisible = state.isVisible;
    if (inputIndex === 0) {
        selection[ 0 ] = action.date;
        inputIndex = 1;
    } else {
        selection[ 1 ] = action.date;
        inputIndex = 1;
        isVisible = false;
    }

    return {...state, selection: selection, inputIndex: inputIndex, isVisible: isVisible};
}

export default CalendarReducer;