import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';


class Register extends Component {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });
    }

    render() {
        const { email, username, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange } = this;

        return (
            <AuthContent title="Sign up">
                <InputWithLabel 
                    label="Email address"
                    name="email"
                    placeholder="Email address" 
                    value={email} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="Username" 
                    name="username" 
                    placeholder="Username" 
                    value={username} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="Password" 
                    name="password" 
                    placeholder="Password"
                    type="password" 
                    value={password} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="Confirm Password" 
                    name="passwordConfirm" 
                    placeholder="Confirm Password" 
                    type="password" 
                    value={passwordConfirm}
                    onChange={handleChange}
                />
                <AuthButton>Sign up</AuthButton>
                <RightAlignedLink to="/auth/login">Log in</RightAlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(Register);