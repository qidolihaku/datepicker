import addMonths from "date-fns/add_months";
import subMonths from "date-fns/sub_months";
import format from "date-fns/format";
import isBefore from "date-fns/is_before";
import isAfter from "date-fns/is_after";
import lastDayOfMonth from "date-fns/last_day_of_month";
import startOfMonth from "date-fns/start_of_month";
import isSameDay from 'date-fns/is_same_day';

import _ from 'lodash';
import update from "immutability-helper";
import {applyRules, DayStatus} from "./rules";

import * as ActionType from "../actions";
import dateTableGenerator from "../containers/calendar_matrix";
import {ARROW_KEYS} from "../actions";


const Calendar = (state = {}, action) => {
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
            if (isAfter(startOfMonth(state.currentDate), state.config.calendarStartDate)) {
                return update(state, {
                    currentDate: {$set: subMonths(state.currentDate, 1)}
                });
            } else {
                return state;
            }

            break;

        case ActionType.NEXT_MONTH:
            const lastDateInCalendar = lastDayOfMonth(
                addMonths(state.currentDate, state.config.calendarPages - 1)
            );

            if (isBefore(lastDateInCalendar, startOfMonth(state.config.calendarEndDate))) {
                return update(state, {currentDate: {$set: addMonths(state.currentDate, 1)}});
            } else {
                return state;
            }
            break;


        case ActionType.CLOSE_CALENDAR:
            return update(state, {isVisible: {$set: false}});
            break;

        case ActionType.OPEN_CALENDAR:
            return update(state, {
                isVisible: {$set: true},
                inputIndex: {$set: action.inputIndex}
            });
            break;

        case ActionType.RANGE_SELECT:
            return handleRangeSelection(state, action);
            break;

        case ActionType.UPDATE_STYLING:
            return applyRules(state);
            break;

        case ActionType.SWITCH_INPUT:
            return update(state, {inputIndex: {$set: action.index}});
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
    let currentDate = state.currentDate;
    let length = state.config.calendarPages;
    let monthsTable = [];


    let datesTable = dateTableGenerator(
        currentDate,
        state.config.weekStartsOn,
        state.config.calendarPages,
        state.config.showOtherMonth
    );

    for (let i = 0; i < length; i++) {
        monthsTable.push(format(currentDate, state.config.monthFormat));
        currentDate = addMonths(currentDate, 1);
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
        selection[0] = action.date;
        inputIndex = 1;
    } else {
        selection[1] = action.date;
        isVisible = false;
    }

    return update(state, {
        selection: {$set: selection},
        inputIndex: {$set: inputIndex},
        isVisible: {$set: isVisible}
    })
}

export default Calendar;