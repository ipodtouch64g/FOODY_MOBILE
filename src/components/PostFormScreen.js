import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';

import {connect} from 'react-redux';
import {createPost, input, inputDanger} from '../states/post-actions';
import {setToast} from '../states/toast';

import {Container, Header, Content, Title, Left, Right, Body, Icon, Button, Item, Label, Input} from 'native-base';
import appColors from '../styles/colors';
import {getMoodIcon} from '../utilities/weather';

class PostFormScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        mood: PropTypes.string.isRequired,
        inputValue: PropTypes.string.isRequired,
        inputDanger: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreatPost = this.handleCreatPost.bind(this);
    }

    render() {
        const {mood, inputValue, inputDanger} = this.props;
        return (
            <Container>
                <Header>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='arrow-left'  style={{fontSize: 24}} />
                    </Button></Left>
                    <Body><Title>New Post</Title></Body>
                    <Right><Button transparent onPress={this.handleCreatPost}>
                        <Icon name='check'  style={{fontSize: 24}} />
                    </Button></Right>
                </Header>
                <Content style={styles.content}>
                    {getMoodIcon({
                        group: mood,
                        size: 120,
                        style: styles.mood
                    })}
                    <Item regular error={inputDanger} style={styles.item}>
                        {/* <Label>What's on your mind?</Label> */}
                        <Input autoFocus multiline maxLength={1024} placeholder="What's on your mind?"
                             style={styles.input} value={inputValue}
                             onChange={this.handleInputChange} />
                    </Item>
                </Content>
            </Container>
        );
    }

    handleGoBack() {
         this.props.navigation.goBack();
    }

    handleInputChange(e) {
        const {inputDanger: danger, dispatch} = this.props;
        const inputValue = e.nativeEvent.text;
        if (danger)
            dispatch(inputDanger(false));
        dispatch(input(inputValue));
    }

    handleCreatPost() {
        const {mood, inputValue, dispatch} = this.props;
        const {goBack} = this.props.navigation;
        if (inputValue) {
            dispatch(createPost(mood, inputValue)).then(() => {
                dispatch(setToast('Posted.'));
            });
            goBack();
        } else {
            dispatch(inputDanger(true));
        }
    }
}

const styles = {
    content: {
        backgroundColor: appColors.primaryLight
    },
    mood: {
        color: appColors.primaryLightText,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32,
    },
    item: {
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        backgroundColor: '#fff'
    },
    input: {
        height: 100
    }
};

export default connect(state => ({
    ...state.postForm
}))(PostFormScreen);
