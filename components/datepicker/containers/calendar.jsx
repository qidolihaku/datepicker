/*
import PageArrow from '../components/navbar.jsx';
*/

import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import _ from 'lodash';

import {DAY_IN_MONTH} from './calendar_matrix';


import Month from '../components/month.jsx';
import {PrevMonthNav, NextMonthNav} from "../components/navbar";

export class Calendar extends Component
{
    static propTypes = {
        monthsTable: PropTypes.array,
        datesTable: PropTypes.array,
        isVisible: PropTypes.bool,
        selection: PropTypes.array,
        getChevronPosition: PropTypes.func,
    };


    constructor(props) {
        super(props)
    }

    render() {
        let datesInMonth = _.chunk(this.props.datesTable, DAY_IN_MONTH);
        const months = _.zipWith(this.props.monthsTable, datesInMonth, (month, dates) => {
            return <Month key={month} theMonth={month} datesInMonth={dates} {...this.props}/>
        });

        let styling;

        if(this.props.isVisible)
            styling = "calendar show";
        else
            styling = "calendar";

        return (
            <div className={styling}>
                {this.props.children}
                <div className="navigation">
                    <PrevMonthNav className="prev_month_nav" isPrevMonthDisabled={false} prevMonth={this.props.prevMonth}/>
                    <NextMonthNav className="next_month_nav" isNextMonthDisabled={false} nextMonth={this.props.nextMonth}/>
                </div>
                { months }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        datesTable: state.calendarTables.dates,
        monthsTable: state.calendarTables.months,
        isVisible: state.isVisible,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSelect: (date) => {
            dispatch(actions.rangeSelect(date))
        },
        nextMonth: () => {
            dispatch({type: actions.NEXT_MONTH})
        },
        prevMonth: ()=>{
            dispatch({type: actions.PREV_MONTH})
        }
    }
}

const ConnectedCalendar = connect(mapStateToProps, mapDispatchToProps)(Calendar);




export default ConnectedCalendar;
