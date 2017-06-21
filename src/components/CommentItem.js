import React from 'react';
import PropTypes from 'prop-types';
import {Image,View, StyleSheet, Platform,Modal ,TouchableOpacity,ScrollView} from 'react-native';
import {Button,Thumbnail,Left,ListItem,Container, Content, Card, CardItem, Text, Body } from 'native-base';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {setToast} from '../states/toast';

import moment from 'moment';
import appColors from '../styles/colors';


class CommentItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (

                <Card>
                  <CardItem>
                    <Left>
                      {this.props.img==='-1'?<Icon style={{fontSize:56,color:appColors.primary}} name={'user-circle-o'}/>:<Thumbnail square size={80} source={{uri: this.props.img}}/>}
                            <Body>
                              <View style={{flex:1}}>
                                <Text>{this.props.u_id}</Text>
                              </View>
                            </Body>
                    </Left>
                  </CardItem>
                  <CardItem >
                    <Body style={{flex:1}}>
                      <Text>
                        {this.props.text}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>


        );
    }

}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles ={

};

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false
}))(CommentItem);
