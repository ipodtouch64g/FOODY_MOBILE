import React from 'react';
import PropTypes from 'prop-types';
import {View,StyleSheet} from 'react-native';
import {Container, Header, Button, Icon, Left, Right, Body, Title, Drawer} from 'native-base';

import DrawerSideBar from './DrawerSideBar';
export default class NavigationContainer extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    render() {
        const {title, navigate} = this.props;
        return (

                <Container style={{...StyleSheet.absoluteFillObject,height:200}}>



                      {this.props.children}



                </Container>

        );
    }

    openDrawer() {
        this.drawer._root.open();
    }

    closeDrawer() {
        this.drawer._root.close();
    }
}
const styles = {
    Tab: {
        position: 'absolute',
        backgroundColor: appColors.primary
    }
};
