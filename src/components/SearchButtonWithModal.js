import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal} from 'react-native';

import {connect} from 'react-redux';
import {toggleSearchModal, setSearchText} from '../states/search';

import {Container, Header, Button, Icon, Item, Input} from 'native-base';
import appColors from '../styles/colors';

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
        const {searchText, modalToggle, style} = this.props;
        return (
            <Button transparent>
                <Icon name='magnify' style={style}
                    onPress={this.handleOpenModal} />
                <Modal animationType='none' transparent={true} visible={modalToggle}
                    onRequestClose={() => {}}>
                    <Container style={{backgroundColor: appColors.mask}}>
                        <Header searchBar rounded>
                            <Item style={{backgroundColor: 'white'}}>
                                <Icon name='magnify' />
                                <Input autoFocus placeholder='Search'
                                    defaultValue={searchText}
                                    onEndEditing={this.handleSearch}/>
                                <Icon name='close'
                                    onPress={this.handleClear} />
                            </Item>
                        </Header>
                    </Container>
                </Modal>
            </Button>
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

export default connect(state => ({
    searchText: state.search.searchText,
    modalToggle: state.search.modalToggle
}))(SearchButtonWithModal);
