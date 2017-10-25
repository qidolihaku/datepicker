import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import configStore from './store/configure_store';
import addDays from 'date-fns/add_days';
import RootContainer from './containers/root';
import update from 'immutability-helper';

const calendarInitState = {
    isVisible: false,
    config: {},
    selection: [],
    inputIndex: 0,
    currentMonth: new Date(),
    startDate: new Date(),
    endDate: null,
    calendarTables: {
    }
};


class DatePicker extends React.Component {
    static propTypes = {
        exclusiveDays: PropTypes.array,
        inclusiveDays: PropTypes.array,
        maxSelectRange: PropTypes.number,
        minSelectRange: PropTypes.number,  //defaultReturnDays
        advancedDays: PropTypes.number,

        isRangeSelect: PropTypes.bool, //for range selection only
        allowMultiSelect:PropTypes.bool,
        weekStartsOn: PropTypes.oneOf([0,1,2,3,4,5,6]),
        showOtherMonth: PropTypes.bool,
        calendarPages: PropTypes.number,
        calendarStartDate: PropTypes.instanceOf(Date),
        calendarEndDate: PropTypes.instanceOf(Date),
        relocateCalendar: PropTypes.bool,
        dateDisplayFormat: PropTypes.string,
        dateValueFormat: PropTypes.string,
        monthFormat: PropTypes.string,
    };

    static defaultProps = {
        isVisible: false,
        //array of Dates or Days(1 .. 7)
        //means those dates you can not select (in your selection)
        exclusiveDays: [],
        //array of Dates or Days(1 .. 7), you can not have both of them at same time
        //means those dates must in your selection
        inclusiveDays: [],
        maxSelectRange: 35,
        minSelectRange: 0,  //defaultReturnDays
        advancedDays: 0,

        isRangeSelect: true, //for range selection only
        allowMultiSelect: false,
        weekStartsOn: 0, //0 : Sunday, 1: Monday
        showOtherMonth: false,
        calendarPages: 2,
        calendarStartDate: new Date(),
        calendarEndDate: addDays(new Date(), 365),
        relocateCalendar: true,
        monthFormat: 'MMMM YYYY',
    };




    constructor(props) {
        super(props);
        calendarInitState.config = {...props};

        const startDate = addDays(new Date(), props.advancedDays);
        const endDate = addDays(startDate, props.maxSelectRange);

        const state = {...calendarInitState, startDate, endDate, focusDate : startDate};

        this.store = configStore(state);
    }

    render() {
       return (
           <Provider store={this.store}>
               <RootContainer children={this.props.children}/>
           </Provider>
       )
    }
}

export  default DatePicker;