import React  from "react";

export default class Pointer extends React.Component
{
    constructor(props) {
        super(props);
        this.offset = props.offset || 0;
        let rect = props.currentInput.getBoundingClientRect();
        this.state = {
            //transform: null//`translateX(${rect.left + rect.width}px)`
        }
    }

    componentWillReceiveProps(nextProps) {
        let rect = nextProps.currentInput.getBoundingClientRect();
        let inputLeftPos  = rect.left;
        let width = rect.width;
        let selfLeftPos = this.refs.pointer
            .parentElement
            .getBoundingClientRect().left;

        let offset = this.offset <= 1 ? this.offset * width : this.offset;

        this.setState({
            //transform: `translateX(${parseInt(inputLeftPos  - selfLeftPos + offset)}px)`,
            left: parseInt(inputLeftPos  - selfLeftPos + offset),
        });
    }

    render() {

        let styles = {
            left: this.state.left,
            //transform: this.state.transform,
            //transition: this.state.transform && "transform .2s ease-in-out",
        };

        return (
            <div ref="pointer"
            style={styles} className="date-picker-pointer">
            </div>
        )
    }

}

