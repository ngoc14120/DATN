import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, dentistMenu } from "./menuApp";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;

      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DENTIST) {
        menu = dentistMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="left-header">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />
            {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
          </span>
          <div className="language">
            <i className="fas fa-globe"></i>
            {language === LANGUAGES.VI ? (
              <select
                name="language"
                className="language-item"
                onClick={(e) => this.changeLanguage(e.target.value)}
              >
                <option value={LANGUAGES.VI}>VN</option>
                <option value={LANGUAGES.EN}>EN</option>
              </select>
            ) : (
              <select
                name="language"
                className="language-item"
                onClick={(e) => this.changeLanguage(e.target.value)}
              >
                <option value={LANGUAGES.EN}>EN</option>
                <option value={LANGUAGES.VI}>VN</option>
              </select>
            )}
          </div>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>

        {/* nút logout */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
