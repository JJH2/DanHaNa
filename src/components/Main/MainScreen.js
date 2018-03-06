import React, { Component } from 'react';
import { Icon, Modal } from 'antd';
import { Link } from 'react-router-dom';
import throttle from 'lodash.throttle';
import './MainScreen.css';

export default class MainScreen extends Component {
  static defaultProps = {
    userInfo: {},
    loading: false,
    rollbackTodo: () => {},
    checkTodo: () => {},
  };

  componentDidMount() {
    this.changeCircleSize();
  }

  componentDidUpdate() {
    this.changeCircleSize();
  }

  changeCircleSize = () => {
    const circle = document.querySelector('.MainScreen__circle');
    const size = `${this.props.curstep}` / `${this.props.steps}`;
    circle.style.width = `calc(100vh * ${size})`;
    circle.style.height = `calc(100vh * ${size})`;
    circle.style.transition = 'width 0.3s, height 0.3s';
  };

  MissionSuccessStamp = () => (
    <div className="MainScreen__todo--stamp">미션 성공!</div>
  );

  AddToDoScreen = () => (
    <div className="MainScreen__todo__noData">
      <div className="MainScreen__todo__wrapper">
        <Link to="/editthisweekmission">
          <Icon className="MainScreen__todo__add" type="plus" />
        </Link>
        <p className="MainScreen__todo__req">새로운 미션을 시작해보세요</p>
      </div>
    </div>
  );

  showSuccessModal = () => {
    if (window.localStorage.getItem('successdone') === 'false')
      this.props.MissionSuccessModal();
  };

  handleClickCheck = throttle(() => this.props.checkTodo(), 1000);
  handleClickRollBack = throttle(() => this.props.rollbackTodo(), 1000);
  showToDoScreen = () => (
    <div>
      <div className="MainScreen__showtodo">
        <div className="MainScreen__showtodo__wrapper">
          <div className="MainScreen__stepContainer">
            <span className="MainScreen__stepContainer--curstep">
              {this.props.curstep}
            </span>
            <span className="MainScreen__stepContainer--steps">
              /{this.props.steps}
            </span>
          </div>
          {!this.props.complete && (
            <Icon
              className="MainScreen__rollback"
              type="rollback"
              onClick={this.handleClickRollBack}
            />
          )}
          <div className="MainScreen__todo">
            <div className="MainScreen__todo__wrapper">
              <p className="MainScreen__todo__title">{this.props.todo}</p>
              {this.props.complete && this.MissionSuccessStamp()}
            </div>
            <Icon
              className="MainScreen__todo__check"
              type={this.props.complete ? 'gift' : 'check'}
              onClick={this.handleClickCheck}
            />
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="MainScreen">
        <div className="MainScreen__circle" />
        {this.props.render()}
        {this.props.todo ? (
          <div>
            {this.showToDoScreen()}
            <Icon
              type="camera-o"
              className="MainScreen__camera"
              onClick={this.props.handleCameraIcon}
            />
            <Modal
              visible={this.props.showModal}
              onCancel={this.props.handleCloseScreenShot}
            />
          </div>
        ) : (
          this.AddToDoScreen()
        )}
      </div>
    );
  }
}
