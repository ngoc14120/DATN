import React, { Component } from "react";
import { connect } from "react-redux";
// import "./DentistSchedule.scss";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";
import moment from "moment";
import localization from "moment/locale/vi";

class DentistSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }

  componentDidMount() {
    // let { language } = this.props;
    this.setArrDays();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allScheduleDate !== this.props.allScheduleDate) {
      this.setState({
        allAvailableTime: this.props.allScheduleDate,
      });
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  setArrDays = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      object.label = this.capitalizeFirstLetter(labelVi);
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    this.setState({ allDays: allDays });
  };
  handleOnChangeSelect = (e) => {
    let { doctorIdFromParent } = this.props;
    if (doctorIdFromParent && doctorIdFromParent !== -1) {
      let doctorId = doctorIdFromParent;
      let date = e.target.value;
      this.props.fetchScheduleDentistByDate(doctorId, date);
    }
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    console.log(allAvailableTime);
    return (
      <div>
        <select onChange={(e) => this.handleOnChangeSelect(e)}>
          {allDays &&
            allDays.length > 0 &&
            allDays.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div>
          {allAvailableTime && allAvailableTime.length > 0
            ? allAvailableTime.map((item, index) => {
                return <button key={index}>{item.timeTypeData.valueVi}</button>;
              })
            : "khoong co lixh"}
        </div>
      </div>
      // <>
      //   {/* <HomeHeader /> */}
      //   <p>sdsdsdsdsds</p>
      // </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailDentist: state.admin.detailDentist,
    allScheduleDate: state.admin.allScheduleDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchScheduleDentistByDate: (doctorId, date) =>
      dispatch(actions.fetchScheduleDentistByDate(doctorId, date)),
    fetchDetailDentistInfo: (id) =>
      dispatch(actions.fetchDetailDentistInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DentistSchedule);
