import React from "react";
import classNames from 'classnames';

export const PrevMonthNav = props => {
    const classes = classNames({
        [props.className]: true,
        disabled: props.isPrevMonthDisabled,
    });

    const onMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(props.prevMonth) props.prevMonth();
    };

    return (
        <div className={classes} onMouseDown={onMouseDown}/>
    )
};

export const NextMonthNav = props => {
    const classes = classNames({
        [props.className]: true,
        disabled: props.isNextMonthDisabled,
    });

    const onMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(props.nextMonth) props.nextMonth();
    };

    return (
        <div className={classes} onMouseDown={onMouseDown}/>
    )
};
