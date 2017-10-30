import React from "react";
import _classNames from 'classnames';
import {DayStatus} from "../reducers/rules";

export default class Day extends React.Component {
    static defaultProps = {
        date: null,
        status: [],
    };

    //use onMouseDown to prevent trigger onBlur event.
    onMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.props.date || this.props.status[DayStatus.DISABLED])
            return;

        this.props.onSelect(this.props.date);
    };

    render() {
        const classNames = _classNames({...this.props.status, day: true});
        return (
            <td className={classNames} onMouseDown={this.onMouseDown}>{this.props.date && this.props.date.getDate()}</td>
        )
    }
}
