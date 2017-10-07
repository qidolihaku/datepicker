import React  from "react";
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class pageArrow extends React.Component
{
     static propTypes = {
         disabled: PropTypes.bool,
         step: PropTypes.oneOf(['next', 'previous']),
         onTrigger: PropTypes.func,
     }

    static defaultProps = {
        disabled: false,
    }

    render() {
        let clsNames = classNames({
            'calendar-arrow' : true,
            'previous' : this.props.step === 'previous',
            'next' : this.props.step === 'next',
            'disabled' : this.props.disabled,
        });

        return (
            <div className={clsNames} 
            onClick = {this.props.onTrigger} />
        )
    }
}
