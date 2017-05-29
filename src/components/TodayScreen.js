import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Icon, Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import NavigationContainer from './NavigationContainer';
import PostItem from './PostItem';

import {connect} from 'react-redux';
import {listPosts, listMorePosts, selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';

class TodayScreen extends React.Component {
    static propTypes = {
        searchText: PropTypes.string.isRequired,
        listingPosts: PropTypes.bool.isRequired,
        listingMorePosts: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        posts: PropTypes.array.isRequired,
        hasMorePosts: PropTypes.bool.isRequired,
        creatingPost: PropTypes.bool.isRequired,
        creatingVote: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            }),
            fabActive: false
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleFabClose = this.handleFabClose.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listPosts(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {
        const {searchText, dispatch, posts} = this.props;
        if (searchText !== nextProps.searchText) {
            dispatch(listPosts(nextProps.searchText));
        }
        if (posts !== nextProps.posts) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
            });
        }
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration
            })
            dispatch(setToast(''));
        }
    }

    render() {
        const {listingPosts, hasMorePosts, posts} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Today'>
                <ListView
                    refreshControl={
                        <RefreshControl refreshing={listingPosts} onRefresh={this.handleRefresh} />
                    }
                    distanceToLoadMore={300}
                    renderScrollComponent={props => <InfiniteScrollView {...props} />}
                    dataSource={this.state.dataSource}
                    renderRow={(p) => {
                        return <PostItem {...p} />;
                    }}
                    canLoadMore={() => {
                        if (listingPosts || !posts.length)
                            return false;
                        return hasMorePosts;
                    }}
                    onLoadMoreAsync={this.handleScroll}
                    style={{backgroundColor: '#fff'}}
                />
                {this.state.fabActive &&
                    <View style={styles.fabMask}
                    onPress={this.handleFabClose} />
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
            </NavigationContainer>
        );
    }

    handleRefresh() {
        const {dispatch, searchText} = this.props;
        dispatch(listPosts(searchText));
    }

    handleScroll() {
        const {listingMorePosts, dispatch, posts, searchText} = this.props;
        const start = posts[posts.length - 1].id;
        if (listingMorePosts !== start)
            dispatch(listMorePosts(searchText, start));
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
    searchText: state.search.searchText,
    listingPosts: state.post.listingPosts,
    listingMorePosts: state.post.listingMorePosts,
    posts: state.post.posts,
    hasMorePosts: state.post.hasMore,
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast
}))(TodayScreen);
