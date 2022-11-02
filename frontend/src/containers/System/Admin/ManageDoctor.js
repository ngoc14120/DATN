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

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedOption: "",
      listDentist: [],
    };
  }

  componentDidMount() {
    this.props.fetchDentistAll();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDentist !== this.props.allDentist) {
      let dataSelect = this.buildDataDentistSelect(this.props.allDentist);
      this.setState({
        listDentist: dataSelect,
      });
    }
  }
  buildDataDentistSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.label = `${item.lastName} ${item.firstName}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
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
    this.props.createDentistInfo({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
    });
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedOption: "",
    });
    console.log(this.state);
  };
  render() {
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
                options={this.state.listDentist}
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
    allDentist: state.admin.allDentist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    // deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    fetchDentistAll: () => dispatch(actions.fetchDentistAll()),
    createDentistInfo: (data) => dispatch(actions.createDentistInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
