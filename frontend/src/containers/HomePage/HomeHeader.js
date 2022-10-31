import { divide } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="group-logo-title">
                <div className="header-logo"></div>
                <span>BookingDentistry</span>
              </div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.clinic" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.chooseclinic" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.specialist" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.choosespecialist" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.service" />
                  </b>
                  <div className="sub-title">
                    <FormattedMessage id="homeheader.chooseservice" />
                  </div>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.choosedoctor" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="far fa-question-circle"></i>
                Hỗ Trợ
              </div>
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
            </div>
          </div>
        </div>
      </React.Fragment>
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
