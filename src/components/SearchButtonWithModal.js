import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal,StyleSheet,Text} from 'react-native';

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
    }

    render() {
        const {searchText, modalToggle, style, iconStyle} = this.props;
        return (
                <Kaede
                  label={<Text ><Icon name='cutlery' style={{fontSize: 20, color: 'white'}}/> &nbsp; 搜尋美食 </Text>}
                  labelStyle={{
                    color: 'white',
                    backgroundColor: appColors.secondary
                  }}
                  inputStyle={{ color: appColors.text }}
                  onChangeText={(text) => {this.props.dispatch(setSearchText(text))}}
                />
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
