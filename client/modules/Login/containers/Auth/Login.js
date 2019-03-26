import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../../../redux/modules/auth';

class Login extends Component {


    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'login'
        });
    }

    render() {
        const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
        const { handleChange } = this;

        return (
            <AuthContent title="Log in">
                <InputWithLabel 
                    label="Email address" 
                    name="email" 
                    placeholder="Email address" 
                    value={email} 
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
                <AuthButton>Log in</AuthButton>
                <RightAlignedLink to="/auth/register">Sign up</RightAlignedLink>
            </AuthContent>
        );
    }
}



export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(Login);