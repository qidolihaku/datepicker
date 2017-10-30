import addDays from "date-fns/add_days";
import addMonths from "date-fns/add_months";
import endOfMonth from "date-fns/end_of_month";
import format from "date-fns/format";
import isAfter from "date-fns/is_after";
import isWithinRange from "date-fns/is_within_range";
import max from "date-fns/max";
import min from "date-fns/min";
import startOfMonth from "date-fns/start_of_month";
import subMonths from "date-fns/sub_months";
import update from "immutability-helper";

import * as ActionType from "../actions";
import { UPDATE_CALENDAR, UPDATE_STYLING } from "../actions";
import dateTableGenerator from "../containers/calendar_matrix";

import * as Rules from '../rules_strategy';

const CalendarReducer = (state, action) => {
    const {
        calendarStartDate,
        calendarEndDate
    } = state.config;

    const {
        currentMonth,
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
            return dateRules(state);
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
    const {calendarStartDate, calendarEndDate} = state.config;
    const steps = action.steps;

    let attemptFocus = addDays(state.focusedDate, steps);
    attemptFocus = steps > 0
        ? min(calendarEndDate, attemptFocus)
        : max(calendarStartDate, attemptFocus);

    //handle the focus cursor not in current calendar
    const [ visibleFirstDate, visibleLastDate ] = [
        startOfMonth(state.currentMonth),
        endOfMonth(addMonths(state.currentMonth, state.config.calendarPages - 1))
    ];

    if (isWithinRange(attemptFocus, visibleFirstDate, visibleLastDate)) {
        return CalendarReducer(
            {...state, focusedDate: attemptFocus},
            {type: ActionType.UPDATE_STYLING}
        );
    } else {
        if (isWithinRange(attemptFocus, calendarStartDate, calendarEndDate)) {
            let newCurrentMonth = addMonths(state.currentMonth, steps > 0 ? 1 : -1);

            return CalendarReducer(
                {...state, focusedDate: attemptFocus, currentMonth: newCurrentMonth},
                {type: ActionType.UPDATE_CALENDAR}
            );
        } else {
            return state;
        }
    }


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

    return dateRules(newState);
}

function handleRangeSelection(state, action) {
    let selection = state.selection;
    let inputIndex = state.inputIndex;
    let isVisible = state.isVisible;
    if (inputIndex === 0) {
        selection = [ action.date, null ];
        inputIndex = 1;
    } else {
        selection[ 1 ] = action.date;
        inputIndex = 1;
        isVisible = false;
    }

    return {...state, selection: selection, inputIndex: inputIndex, isVisible: isVisible};
}


function dateRules(state) {
    const strategy = new Rules.Strategy(state);
    strategy.addRule(Rules.RuleEmpty)
        .addRule(Rules.RuleAvailableRange)
        .addRule(Rules.RuleFocus)
        .addRule(Rules.RuleMinSelection)
        .addRule(Rules.RuleMaxSelection)
        .addRule(Rules.RuleSelection)

    return update(state, {
        calendarTables: {
            dates: {$set: strategy.execute()}
        }
    })
}


export default CalendarReducer;