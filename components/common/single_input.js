import React from 'react';

export const SingleInput = (props) => {
    const { name, value, onChange, placeholder, label, id } = props;

    return (
        <div className='single-input' id={ id }>
            <label className='sr-only'>{ label }</label>
            <input
                id={ name }
                name={ name }
                type='text'
                value={ value }
                onChange={ onChange }
                placeholder={ placeholder } />
        </div>
    )
};

/*TEMP: To be replaced with React Autocomplete*/
export const AutoComplete = (props) => {
    const ariaHidden = props.hidden ? 'aria-hidden' : '';

    const { label, name, value, placeholder } = props;

    return (
        <div className='auto-complete'>
            <label className='sr-only' aria-hidden htmlFor={ name }>
                { label }
            </label>
            <input id={ name } type='text' name={ name }
                value={ value }
                aria-owns=''
                placeholder={ placeholder }
                aria-expanded='false'
                aria-autocomplete='both'
                aria-activedescendant=''
                onChange={ props.onChange }/>
        </div>
    )
};
