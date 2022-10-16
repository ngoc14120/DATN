import React, { Component } from "react";
import { connect } from "react-redux";
import "./Slider.scss";
import leftArrow from "../../../assets/images/left-arrow.svg";
import rightArrow from "../../../assets/images/right-arrow.svg";
import Slider1 from "../../../assets/images/slider1.jpg";
import Slider2 from "../../../assets/images/slider2.jpg";
import Slider3 from "../../../assets/images/slider_3.png";

const dataSlider = [
  { id: 1, img: Slider1 },
  { id: 2, img: Slider2 },
  { id: 3, img: Slider3 },
];

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 1,
    };
  }
  componentDidMount() {
    this.startSlider();
  }
  startSlider = () => {
    let slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  };
  nextSlide = () => {
    if (this.state.slideIndex !== dataSlider.length) {
      this.setState({ slideIndex: this.state.slideIndex + 1 });
    } else if (this.state.slideIndex === dataSlider.length) {
      this.setState({ slideIndex: 1 });
    }
  };

  prevSlide = () => {
    if (this.state.slideIndex !== 1) {
      this.setState({ slideIndex: this.state.slideIndex - 1 });
    } else if (this.state.slideIndex === 1) {
      this.setState({ slideIndex: dataSlider.length });
    }
  };

  moveDot = (index) => {
    this.setState({ slideIndex: index });
  };
  render() {
    return (
      <div className="container-slider">
        {dataSlider.map((obj, index) => {
          return (
            <div
              key={obj.id}
              className={
                this.state.slideIndex === index + 1
                  ? "slide active-anim"
                  : "slide"
              }
            >
              <img src={obj.img} />
            </div>
          );
        })}
        <button onClick={() => this.nextSlide()} className="btn-slide next">
          <img src={rightArrow} />
        </button>
        <button onClick={() => this.prevSlide()} className="btn-slide prev">
          <img src={leftArrow} />
        </button>

        <div className="container-dots">
          {Array.from({ length: 3 }).map((item, index) => (
            <div
              onClick={() => this.moveDot(index + 1)}
              className={
                this.state.slideIndex === index + 1 ? "dot active" : "dot"
              }
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
