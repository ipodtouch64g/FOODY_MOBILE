import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image} from 'react-native';

import {Container, Icon, Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import ParallaxNavigationContainer from './ParallaxNavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';
import WeatherDisplay from './WeatherDisplay';

import {connect} from 'react-redux';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';

class TodayScreen extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool.isRequired,
        creatingVote: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            fabActive: false
        };

        this.handleFabClose = this.handleFabClose.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration
            })
            this.props.dispatch(setToast(''));
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ParallaxNavigationContainer
                navigate={navigate}
                title='Today'
                titleLeft={80}
                titleTop={40}
                renderHeaderContent={props => <WeatherDisplay {...props} />}
                renderScroller={props => <PostList scrollProps={props} />}>
                {this.state.fabActive &&
                    <TouchableWithoutFeedback onPress={this.handleFabClose}>
                        <View style={styles.fabMask}/>
                    </TouchableWithoutFeedback>
                }
                <Fab
                    active={this.state.fabActive}
                    containerStyle={styles.fabContainer}
                    style={styles.fab}
                    position="bottomRight"
                    onPress={this.handleFabClose}>
                    <Icon name='pencil' />
                    <Button
                        onPress={() => this.handleCreatePost('Windy')}
                        style={styles.mood}>
                        {getMoodIcon({group: 'Windy', style: styles.moodIcon})}
                    </Button>
                    <Button
                        onPress={() => this.handleCreatePost('Snow')}
                        style={styles.mood}>
                        {getMoodIcon({group: 'Snow', style: styles.moodIcon})}
                    </Button>
                    <Button
                        onPress={() => this.handleCreatePost('Thunder')}
                        style={styles.mood}>
                        {getMoodIcon({group: 'Thunder', style: styles.moodIcon})}
                    </Button>
                    <Button
                        onPress={() => this.handleCreatePost('Rain')}
                        style={styles.mood}>
                        {getMoodIcon({group: 'Rain', style: styles.moodIcon})}
                    </Button>
                    <Button
                        onPress={() => this.handleCreatePost('Drizzle')}
                        style={styles.mood}>
                        {getMoodIcon({group: 'Drizzle', style: styles.moodIcon})}
                    </Button>
                    <Button
                        onPress={() => this.handleCreatePost('Clouds')}
                        style={styles.mood}>
                        {getMoodIcon({group: 'Clouds', style: styles.moodIcon})}
                    </Button>
                    <Button
                        onPress={() => this.handleCreatePost('Clear')}
                        style={styles.mood}>
                        {getMoodIcon({group: 'Clear', style: styles.moodIcon})}
                    </Button>
                </Fab>
            </ParallaxNavigationContainer>
        );
    }

    handleFabClose() {
        this.setState({fabActive: !this.state.fabActive});
    }

    handleCreatePost(mood) {
        this.handleFabClose();
        this.props.dispatch(selectMood(mood));
        this.props.navigation.navigate('PostForm');
    }
}

const styles = {
    fabMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: appColors.mask
    },
    fabContainer: {
        marginLeft: 10
    },
    fab: {
        backgroundColor: appColors.primary
    },
    mood: {
        backgroundColor: appColors.primaryLightBorder
    },
    moodIcon: {
        color: appColors.primaryLightText
    }
};

export default connect((state, ownProps) => ({
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast
}))(TodayScreen);
