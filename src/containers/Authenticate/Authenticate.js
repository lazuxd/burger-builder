import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import classes from './Authenticate.module.css';
import Input from '../../components/UI/Input/Input';

import * as actions from '../../redux/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Authenticate extends React.Component {
    state = {
        signup: true,
        authForm: {
            email: {
                config: {
                    inputType: 'input',
                    type: 'email',
                    placeholder: 'Email'
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                    regex: /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+/
                },
                valid: false,
                changed: false,
                value: ''
            },
            password: {
                config: {
                    inputType: 'input',
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    regex: /.*/
                },
                valid: false,
                changed: false,
                value: ''
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
            const authForm = {...prevState.authForm};
            authForm[inputElement].value = val;
            authForm[inputElement].changed = true;
            authForm[inputElement].valid = this.checkValidity(val, authForm[inputElement].validation);
            return {authForm};
        });
    }
    gotoCheckout = () => {
        this.props.history.replace('/checkout');
    }
    render() {
        if (this.props.isAuthenticate) {
            return <Redirect to="/" />;
        }
        if (this.props.wait) {
            return (
                <div style={{paddingTop: '56px'}}>
                    <Spinner />
                </div>
            );
        }
        return (
            <div className={classes.Authenticate}>
                <h2>{this.state.signup ? "Sign Up" : "Sign In"}:</h2>
                <p style={{color: 'red'}}>{this.props.error}</p>
                {
                    Object.entries(this.state.authForm).map(entrie => {
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
                    onClick={() => {
                        const email = this.state.authForm.email.value;
                        const password = this.state.authForm.password.value;
                        const gotoCheckout = this.props.isBuying ? this.gotoCheckout : null
                        if (this.state.signup) {
                            this.props.onSignup(email, password, gotoCheckout);
                        } else {
                            this.props.onSignin(email, password, gotoCheckout);
                        }
                    }}
                    disabled={!Object.values(this.state.authForm).reduce((validAll, {valid}) => (validAll & valid), true)}
                >
                    {this.state.signup ? "SIGNUP" : "SIGNIN"}
                </Button>
                <Button
                    type="Info"
                    onClick={() => {this.setState(prevState => ({signup: !prevState.signup}))}}
                >
                    {this.state.signup ? "Already have account?" : "Don't have account?"}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    wait: state.auth.wait,
    error: state.auth.error,
    isAuthenticate: state.auth.token !== null,
    isBuying: state.auth.isBuying
});

const mapDispatchToProps = dispatch => ({
    onSignup: (email, password, onSuccess) => dispatch(actions.signup(email, password, onSuccess)),
    onSignin: (email, password, onSuccess) => dispatch(actions.signin(email, password, onSuccess))
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Authenticate));