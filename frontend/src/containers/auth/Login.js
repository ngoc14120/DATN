import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";

import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangUserName = (e) => {
    this.setState({ userName: e.target.value });
  };
  handleOnChangPassWord = (e) => {
    this.setState({ passWord: e.target.value });
  };
  handleClickLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await handleLoginApi(this.state.userName, this.state.passWord);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({ errMessage: e.response.data.message });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({ isShowPassword: true });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 title-login">LogIn</div>
            <div className="col-12 form-group login-form">
              <div className="login-input">
                <label>UserName:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Điền email của bạn"
                  onChange={(e) => {
                    this.handleOnChangUserName(e);
                  }}
                />
              </div>
              <div className="login-input">
                <label>PassWord:</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Điền password của bạn"
                    onChange={(e) => {
                      this.handleOnChangPassWord(e);
                    }}
                  />
                  <span onClick={() => this.handleShowHidePassword()}>
                    <i
                      className={
                        this.state.isShowPassword
                          ? "fas fa-eye"
                          : "fas fa-eye-slash"
                      }
                    />
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => {
                    this.handleClickLogin();
                  }}
                >
                  LogIn
                </button>
              </div>
              <div className="col-12">
                <span className="forgot-password">
                  <a href="/">forgot your password?</a>
                </span>
              </div>
              <div className="col-12 text-center mt-5">
                <span className="text-other-login">Or Login With:</span>
              </div>
              <div className="col-12 social-login">
                <i className="fab fa-google-plus google"></i>
                <i className="fab fa-facebook facebook"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
