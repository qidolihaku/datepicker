import React  from "react";

export const ChevronUP = (props) => {
    let styles = props.getStyling ? props.getStyling() : {};
    return (
        <div style={styles} className="chevron-up">
        </div>
    )
};

