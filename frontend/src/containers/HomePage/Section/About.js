import React, { Component } from "react";
import { connect } from "react-redux";
// import "./About.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {
  render() {
    return (
      <div className="section-group section-about">
        <div className="section-container">
          <div className="section-about-header">
            Truyền thông nói gì về Booking
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/uWl6vpCbr-Q?list=RDfK-rkbOEIpA"
                title="Bên Anh Đêm Nay REMIX- BINZ, JC HƯNG"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <ul>
                <li>
                  <img
                    src="https://nhakhoadongnam.com/wp-content/uploads/2015/08/enexpress-dua-tin-nha-khoa-dong-nam.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://nhakhoadongnam.com/wp-content/uploads/2015/08/tuoi-tre-dua-tin-nha-khoa-dong-nam.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://nhakhoadongnam.com/wp-content/uploads/2018/08/zing.vn-dua-tin-nha-khoa-dong-nam.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://nhakhoadongnam.com/wp-content/uploads/2020/06/logo-bao-suc-khoe-doi-song.jpg"
                    alt=""
                  />
                </li>
              </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
