import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-specialty">
              Phòng khám nha khoa có những dịch vụ nào
            </span>
          </div>
          <div className="specialty-body row">
            <div className="specialty-customize col-3 p-1">
              <div className="bg-img specialty-image"></div>
            </div>
            <div className="specialty-customize col-3 p-1">
              <div className="bg-img specialty-image"></div>
            </div>
            <div className="specialty-customize col-3 p-1">
              <div className="bg-img specialty-image"></div>
            </div>
            <div className="specialty-customize col-3 p-1">
              <div className="bg-img specialty-image"></div>
            </div>
            <div className="specialty-customize col-3 p-1">
              <div className="bg-img specialty-image"></div>
            </div>
            <div className="specialty-customize col-3 p-1 ">
              <div className="bg-img specialty-image"></div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
