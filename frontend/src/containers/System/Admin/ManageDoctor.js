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
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }

    if (prevProps.isCreateDentistInfo !== this.props.isCreateDentistInfo) {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        selectedOption: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        nameClinic: "",
        addressClinic: "",
        note: "",
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
        object.value = type === "DENTIST" ? item.id : item.keyMap;
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
    if (detailDentist && detailDentist.Markdown) {
      let markdown = detailDentist.Markdown;

      let selectedPrice = "",
        selectedPayment = "",
        selectedProvince = "",
        nameClinic = "",
        addressClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "";
      if (detailDentist.Dentist_info) {
        let dentistInfo = detailDentist.Dentist_info;
        let { listPrice, listPayment, listProvince } = this.state;
        priceId = dentistInfo.priceId;
        paymentId = dentistInfo.paymentId;
        provinceId = dentistInfo.provinceId;
        nameClinic = dentistInfo.nameClinic;
        addressClinic = dentistInfo.addressClinic;
        note = dentistInfo.note;
        selectedPrice = listPrice.find((element) => element.value === priceId);
        selectedPayment = listPayment.find(
          (element) => element.value === paymentId
        );
        selectedProvince = listProvince.find(
          (element) => element.value === provinceId
        );
      }
      this.setState({
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        action: CRUD_ACTION.EDIT,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        nameClinic: "",
        addressClinic: "",
        note: "",
        action: CRUD_ACTION.CREATE,
      });
    }
  };
  handleChangeSelectDentistInfo = async (selectedOption, name) => {
    let starName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[starName] = selectedOption;
    this.setState({ ...stateCopy });
  };
  handleOnchangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleSaveDoctorInfo = () => {
    console.log(this.state);
    this.props.createDentistInfo({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      action: this.state.action,
    });
  };
  render() {
    console.log("allDentist", this.props.allDentist);
    console.log("detailDentist", this.props.detailDentist);
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
                onChange={(e) => this.handleOnchangeText(e, "description")}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className=" row">
            <div className="col-4 form-group">
              <label>chon gias</label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelectDentistInfo}
                options={this.state.listPrice}
                name={"selectedPrice"}
              />
            </div>
            <div className="col-4 form-group">
              <label>chon phuong thuc thanh toan</label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelectDentistInfo}
                options={this.state.listPayment}
                name={"selectedPayment"}
              />
            </div>
            <div className="col-4 form-group">
              <label>chon tinh thanh</label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectDentistInfo}
                options={this.state.listProvince}
                name={"selectedProvince"}
              />
            </div>
            <div className="col-4 form-group">
              <label>Ten phong kham</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleOnchangeText(e, "nameClinic")}
                value={this.state.nameClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>dia chi phong kham</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleOnchangeText(e, "addressClinic")}
                value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>note</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleOnchangeText(e, "note")}
                value={this.state.note}
              />
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
    isCreateDentistInfo: state.admin.isCreateDentistInfo,
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
