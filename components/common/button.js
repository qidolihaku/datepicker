import React from 'react';

const CTAButton = ({ buttonClass, type, label}) => {
    return(
        <button className={ buttonClass } type={ type }>
            { label }
        </button>
    )
};

export default CTAButton;