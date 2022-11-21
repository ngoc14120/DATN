import { divide } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Slider from "./Section/Slider";
import Clinic from "./Section/Clinic";
// import Handbook from "./Section/handbook";
import OutstandingDentist from "./Section/OutstandingDentist";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import Handbook from "./Section/handbook";

import * as actions from "../../store/actions";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: true,
      });
    }, 3000);
  }
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        {this.state.isLoading === true ? (
          <>
            <HomeHeader />
            <Slider />
            <Specialty settings={settings} />
            <Clinic settings={settings} />
            <OutstandingDentist settings={settings} />
            <Handbook settings={settings} />
            <About />
            <HomeFooter />
          </>
        ) : (
          <div className="loading-container">
            <div className="is-loading">
              <div className="loading"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceAllLimit: () => dispatch(actions.fetchServiceAllLimit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
