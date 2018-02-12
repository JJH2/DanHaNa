import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuScreen from '../../components/Menu/MenuScreen';
import { toggleMenu } from '../../ducks/menu';

class MenuScreenContainer extends Component {
  static defaultProps = {
    collapsed: false,
    onToggle: () => {},
  };
  render() {
    const { ...rest } = this.props;
    return <MenuScreen {...rest} />;
  }
}

export default connect(
  state => ({
    collapsed: state.menu.collapsed,
  }),
  dispatch => ({
    onToggle: () => {
      dispatch(toggleMenu());
    },
  }),
)(MenuScreenContainer);
