import React, { Component } from "react";
import { connect } from "react-redux";
// import "./OutstandingDoctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends Component {
  render() {
    return (
      <div className="section-group section-outstandingdoctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác Sĩ Nổi Bật</span>
            <button className="btn-section">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstandingdoctor"></div>
                  </div>
                  <div className="position text-center">
                    <div>giáo sư ngọc</div>
                    <div>trồng răng</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstandingdoctor"></div>
                  </div>
                  <div className="position text-center">
                    <div>giáo sư ngọc</div>
                    <div>trồng răng</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstandingdoctor"></div>
                  </div>
                  <div className="position text-center">
                    <div>giáo sư ngọc</div>
                    <div>trồng răng</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstandingdoctor"></div>
                  </div>
                  <div className="position text-center">
                    <div>giáo sư ngọc</div>
                    <div>trồng răng</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstandingdoctor"></div>
                  </div>
                  <div className="position text-center">
                    <div>giáo sư ngọc</div>
                    <div>trồng răng</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstandingdoctor"></div>
                  </div>
                  <div className="position text-center">
                    <div>giáo sư ngọc</div>
                    <div>trồng răng</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
