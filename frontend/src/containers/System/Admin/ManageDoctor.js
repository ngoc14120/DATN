import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedOption: "",
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  handleOnchangeDesc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleSaveDoctorInfo = () => {
    console.log(this.state);
  };
  render() {
    let arrUsers = this.state.userRedux;
    // console.log(this.state.userRedux);
    return (
      <React.Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">taoj thong tin bac si</div>
          <div className="doctor-info">
            <div className="content-left form-group">
              <label> Chonj bac si</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </div>
            <div className="content-right">
              <label>Thoong tin gioi thieu bac si</label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(e) => this.handleOnchangeDesc(e)}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
          <button
            className="btn btn-warning"
            onClick={() => this.handleSaveDoctorInfo()}
          >
            LUU THONG TIN
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    // deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
