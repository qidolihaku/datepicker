import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import classnames from 'classnames';

class DateInput extends React.Component {
    static propTypes = {
        dateDisplayFormat: PropTypes.string,
        dateValueFormat: PropTypes.string,
        value: PropTypes.instanceOf(Date),
        name: PropTypes.string,
        placeholder: PropTypes.string,
        label: PropTypes.string,
        onKeyDown:PropTypes.func,
        onFocus: PropTypes.func,
        onClick: PropTypes.func,
    };


    static defaultProps = {
        dateDisplayFormat: 'MM/DD/YYYY',
        dateValueFormat: 'YYYY-MM-DD',
        value: null,
        name: '',
        focused: false,
    };

    focus() {
       this.inputRef.focus();
    }

    isFocused() {
        return this.state.focused;
    }

    constructor(props) {
       super(props);
       this.state = {
           value: null,
       }

       this.onFocus = this.onFocus.bind(this);
       this.onBlur = this.onBlur.bind(this);
    }

    onBlur(e) {
        if(this.props.onBlur) {
           this.props.onBlur(e)
        }

        this.setState({focused: false})
    }

    onFocus(e) {
        if(this.props.onFocus) {
            this.props.onFocus(e);
        }
        this.setState({focused: true})
    }

    componentWillUpdate(prevProps) {
        if (this.state.value !== prevProps.value) {
            this.setState({value: prevProps.value})
        }
    }

    render() {
        let displayValue = '';
        let value = '';
        if(this.state.value) {
            value = format(this.state.value, this.props.dateValueFormat);
            displayValue = format(this.state.value, this.props.dateDisplayFormat);
        }

        let style = classnames({
            [this.props.className] : this.props.className || false,
            "date-input" : true,
            "focused" : this.props.focused
        });

        return (
            <div className={style}>
                <label className='sr-only'>{ this.props.label }</label>
                <input type="text" value={displayValue}
                       onClick={this.props.onClick}
                       ref={input => {this.inputRef = input}}
                       onKeyDown={this.props.onKeyDown}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       tabIndex={this.props.tabIndex || 0}
                       placeholder={this.props.placeholder}
                />

                <input  tabIndex={-1} name={this.props.name} type="hidden" value={value} />
            </div>
        )
    }
}

export default  DateInput;
