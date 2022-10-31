import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalsUser from "./ModalsUser";
import ModalsEditUser from "./ModalsEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalsUser: false,
      isOpenModalsEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("All");
    console.log(response);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({ isOpenModalsUser: true });
  };
  toggleUserModals = () => {
    this.setState({ isOpenModalsUser: !this.state.isOpenModalsUser });
  };
  toggleEditUserModals = () => {
    this.setState({ isOpenModalsEditUser: !this.state.isOpenModalsEditUser });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      console.log("response", response);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModalsUser: false });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDeleteUser = async (data) => {
    try {
      let res = await deleteUserService(data.id);
      if (res && res.errCode !== 0) {
        alert(res.message);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    this.setState({ isOpenModalsEditUser: true, userEdit: user });
  };
  editUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalsEditUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert("Error" + res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalsUser
          isOpen={this.state.isOpenModalsUser}
          toggleFromParent={this.toggleUserModals}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalsEditUser && (
          <ModalsEditUser
            isOpen={this.state.isOpenModalsEditUser}
            toggleFromParent={this.toggleEditUserModals}
            currentUser={this.state.userEdit}
            editUser={this.editUser}
          />
        )}
        <div className="title text-center">List Manage Users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus "></i> Add New User
          </button>
        </div>
        <div className="users-table mx-1 mt-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.length > 0 &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
