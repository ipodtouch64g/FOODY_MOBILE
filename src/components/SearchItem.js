import React from 'react';
import PropTypes from 'prop-types';
import {Image,View, StyleSheet, Platform} from 'react-native';
import {Button,Thumbnail,Left,ListItem,Container, Content, Card, CardItem, Text, Body } from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setToast} from '../states/toast';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import appColors from '../styles/colors';


class SearchItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5
        };
    }
    onStarRatingPress(rating) {
   this.setState({
     starCount: rating
   });
 }
    render() {
        return (

              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail square size={80} source={{uri: this.props.image}} />
                          <Body>
                              <Text>{this.props.name}</Text>
                              <Text note><Icon name={"map-marker"}></Icon>&nbsp;{this.props.address}</Text>
                          </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <StarRating
                      starSize={20}
                      disabled={true}
                      maxStars={5}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      starColor={'orange'}
                    />
                    <Text note style={{fontSize:12,paddingTop:8}}><Icon name={"hashtag"}></Icon>&nbsp;{this.props.category}</Text>

                  </Body>
                </CardItem>
              </Card>
          
        );
    }

    // handleTooltipToggle() {
    //     this.props.dispatch(toggleTooltip(this.props.id));
    // }
    //
    // handleVote(vote) {
    //     const {dispatch, id} = this.props;
    //     dispatch(createVote(id, vote)).then(() => {
    //         dispatch(setToast('Voted.'));
    //     });
    //     dispatch(setTooltipToggle(id, false));
    // }
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 0
    },
    post: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    mood: {
        width: 48,
        marginLeft: 12,
        marginRight: 8,
        top: 12,
        alignItems: 'center'
    },
    moodIcon: {
        color: appColors.text,
        fontSize: 32
    },
    wrap: {
        flex: 1
    },
    ts: {
        color: appColors.textLight
    },
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4
    },
    vote: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    voteResult: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 4
    },
    voteResultIcon: {
        fontSize: 17,
        color: appColors.textLight,
        marginRight: 2
    },
    voteResultText: {
        fontSize: 17,
        color: appColors.textLight
    },
    votePlus: {
        fontSize: 24,
        top: 2,
        color: appColors.textLight
    },
    tooltip: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.mask
    },
    tooltipIcon: {
        fontSize: 24,
        color: appColors.primaryText,
        marginHorizontal: 12
    }
});

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false
}))(SearchItem);
