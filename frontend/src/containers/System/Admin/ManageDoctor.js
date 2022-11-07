import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTION } from "../../../utils/constant";
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
      //markdown
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedOption: "",
      listDentist: [],
      action: "",

      // dentist info
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount(selectedOption) {
    this.props.fetchDentistAll();
    this.props.fetchRequiredDentistInfoStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDentist !== this.props.allDentist) {
      let dataSelect = this.buildDataDentistSelect(
        this.props.allDentist,
        "DENTIST"
      );
      this.setState({
        listDentist: dataSelect,
      });
    }
    if (
      prevProps.allRequiredDentistInfo !== this.props.allRequiredDentistInfo
    ) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDentistInfo;
      let dataSelectPrice = this.buildDataDentistSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataDentistSelect(resPayment);
      let dataSelectProvince = this.buildDataDentistSelect(resProvince);
      console.log(dataSelectPrice, dataSelectPayment, dataSelectProvince);
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }
  buildDataDentistSelect = (data, type) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.label =
          type === "DENTIST"
            ? `${item.lastName} ${item.firstName}`
            : type === "PRICE"
            ? `${item.valueVi} VND`
            : `${item.valueVi}`;
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
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    await this.props.fetchDetailDentistInfo(selectedOption.value);
    let { detailDentist } = this.props;
    console.log(detailDentist);
    if (detailDentist && detailDentist.Markdown) {
      let markdown = detailDentist.Markdown;
      this.setState({
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        action: CRUD_ACTION.EDIT,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        action: CRUD_ACTION.CREATE,
      });
    }
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
      action: this.state.action,
    });
    console.log(this.state);
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedOption: "",
    });
  };
  render() {
    console.log(this.props.allRequiredDentistInfo);
    console.log("detai", this.props.detailDentist);
    return (
      <React.Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">taoj thong tin bac si</div>
          <div className="doctor-info">
            <div className="content-left form-group">
              <label> Chonj bac si</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDentist}
                placeholder={"chon bac si"}
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
          <div className=" row">
            <div className="col-4 form-group">
              <label>chon gias</label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelect}
                options={this.state.listPrice}
              />
            </div>
            <div className="col-4 form-group">
              <label>chon phuong thuc thanh toan</label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelect}
                options={this.state.listPayment}
              />
            </div>
            <div className="col-4 form-group">
              <label>chon tinh thanh</label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelect}
                options={this.state.listProvince}
              />
            </div>
            <div className="col-4 form-group">
              <label>Ten phong kham</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-4 form-group">
              <label>dia chi phong kham</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-4 form-group">
              <label>note</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <button
            className={
              this.state.action === CRUD_ACTION.EDIT
                ? "btn btn-warning px-3"
                : "btn btn-primary px-3"
            }
            onClick={() => this.handleSaveDoctorInfo()}
          >
            {this.state.action === CRUD_ACTION.EDIT ? (
              <span>CẬP NHẬT THÔNG TIN</span>
            ) : (
              <span>LƯU THÔNG TIN</span>
            )}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailDentist: state.admin.detailDentist,
    allDentist: state.admin.allDentist,
    allRequiredDentistInfo: state.admin.allRequiredDentistInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailDentistInfo: (id) =>
      dispatch(actions.fetchDetailDentistInfo(id)),
    fetchDentistAll: () => dispatch(actions.fetchDentistAll()),
    createDentistInfo: (data) => dispatch(actions.createDentistInfo(data)),
    fetchRequiredDentistInfoStart: () =>
      dispatch(actions.fetchRequiredDentistInfoStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
