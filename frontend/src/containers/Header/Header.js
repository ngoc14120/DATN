import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, dentistMenu } from "./menuApp";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDentistLogin: false,
    };
  }
  componentDidMount() {
    let { userInfo } = this.props;
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.DENTIST) {
        this.setState({
          isDentistLogin: true,
        });
      }
    }
  }

  render() {
    const { processLogout, language, userInfo } = this.props;
    let { isDentistLogin } = this.state;
    return (
      <div className="header-container">
        <div class="sidebar">
          <div class="logo-details">
            <i class="bx bxl-c-plus-plus"></i>
            <span class="logo_name">ADMIN</span>
          </div>
          {isDentistLogin === true ? (
            <ul class="nav-links">
              <li>
                <NavLink to="/dentist/manage-schedule">
                  <i class="bx bx-box"></i>
                  <span class="links_name">
                    <FormattedMessage id={"Quản lý lịch khám"} />
                  </span>
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul class="nav-links">
              <li>
                <NavLink to="/system/user-redux">
                  <i class="bx bx-user"></i>
                  <span class="links_name">
                    <FormattedMessage id={"Quản Lý Người Dùng"} />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dentist/manage-schedule">
                  <i class="bx bx-box"></i>
                  <span class="links_name">
                    <FormattedMessage id={"Quản lý lịch khám"} />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/system/manage-doctor">
                  <i class="bx bx-list-ul"></i>
                  <span class="links_name">Quản Lý Nha Sĩ</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/service/manage-service">
                  <i class="bx bx-book-alt"></i>
                  <span class="links_name">Quản lý Dịch Vụ</span>
                </NavLink>
              </li>

              <li>
                <a href="#">
                  <i class="bx bx-message"></i>
                  <span class="links_name">Tin Nhắn</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bx bx-heart"></i>
                  <span class="links_name">Yêu Thích</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bx bx-cog"></i>
                  <span class="links_name">Setting</span>
                </a>
              </li>
              <li class="log_out" onClick={processLogout}>
                <a href="#">
                  <i class="bx bx-log-out"></i>
                  <span class="links_name">Log out</span>
                </a>
              </li>
            </ul>
          )}
        </div>
        <section className="home-section">
          <nav>
            <div class="sidebar-button">
              <i class="bx bx-menu sidebarBtn"></i>
              <span class="dashboard">Dashboard</span>
            </div>
            <div class="search-box">
              <input type="text" placeholder="Search..." />
              <i class="bx bx-search"></i>
            </div>
            <div class="profile-details">
              <img src="images/profile.jpg" alt="" />
              <span class="admin_name">
                {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
              </span>
              <i class="bx bx-chevron-down"></i>
            </div>
          </nav>
        </section>
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
