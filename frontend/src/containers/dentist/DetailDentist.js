import React, { Component } from "react";
import { connect } from "react-redux";
// import "./DetailDentist.scss";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";

class DetailDentist extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.fetchDetailDentistInfo(id);
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    console.log(this.props.detailDentist);
    return (
      <div>sâsasasas</div>
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
    // deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    fetchDetailDentistInfo: (id) =>
      dispatch(actions.fetchDetailDentistInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDentist);
