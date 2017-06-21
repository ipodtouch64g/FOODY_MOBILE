import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl,ScrollView
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import SearchItem from './SearchItem';
import {listMoreRests} from '../states/search';
import {connect} from 'react-redux';

class SearchList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };
        this.handleLoadMore = this.handleLoadMore.bind(this);
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
        const {searchingFoody,hasMore,restaurants} = this.props;
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
                    return hasMore;
                }}
                onLoadMoreAsync={this.handleLoadMore}
                style={{backgroundColor: '#fff'}}
            />
        );
    }
    handleLoadMore() {
        const {listingMoreRests, dispatch, restaurants, searchText,searchCity,category} = this.props;
        const start = restaurants[restaurants.length - 1].id;
        if (listingMoreRests !== start){
          console.log(listingMoreRests);
          dispatch(listMoreRests(searchText, start,searchCity,category));
        }
    }
}

export default connect((state, ownProps) => ({
    searchingFoody: state.search.searchingFoody,
    listingMoreRests: state.search.listingMoreRests,
    hasMore: state.search.hasMore,
    searchText: state.search.searchText,
    restaurants:state.search.restaurants,
    category: state.search.category,
    searchCity:state.search.searchCity
}))(SearchList);
