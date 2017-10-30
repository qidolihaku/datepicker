import React from 'react';

const RadioButton = (props) => {
    const { id, value, checked, name } = props;

    return (
        <label id={ props.labelId } htmlFor={ id }>
            <input
                type='radio'
                id={ id }
                value={ value }
                checked={ checked }
                name={ name }
                onChange={ (e) => { props.onChange(e) } } />

            <div className='radio-button'></div>
            { props.label }
        </label>
    )
};

export default RadioButton;
