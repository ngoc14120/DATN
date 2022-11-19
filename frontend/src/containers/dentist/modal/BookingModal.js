import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import "./BookingModal.scss";
import ProfileDentist from "../ProfileDentist";
import _ from "lodash";
import * as actions from "../../../store/actions";
import "./BookingModal.scss";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      genderArr: [],

      fullName: "",
      email: "",
      gender: "",
      address: "",
      phoneNumber: "",
      doctorId: "",
      timeType: "",
    };
  }
  componentDidMount() {
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      let doctorId =
        this.props.dataTime && !_.isEmpty(this.props.dataTime)
          ? this.props.dataTime.doctorId
          : "";
      let timeType = this.props.dataTime.timeType;
      this.setState({
        doctorId: doctorId,
        timeType: timeType,
      });
    }
  }
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleBookingpatient = () => {
    // let isValid = this.checkValidateInput();
    // if (isValid === false) return;
    console.log(this.state);
    this.props.bookingPatient({
      email: this.state.email,
      fullName: this.state.fullName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
    });
    this.setState({
      fullName: "",
      email: "",
      gender: "",
      address: "",
      phoneNumber: "",
      doctorId: "",
      timeType: "",
    });
    this.props.closeBookingModal();
  };
  render() {
    let { isOpenModal, closeBookingModal, dataTime, language } = this.props;
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    console.log(doctorId);
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let { email, fullName, address, phoneNumber, gender } = this.state;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"modals-user-container"}
        size="sz"
        centered
        z-index="999"
      >
        <div className="booking-modal-center ">
          <div className="booking-modal-header">
            <span className="left">THÊM NGƯỜI DÙNG</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <ProfileDentist doctorId={doctorId} dataTime={dataTime} />
          <div className="booking-modal-body m-4 pr-5 pl-5">
            <div className="row center">
              <div className="col-12 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    this.onChangeInput(e, "email");
                  }}
                />
              </div>

              <div className="col-12 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => {
                    this.onChangeInput(e, "fullName");
                  }}
                />
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => {
                    this.onChangeInput(e, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "gender");
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-12 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => {
                    this.onChangeInput(e, "address");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className={
                this.state.action === CRUD_ACTION.CREATE
                  ? "btn btn-primary px-3 mx-3"
                  : "btn btn-warning px-3 mx-3"
              }
              onClick={() => this.handleBookingpatient()}
            >
              {this.state.action === CRUD_ACTION.CREATE
                ? "Thêm Mới"
                : "Cập Nhật"}
            </button>
            <button className="btn btn-danger px-3" onClick={closeBookingModal}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genderRedux: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    bookingPatient: (data) => dispatch(actions.bookingPatient(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
