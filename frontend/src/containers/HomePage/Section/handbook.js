import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HandBook.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    return (
      <div className="section-group section-clinic">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm Nang</span>
            <button className="btn-section">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-img section-specialty"></div>
                <div>nhoor rang</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-specialty"></div>
                <div>nhoor rang</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-specialty"></div>
                <div>nhoor rang</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-specialty"></div>
                <div>nhoor rang</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-specialty"></div>
                <div>nhoor rang</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-specialty"></div>
                <div>nhoor rang</div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
