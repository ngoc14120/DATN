import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
// import "./DetailDentist.scss";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";
import DentistSchedule from "./DentistSchedule";

class DetailDentist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.fetchDetailDentistInfo(id);
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if(prevProps)
  // }
  render() {
    console.log(this.props.detailDentist);
    let { detailDentist } = this.props;
    return (
      <div>
        <HomeHeader />
        <div>sdsdsdsds</div>
        <DentistSchedule
          doctorIdFromParent={
            detailDentist && detailDentist.id ? detailDentist.id : -1
          }
        />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchDetailDentistInfo: (id) =>
      dispatch(actions.fetchDetailDentistInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDentist);
