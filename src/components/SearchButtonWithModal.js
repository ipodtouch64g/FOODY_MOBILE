import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal,StyleSheet,Text,Animated,} from 'react-native';

import {connect} from 'react-redux';
import {toggleSearchModal, setSearchText} from '../states/search';

import {Container, Header, Button, Item, Input} from 'native-base';
import appColors from '../styles/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Kaede } from 'react-native-textinput-effects';
class SearchButtonWithModal extends React.Component {
    static propTypes = {
        searchText: PropTypes.string.isRequired,
        modalToggle: PropTypes.bool.isRequired,
        style: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    };



    render() {
        const {searchText, modalToggle, style, iconStyle} = this.props;
        return (
                <Animated.View style={{backgroundColor:this.props._deltaY.interpolate({
                   inputRange: [-45, 0],
                   outputRange: [appColors.secondaryLight, appColors.secondary],
                   extrapolateRight: "clamp",
                   extrapolateLeft: "clamp",
               })}}>




                  <Kaede
                    label={<Text ><Icon name='search' style={{fontSize: 20, color: 'white'}}/> &nbsp; 搜尋美食  </Text>}
                    labelStyle={{
                      color: '#fff',
                      backgroundColor:"rgba(255, 255, 255, 0)",
                    }}

                    inputStyle={{ backgroundColor: appColors.secondary,color: 'white'}}
                    onChangeText={(text) => {this.props.dispatch(setSearchText(text))}}
                  />
                </Animated.View>

        );
    }

    handleOpenModal() {
        this.props.dispatch(toggleSearchModal());
    }

    handleSearch(e) {
        this.props.dispatch(setSearchText(e.nativeEvent.text));
        this.props.dispatch(toggleSearchModal());
    }

    handleClear() {
        this.props.dispatch(setSearchText(''));
        this.props.dispatch(toggleSearchModal());
    }
}

const styles = {
    header: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0
    },
    fumi:{
        ...StyleSheet.absoluteFillObject
    }

};

export default connect(state => ({
    searchText: state.search.searchText,
    modalToggle: state.search.modalToggle
}))(SearchButtonWithModal);
