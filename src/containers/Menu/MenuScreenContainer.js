import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from 'antd';
import { fetchNextWeek } from '../../ducks/mission';
import MenuScreen from '../../components/Menu/MenuScreen';

class MenuScreenContainer extends Component {
  static defaultProps = {
    userInfo: {},
    todoInfo: {},
    nextWeek: {},
  };

  state = {
    collapsed: false,
    pageToEditMission: false,
  };

  componentWillMount() {
    this.props.onLoadNextWeek();
  }

  handleMissionModal = () => {
    const that = this;
    Modal.confirm({
      title: '다음주 미션을 설정하시겠습니까?',
      content: '이번주 미션을 완료하면 다음주 미션 설정이 가능합니다.',
      onOk() {
        that.setState({
          pageToEditMission: true,
        });
      },
    });
  };

  handleToggleMenu = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div>
        {this.state.pageToEditMission && <Redirect to="/editnextweekmission" />}
        <MenuScreen
          {...this.state}
          {...this.props}
          handleToggleMenu={this.handleToggleMenu}
          handlepageToEditMission={this.handlepageToEditMission}
          handleMissionModal={this.handleMissionModal}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    todoInfo: state.main.todoInfo,
    userInfo: state.main.userInfo,
    nextWeek: state.mission.nextWeek,
  }),
  dispatch => ({
    onLoadNextWeek: () => dispatch(fetchNextWeek()),
  }),
)(MenuScreenContainer);
