import React, { Component } from "react";
import { connect } from "react-redux";
// import "./OutstandingDoctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDentists: [],
    };
  }
  componentDidMount() {
    this.props.loadDentistNew();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dentistNewRedux !== this.props.dentistNewRedux) {
      this.setState({
        arrDentists: this.props.dentistNewRedux,
      });
    }
  }
  handleClickDetailDentist = (dentist) => {
    if (this.props.history)
      this.props.history.push(`detail-dentist/${dentist.id}`);
  };
  render() {
    let dentists = this.state.arrDentists;
    console.log(dentists);
    return (
      <div className="section-group section-outstandingdoctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác Sĩ Nổi Bật</span>
            <button className="btn-section">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dentists &&
                dentists.length > 0 &&
                dentists.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleClickDetailDentist(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-img section-outstandingdoctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>giáo sư ngọc</div>
                          <div>trồng răng</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    dentistNewRedux: state.admin.dentistNew,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDentistNew: () => dispatch(actions.fetchDentistNew()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
