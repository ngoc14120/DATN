import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class ProfileDentist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  componentDidMount() {
    if (this.props.doctorId) {
      this.props.fetchDetailDentistInfo(this.props.doctorId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.detailDentist !== prevProps.detailDentist) {
      this.setState({
        dataProfile: this.props.detailDentist,
      });
    }
  }
  render() {
    console.log(this.state);
    return <div>ssd</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    detailDentist: state.admin.detailDentist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailDentistInfo: (id) =>
      dispatch(actions.fetchDetailDentistInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDentist);
