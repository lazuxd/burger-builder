import React from 'react';
import classes from './Input.module.css';

const Input = props => {
    let input = null;
    let classArr = [classes.Input, props.valid ? null : classes.Invalid];

    const inputProps = Object.keys(props).reduce((obj, val) => {
        if (val === 'inputType')
            return obj;
        else if (props.inputType === 'select' && val === 'options')
            return obj;
        else if (val === 'valid') 
            return obj;
        else {
            obj[val] = props[val];
            return obj;
        }
    }, {});

    switch (props.inputType) {
        case 'input':
            input = <input className={classArr.join(' ')} {...inputProps}/>;
            break;
        case 'textarea':
            input = <textarea className={classArr.join(' ')} {...inputProps}/>;
            break;
        case 'select':
            input = (
                <select className={classArr.join(' ')} {...inputProps}>
                    {
                        props.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))
                    }
                </select>
            );
            break;
        default:
            input = <input />
    }

    return (
        <div className={classes.InputContainer}>
            <label></label>
            {input}
        </div>
    );
}

export default Input;