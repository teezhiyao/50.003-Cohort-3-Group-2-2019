import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';


class Register extends Component {



    render() {

        return (
            <AuthContent title="Sign up">
            <InputWithLabel label="Email address" name="email" placeholder="Email address"/>
            <InputWithLabel label="Username" name="username" placeholder="Username"/>
            <InputWithLabel label="Password" name="password" placeholder="Password" type="password"/>
            <InputWithLabel label="Confirm Password" name="passwordConfirm" placeholder="Confirm Password" type="password"/>
            <AuthButton>Sign up</AuthButton>
            <RightAlignedLink to="/auth/login">Log in</RightAlignedLink>
            </AuthContent>
        );
    }
}



export default Register;