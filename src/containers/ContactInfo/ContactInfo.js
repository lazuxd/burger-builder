import React from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './ContactInfo.module.css';
import Input from '../../components/UI/Input/Input';

class ContactInfo extends React.Component {
    state = {
        orderForm: {
            name: {
                config: {
                    inputType: 'input',
                    type: 'text',
                    placeholder: 'Name'
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    regex: /[a-zA-Z ]+/g
                },
                valid: false,
                changed: false,
                value: ''
            },
            email: {
                config: {
                    inputType: 'input',
                    type: 'email',
                    placeholder: 'Email'
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    regex: /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+/
                },
                valid: false,
                changed: false,
                value: ''
            },
            phone: {
                config: {
                    inputType: 'input',
                    type: 'text',
                    placeholder: 'Phone'
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    regex: /[0-9 -+]+/
                },
                valid: false,
                changed: false,
                value: ''
            },
            address: {
                config: {
                    inputType: 'input',
                    type: 'text',
                    placeholder: 'Address'
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                },
                valid: false,
                changed: false,
                value: ''
            },
            deliveryMethod: {
                config: {
                    inputType: 'select',
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {
                },
                valid: true,
                changed: false,
                value: 'fastest'
            }
        }
    }
    checkValidity = (inputStr, conditions) => {
        let valid = true;
        if (conditions.required) {
            valid &= inputStr.trim() !== '';
        }
        if (conditions.minLength) {
            valid &= inputStr.length >= conditions.minLength;
        }
        if (conditions.maxLength) {
            valid &= inputStr.length <= conditions.maxLength;
        }
        if (conditions.regex) {
            valid &= conditions.regex.test(inputStr);
        }

        return valid;
    }
    inputChangeHandler = (event, inputElement) => {
        const val = event.target.value;
        this.setState(prevState => {
            const orderForm = {...prevState.orderForm};
            orderForm[inputElement].value = val;
            orderForm[inputElement].changed = true;
            orderForm[inputElement].valid = this.checkValidity(val, orderForm[inputElement].validation);
            return {orderForm};
        });
    }
    render() {
        return (
            <div className={classes.ContactInfo}>
                <h2>Enter your contact data:</h2>
                {
                    Object.entries(this.state.orderForm).map(entrie => {
                        return (
                            <Input
                                key={entrie[0]}
                                inputType={entrie[1].config.inputType}
                                type={entrie[1].config.type}
                                placeholder={entrie[1].config.placeholder}
                                options={entrie[1].config.options}
                                value={entrie[1].value}
                                valid={!entrie[1].changed || entrie[1].valid}
                                onChange={event => this.inputChangeHandler(event, entrie[0])}
                            />
                        );
                    })
                }
                <Button
                    type="Success"
                    onClick={this.props.order.bind(null, Object.entries(this.state.orderForm).reduce((res, val) => {
                        res[val[0]] = val[1].value;
                        return res;
                    }, {}))}
                    disabled={!Object.values(this.state.orderForm).reduce((validAll, {valid}) => (validAll & valid), true)}
                >
                    ORDER
                </Button>
            </div>
        );
    }
}

export default ContactInfo;