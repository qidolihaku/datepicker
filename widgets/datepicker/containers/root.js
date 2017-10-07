import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import DateInput from '../../common/date_input';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty'


export class RootContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: props.selection,
            inputIndex: props.inputIndex,
        };

        this.handleKeyEvent = this.handleKeyEvent.bind(this);
    }


    onFocus(idx, event) {
        console.log('onFocus :', idx)
        if (!this.props.isVisible)
            this.props.openCalendar(idx);
        else
            this.props.switchInput(idx);
    };

    onBlur(idx, event) {
        console.log('onBlur : ', idx);
        console.log('relatedTarget = ', event.relatedTarget);
        if(event.relatedTarget && !ReactDOM.findDOMNode(this).contains(event.relatedTarget)) {
            this.props.closeCalendar();
        }

    }

    handleDateInputClick(idx, e) {
        console.log('onClick : ', idx)
        if(!this.props.isVisible) {
           this.props.openCalendar(idx)
        }
    }

    handleClick(e) {
        if (ReactDOM.findDOMNode(this).contains(e.target)) {
            return;
        } else {
            this.props.closeCalendar();
        }
    }


    handleKeyEvent(e) {
        switch (e.key) {
            case 'ArrowDown':
                this.props.moveCursor(7);
                break;
            case 'ArrowUp':
                this.props.moveCursor(-7);
                break;
            case 'ArrowLeft':
                this.props.moveCursor(-1);
                break;
            case 'ArrowRight':
                this.props.moveCursor(1);
                break;
        }
    }



    componentWillMount() {
        document.addEventListener('click', this.handleClick.bind(this), false);
    }

    componentDidMount() {
        const dateSelection = [];
        for (let ref in this.refs) {
            let date = this.refs[ref].props.value;
            if (date)
                dateSelection.push(date);
            else
                dateSelection.push(null);
        }

        this.props.setSelection(dateSelection);

    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick.bind(this), false);

    }

    componentWillReceiveProps(nextProps) {
        if (!_isEqual(this.props.selection, nextProps.selection) && !_isEmpty(nextProps.selection)) {
            this.setState({selection: nextProps.selection})
        }

        if (this.state.inputIndex !== nextProps.inputIndex) {
            const currentInput = this.refs[`input-${nextProps.inputIndex}`];
            if(!currentInput.isFocused()) {
                console.log('inputindex changed')
                currentInput.focus();
                this.setState({inputIndex: nextProps.inputIndex})
            }
        }

    }

    deepCloneChildren(children) {
        let idx = 0;
        return React.Children.map(children, child => {
            let childProps = {};
            if (React.isValidElement(child) && child.type === DateInput) {
                childProps = {
                    ref: `input-${idx}`,
                    value: this.state.selection[idx],
                    //focused: this.state.inputIndex === idx,
                    onFocus: this.onFocus.bind(this, idx),
                    onBlur: this.onBlur.bind(this, idx),
                    onClick: this.handleDateInputClick.bind(this, idx),
                    onKeyDown: this.handleKeyEvent,
                };
                idx++;
            }
            childProps.children = this.deepCloneChildren(child.props.children);
            return React.cloneElement(child, childProps);
        })
    }

    render() {
        let children = this.deepCloneChildren(this.props.children);
        return (
            <div>
                <div ref={div => {
                    this.inputContainer = div
                }} className="input-container">
                    {children}
                </div>
                <Calendar/>
            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
    let states = {
        isVisible: state.calendar.isVisible,
        selection: state.calendar.selection,
        inputIndex: state.calendar.inputIndex,
    };
    return states;
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setSelection: selection => {
            dispatch(Actions.setSelection(selection))
        },
        openCalendar: inputIdx => {
            dispatch(Actions.openCalendar(inputIdx))
        },
        closeCalendar: () => {
            dispatch(Actions.closeCalendar())
        },
        switchInput: direction => {
            dispatch(Actions.switchInput(direction))
        },
        moveCursor: step => {
            dispatch(Actions.moveCursor(step))
        },
    }
}

const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(RootContainer);
export default ConnectedRoot
