import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
  }

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
                />
              </div>
              <div className="login-input">
                <label>PassWord:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Điền password của bạn"
                />
              </div>
              <div className="col-12">
                <button className="btn-login">LogIn</button>
              </div>
              <div className="col-12">
                <span className="forgot-password">
                  <a href="/">forgot your password?</a>
                </span>
              </div>
              <div className="col-12 text-center mt-5">
                <span className="text-orthe-login">Or Login With:</span>
              </div>
              <div className="col-12 social-login">
                <i class="fab fa-google-plus google"></i>
                <i class="fab fa-facebook facebook"></i>
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
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
