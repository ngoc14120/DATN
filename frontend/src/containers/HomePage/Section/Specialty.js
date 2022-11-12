import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrService: [],
    };
  }
  componentDidMount() {
    this.props.fetchServiceAllLimit();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listAllService !== this.props.listAllService) {
      this.setState({
        arrService: this.props.listAllService,
      });
    }
  }
  render() {
    let { arrService } = this.state;
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-specialty">
              Phòng khám nha khoa có những dịch vụ nào
            </span>
          </div>
          <div className="specialty-body row">
            {arrService &&
              arrService.length > 0 &&
              arrService.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div className="specialty-customize col-4 p-1">
                    <div className="outer-bg">
                      <div
                        className="bg-img specialty-image"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    listAllService: state.admin.listAllService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceAllLimit: () => dispatch(actions.fetchServiceAllLimit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
