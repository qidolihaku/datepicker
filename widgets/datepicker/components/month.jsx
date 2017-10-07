import React from "react";
import WeeksHeader from '../weeks_header.jsx';
import Day from './day.jsx';
import PropTypes from 'prop-types';
import _chunk from 'lodash/chunk';

export default class Month extends React.Component
{
    static propTypes = {
        theMonth: PropTypes.string,
        datesInMonth: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        let weeks = _chunk(this.props.datesInMonth, 7);
        weeks = weeks.map((week, j) => {
           let cp = week.map((day, i) => {
               return <Day key={`date-${day.idx}`} idx={day.idx}
                           date={day.date} status={day.status}
                           onSelect={this.props.onSelect}/>
           });
           return <tr className="week" key={`week-${j}`}>{cp}</tr>
        });


        return (
            <table border="1" className="month">
                <thead>
                    <tr>
                       <th colSpan="7" className="theMonth">
                           { this.props.theMonth }
                       </th>
                    </tr>
                    <WeeksHeader />
                </thead>
                <tbody>
                    {weeks}
                </tbody>
            </table>
        )
    }
}
