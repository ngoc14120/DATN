import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageSchedule from "../containers/System/Dentist/ManageSchedule";
import ManageService from "../containers/System/Admin/ManageService";
import ManageServiceInfo from "../containers/System/Admin/ManageServiceInfo";
import Header from "../containers/Header/Header";
import ManageBooking from "../containers/System/Dentist/ManageBooking";
import ListSchedule from "../containers/System/Admin/ListSchedule";

class Dentist extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/dentist/manage-schedule"
                component={ManageSchedule}
              />
              <Route path="/service/manage-service" component={ManageService} />
              <Route
                path="/service/manage-service-info"
                component={ManageServiceInfo}
              />
              <Route
                path="/dentist/manage-patient-booking"
                component={ManageBooking}
              />
              <Route
                path="/dentist/manage-list-schedule"
                component={ListSchedule}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dentist);
