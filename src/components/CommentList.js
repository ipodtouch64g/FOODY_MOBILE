import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl,ScrollView
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import CommentItem from './CommentItem';
import {listComments} from '../states/search';
import {connect} from 'react-redux';

class CommentList extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
          })
      };

  }

  componentDidMount() {
      console.log("comment did mount",this.props);
      this.props.dispatch(listComments(this.props.id));
  }

  componentWillReceiveProps(nextProps) {

      console.log("new props for comment list",this.props);
      if (this.props.comments !== nextProps.comments) {
          this.setState({
              dataSource: this.state.dataSource.cloneWithRows(nextProps.comments)
          });
      }
  }

  render() {
      const {listingPosts, hasMorePosts, posts} = this.props;
      return (
          <ListView
              distanceToLoadMore={300}
              dataSource={this.state.dataSource}
              renderRow={(p) => {
                  return <CommentItem {...p} />;
              }}
              style={{backgroundColor: '#fff'}}
          />
      );
  }


}



export default connect((state, ownProps) => ({
    listingComments: state.search.listingComments,
    comments:state.search.comments,
}))(CommentList);
