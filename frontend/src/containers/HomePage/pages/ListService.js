import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ListService.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";

import HomeHeader from "../HomeHeader";
import HomeFooter from "../HomeFooter";

class ListService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrService: [],
    };
  }
  componentDidMount() {
    this.props.fetchServiceAll();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allService !== this.props.allService) {
      this.setState({
        arrService: this.props.allService,
      });
    }
  }
  handleClickDetailService = (service) => {
    if (this.props.history)
      this.props.history.push(`detail-service/${service.id}`);
  };
  render() {
    let { arrService } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="list-service">
          <div>
            <img
              src="https://nhakhoaimplantdanang.com/wp-content/themes/dental/images/banner-services.jpg"
              alt=""
            />
          </div>
          <div className="service-container">
            <div className="service-header">
              <span className="title-service">DỊCH VỤ NHA KHOA</span>
            </div>
            <div className="service-body row">
              {arrService &&
                arrService.length > 0 &&
                arrService.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let description =
                    item && item.Markdown ? item.Markdown.description : "";
                  return (
                    <div className="service-customize col-4 p-1">
                      <div className="outer-bg">
                        <div
                          className="bg-img service-image"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        ></div>
                        <h3>{item.name}</h3>
                        <p>{description}</p>
                        <button
                          className="btn btn-danger px-3"
                          onClick={() => this.handleClickDetailService(item)}
                        >
                          Xem Chi Tiết
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allService: state.admin.allService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceAll: () => dispatch(actions.fetchServiceAll()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListService)
);
