import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
// import "./DentistExtraInfo.scss";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";
import DentistSchedule from "./DentistSchedule";

class DentistExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraInfo: [],
    };
  }

  componentDidMount() {
    // let id = this.props.match.params.id;
    // this.setState({
    //   currentDentistId: id,
    // });
    // this.props.fetchDetailDentistInfo(id);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      this.props.fetchExtraInfoDentistById(this.props.doctorIdFromParent);
      this.setState({
        extraInfo: this.props.extraInfoDentist
          ? this.props.extraInfoDentist
          : [],
      });
    }
  }
  render() {
    return (
      <div>helooooo</div>

      // <>
      //   {/* <HomeHeader /> */}
      //   <p>sdsdsdsdsds</p>
      // </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    extraInfoDentist: state.admin.extraInfoDentist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchExtraInfoDentistById: (id) =>
      dispatch(actions.fetchExtraInfoDentistById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DentistExtraInfo);
