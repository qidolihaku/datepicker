import React from "react";
import _classNames from 'classnames';
import {DayStatus} from "../reducers/rules";

export default class Day extends React.Component {
    static defaultProps = {
        date: null,
        status: [],
    };

    onClick = (e) => {
        e.stopPropagation();
        if (!this.props.date || this.props.status[DayStatus.DISABLED])
            return;

        this.props.onSelect(this.props.date);
    };

    render() {
        const classNames = _classNames(this.props.status);
        return (
            <td className={classNames} onClick={this.onClick}>{this.props.date && this.props.date.getDate()}</td>
        )
    }
}
