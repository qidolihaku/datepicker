/*
import PageArrow from '../components/navbar.jsx';
*/

import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import _zipWith from 'lodash/zipWith';
import _chunk from 'lodash/chunk';

import {DAY_IN_MONTH} from './calendar_matrix';


import Month from '../components/month.jsx';

export class Calendar extends Component
{
    static propTypes = {
        monthsTable: PropTypes.array,
        datesTable: PropTypes.array,
        isVisible: PropTypes.bool,
        selection: PropTypes.array,
    };


    isMobile() {
        return /Android|IPhone|IPod|BlackBerry|arm/i.test(window.navigator.platform.test)
            || window.innerWidth < 768;
    }

    constructor(props) {
        super(props)
    }


    render() {
        let datesInMonth = _chunk(this.props.datesTable, DAY_IN_MONTH);
        const months = _zipWith(this.props.monthsTable, datesInMonth, (month, dates) => {
            return <Month key={month} theMonth={month} datesInMonth={dates} {...this.props}/>
        });

        let styling;

        if(this.props.isVisible)
            styling = "universal-datepicker calendar show";
        else
            styling = "universal-datepicker calendar";

        return (
            <div className={styling}>
                { months }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        datesTable: state.calendar.calendarTables.dates,
        monthsTable: state.calendar.calendarTables.months,
        isVisible: state.calendar.isVisible,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSelect: (date) => {
            dispatch(actions.rangeSelect(date))
        }
    }
}

const ConnectedCalendar = connect(mapStateToProps, mapDispatchToProps)(Calendar);




export default ConnectedCalendar;
