import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl,ScrollView
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import SearchItem from './SearchItem';

import {connect} from 'react-redux';

class SearchList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };
        // this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
      console.log("did mount",this.props);
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.restaurants)
      });
    }


    componentWillReceiveProps(nextProps) {
        const {searchText, dispatch, restaurants} = this.props;
        console.log("new props for search list",this.props);
        if (restaurants !== nextProps.restaurants) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.restaurants)
            });
        }
    }

    render() {
        const {searchingFoody, restaurants} = this.props;
        return (
            <ListView

                distanceToLoadMore={300}
                renderScrollComponent={props => <InfiniteScrollView {...props} />}
                dataSource={this.state.dataSource}
                renderRow={(p) => {
                    return <SearchItem {...p} />;
                }}
                canLoadMore={() => {
                    if (searchingFoody || !restaurants.length)
                        return false;
                }}

                style={{backgroundColor: '#fff'}}
            />




        );
    }

    // handleRefresh() {
    //     const {dispatch, searchText} = this.props;
    //     dispatch(listPosts(searchText));
    // }
    //
    // handleLoadMore() {
    //     const {listingMorePosts, dispatch, posts, searchText} = this.props;
    //     const start = posts[posts.length - 1].id;
    //     if (listingMorePosts !== start)
    //         dispatch(listMorePosts(searchText, start));
    // }
}

export default connect((state, ownProps) => ({
    searchingFoody: state.search.searchingFoody,
    searchText: state.search.searchText,
    restaurants:state.search.restaurants,
    searchFood:state.search.searchFood,
    searchCity:state.search.searchCity
}))(SearchList);
