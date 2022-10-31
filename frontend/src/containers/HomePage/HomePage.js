import { divide } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Slider from "./Section/Slider";
import Clinic from "./Section/Clinic";
// import Handbook from "./Section/handbook";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import Handbook from "./Section/handbook";

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader />
        <Slider />
        <Specialty settings={settings} />
        <Clinic settings={settings} />
        <OutstandingDoctor settings={settings} />
        <Handbook settings={settings} />
        <About />
        <HomeFooter />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
