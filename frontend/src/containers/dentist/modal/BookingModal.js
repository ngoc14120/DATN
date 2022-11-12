import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./BookingModal.scss";
import ProfileDentist from "../ProfileDentist";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    console.log(doctorId);
    return (
      <Modal
        isOpen={isOpenModal}
        className={"modals-user-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-center">
          <div className="booking-modal-header">
            <span className="left">thoong tin dat lich </span>
            <span className="right" onClick={closeBookingModal}>
              close
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="doctor-info">
              <ProfileDentist doctorId={doctorId} />
            </div>
            <div className="price">gias kham 5000</div>
            <div className="row">
              <div className="col-6 form-group">
                <label>hoj ten</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>sdt</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>email</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>daij chir lien hej</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>lys do kham</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>dat cho ai</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>gioiw tinh</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-confirm" onClick={closeBookingModal}>
              xac nhan
            </button>
            <button className="btn-booking-confirm" onClick={closeBookingModal}>
              cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
