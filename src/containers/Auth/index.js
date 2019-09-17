import React from 'react';

// import ForgotPassword from 'components/Auth/forgotPassword';
import Login from 'components/Auth/login';
// import Register from 'components/Auth/register';

class AuthPage extends React.PureComponent {
  state = {
    showForgotPassword: false,
    showRegister: false,
  };

  showLogin = () => {
    this.setState({
      showRegister: false,
      showForgotPassword: false,
    });
  };

  showRegister = () => {
    this.setState({
      showRegister: true,
      showForgotPassword: false,
    });
  };

  showForgotPassword = () => {
    this.setState({
      showRegister: false,
      showForgotPassword: true,
    });
  };

  render() {
    const {
      showRegister,
      showForgotPassword /* login, errorMessage, forgotPassword */,
    } = this.state;

    return (
      <div>
        {showRegister ? (
          <div>
            {/* <Register
              fullName={this.state.register.fullName}
              onFullNameChange={this.registerFullNameChanged}
              email={this.state.register.email}
              onEmailChange={this.registerEmailChanged}
              password={this.state.register.password}
              onPasswordChange={this.registerPasswordChanged}
              confirmPassword={this.state.register.confirmPassword}
              onConfirmPasswordChange={this.registerConfirmPasswordChanged}
              onRegister={this.registerUser}
              onGoBack={this.showLogin}
            /> */}
          </div>
        ) : (
          <div>
            {showForgotPassword ? (
              {
                /* <ForgotPassword
                email={forgotPassword.email}
                onEmailChange={this.forgotPasswordEmailChanged}
                onGoBack={this.showLogin}
              /> */
              }
            ) : (
              <Login />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AuthPage;
