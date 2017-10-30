/**
 * @Author Steve Zhao <steve.zhao@travelctm.com>
 * @Created: 2017/10/21
 * Each rules is a Redux Reducer like function.
 * Instead of using switch case for invoke individual rules,
 * the applyRules function will call each function successively;
 * and use the result as the parameter for next one.
 * In the end, the state is traversed by each rules.
 **/


import addMonths from 'date-fns/add_months';
import isWithinRange from "date-fns/is_within_range";
import isSameDay from "date-fns/is_same_day";
import isBefore from "date-fns/is_before";
import isAfter from "date-fns/is_after";
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import max from 'date-fns/max';
import min from 'date-fns/min';
import update from "immutability-helper";
import { rangeSelect } from "../actions";
import CalendarReducer from "./calendar_reducer";
import * as Actions from '../actions';

export const DayStatus = {
    DISALLOWED: "disallowed",
    DISABLED: "disabled",
    EMPTY: "empty",
    HIGHLIGHT: "highlight",
    SELECTED: "selected",
    RANGE_START: "from",
    RANGE_END: "to",
    IN_RANGE: "in_range",
    FOCUSED: "focused",
    TODAY: "today",
};

/**
 * Rules Object contains all calendar rules' handling functions.
 * The order or rules should not matters, but each rules must has unique name (the object key).
 * Each rule must return the state object, and only change the part it needs.
 * @type Object
 */

export const Rules = {
    singleSelection: [
        (state) => {

        }
    ],
    rangeSelection: [
        (state) => {
            //exclusiveDays
            if (state.config.exclusiveDays.length === 0) return state;
            //TODO: handle exclusiveDays
        },
        (state) => {
            //disabled all days before selection[0] when inputIndex is > 1
            if (state.inputIndex === 0) return state; //does not apply restriction on first input

            const from = state.selection[ 0 ];
            const min = state.config.minSelectRange;
            const max = state.config.maxSelectRange;

            state.calendarTables.dates.forEach((day, idx, datesTable) => {
                if (day.status[ DayStatus.DISABLED ]) return;
                if (isBefore(day.date, from)
                    || isBefore(day.date, addDays(from, min))
                    || isAfter(day.date, addDays(from, max))
                ) {
                    datesTable[ idx ] = update(day, {
                        status: {
                            [DayStatus.DISALLOWED]: {$set: true},
                            [DayStatus.DISABLED]: {$set: true}
                        }
                    });
                }
            });
            return state;

        }
    ],

    preProcessor: (state) => {
        let startDate = addDays(state.config.calendarStartDate, state.config.advancedDays );
        let endDate = addDays(state.config.calendarEndDate, 1);

        let days = state.calendarTables.dates.map((day) => {
            let dayObj = {...day, status: {day: true}};

            if(isSameDay(dayObj.date, new Date())) {
                dayObj.status[DayStatus.TODAY] = true;
            }

            switch (true) {
                case dayObj.date === null:
                    dayObj.status[ DayStatus.EMPTY ] = true;
                    break;
                case isSameDay(dayObj.date, state.focusedDate):
                    dayObj.status[DayStatus.FOCUSED] = true;
                    break;
                case isSameDay(dayObj.date, state.selection[ 0 ]):
                    dayObj.status[ DayStatus.RANGE_START ] = true;
                    break;
                case isSameDay(dayObj.date, state.selection[ 1 ]):
                    dayObj.status[ DayStatus.RANGE_END ] = true;
                    break;
                case !isWithinRange(dayObj.date, startDate, endDate):
                    dayObj.status[ DayStatus.DISABLED ] = true;
                    break;
                default:
                    if (state.selection[ 0 ] && state.selection[ 1 ] &&
                        isWithinRange(dayObj.date, state.selection[ 0 ], state.selection[ 1 ])) {
                        dayObj.status[ DayStatus.HIGHLIGHT ] = true;
                    }
                    break;
            }

            return dayObj;
        });

        state.calendarTables.dates = days;

        return state;
    }
};


export function applyRules(state) {
    let processor = state.config.isRangeSelect ? Rules.rangeSelection : Rules.singleSelection;
    let newState = Object.assign({}, state);

    newState = Rules.preProcessor(newState);
    processor.forEach((proc) => {
        newState = proc(state) || newState;
    });

    return newState;
}

export default Rules;
