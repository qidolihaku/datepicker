export const RANGE_SELECT = "range-select";
export const CALENDAR_CONFIG = "calendar-config";
export const OPEN_CALENDAR = "open-calendar";
export const CLOSE_CALENDAR = "close-calendar";
export const UPDATE_CALENDAR = "update-calendar";
export const PREV_MONTH = "previous-month";
export const NEXT_MONTH = "next-month";
export const SET_SELECTION = "set-selection";
export const UPDATE_STYLING = "update-styling";
export const SWITCH_INPUT = 'switch-input';
export const MOVE_CURSOR = 'move-cursor';

export const updateCalendar = () => dispatch => {
    dispatch({type: UPDATE_CALENDAR});
    dispatch({type: UPDATE_STYLING});
};

export const setSelection = selection => ({
    type: SET_SELECTION,
    selection: selection
});


export const rangeSelect = (date) => (dispatch, getStore) => {
    dispatch({
        type: RANGE_SELECT,
        date: date,
    });

    dispatch({type: UPDATE_STYLING});
};

export const openCalendar = (inputIndex) => dispatch => {
    dispatch({
        type: OPEN_CALENDAR,
        inputIndex: inputIndex
    });

    dispatch(updateCalendar());
};

export const closeCalendar = () => ({
    type: CLOSE_CALENDAR
});


export const TAB_DIRECTION ={
    up: -1,
    down:1,
};


export const switchInput = (idx) => dispatch => {
    dispatch({
        type: SWITCH_INPUT,
        index: idx
    });

    dispatch({type: UPDATE_STYLING});
};

export const ARROW_KEYS = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
};

export const moveCursor = (direction) => dispatch => {
    dispatch({
        type: MOVE_CURSOR,
        step: direction
    });

    dispatch({type: UPDATE_STYLING});
};


