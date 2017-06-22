import React from 'react';
import PropTypes from 'prop-types';
import {Image,View, StyleSheet, Platform,Modal ,TouchableOpacity,ScrollView} from 'react-native';
import {Button,Thumbnail,Left,ListItem,Container, Content, Card, CardItem, Text, Body } from 'native-base';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import CommentList from './CommentList'
import {setToast} from '../states/toast';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import appColors from '../styles/colors';
import AddComment from './AddComment';

class ShopModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5,
          commentModalOpen:false,
          heart:false,
        };
        this.setcommentModalOpen = this.setcommentModalOpen.bind(this);
        this.setHeart = this.setHeart.bind(this);

    }
    

    setHeart(){
      this.setState({heart:!this.state.heart});
    }
    onStarRatingPress(rating) {
     this.setState({
       starCount: rating
     });
    }
 setcommentModalOpen() {
this.setState({commentModalOpen: !this.state.commentModalOpen},()=>{
  console.log('comment modal open!!');
});
}

    render() {
        return (
                <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={this.props.visible}
                  onRequestClose={() => {this.props.setVisibility()}}>
                     <ScrollView>
                       <View style={styles.modalHeader}>
                          <Image style={{resize:'cover',height:250}} source={this.props.image}>
                           <TouchableOpacity onPress={()=>{this.props.setVisibility()}}>

                             <Ionicon style={{paddingLeft:18,fontSize:50,color:'rgb(255, 255, 255)'}} name="ios-close"/>
                           </TouchableOpacity>
                         </Image>
                       </View>
                       <View style={styles.modalInfo}>
                         <View style={styles.nameandheart}>
                           <Text style={styles.name}>{this.props.name}</Text>
                           <TouchableOpacity onPress={()=>{this.setHeart()}}>
                              {this.state.heart?<Icon style={styles.heart} name={"heart"}/>:<Icon style={styles.heart} name={"heart-o"}/>}
                           </TouchableOpacity>
                         </View>
                         <View style={styles.categoryandstar}>
                           <StarRating
                             starSize={25}
                             disabled={false}
                             maxStars={5}
                             emptyStar={'ios-star-outline'}
                             fullStar={'ios-star'}
                             halfStar={'ios-star-half'}
                             iconSet={'Ionicons'}
                             rating={this.state.starCount}
                             selectedStar={(rating) => this.onStarRatingPress(rating)}
                             starColor={appColors.secondary}
                           />
                           <Text style={styles.category}>{this.props.category}</Text>
                         </View>
                       </View>
                       <View style={styles.modaltelandaddr}>
                         <View style={styles.tel}>
                           <Icon style={{fontSize:40,color:appColors.secondaryLight}} name={"phone"}/>
                           <Text style={{paddingTop:10,color:appColors.textLight}}>{this.props.telephon}</Text>
                         </View>
                         <View style={styles.addr}>
                           <Icon style={{fontSize:40,color:appColors.secondaryLight}} name={"map"}/>
                           <Text style={{paddingLeft:4,paddingRight:4,paddingTop:10,color:appColors.textLight}}>{this.props.address}</Text>
                         </View>
                       </View>
                       <View style={styles.commentarea}>
                         <View style={styles.commentareaheader}>
                           <Text style={{fontSize:20,paddingLeft:10}}>食客評論</Text>
                           <TouchableOpacity onPress={()=>{this.setcommentModalOpen()}}>
                             <Text style={{marginRight:20,color:appColors.secondary,borderRadius:10,fontSize:20,borderWidth:1,borderColor:appColors.secondary}}>發表評論</Text>
                           </TouchableOpacity>
                         </View>
                           <CommentList {...this.props}/>
                           <Modal
                             animationType={"slide"}
                             transparent={false}
                             visible={this.state.commentModalOpen}
                             onRequestClose={() => {this.setcommentModalOpen()}}
                             >
                              <AddComment {...this.props} setcommentModalOpen={this.setcommentModalOpen}/>
                           </Modal>
                       </View>
                     </ScrollView>
                </Modal>
        );
    }
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles ={
  commentmodal:{
    flex:1,
    backgroundColor:appColors.secondary,
  },
  commentareaheader:{

    flexDirection:'row',
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:0.2,
    borderBottomColor:appColors.textLight,
    justifyContent:'space-between',

  },
  commentarea:{
    flex:1,
    borderTopWidth:0.2,
    borderTopColor:appColors.textLight,
  },
  tel:{
    flex:0.45,
    alignItems:'center',
    borderRightWidth:0.2,
    borderRightColor:appColors.textLight,
  },
  addr:{
    alignItems:'center',
    flex:0.55,
  },
  modaltelandaddr:{
    flex:1,
    flexDirection:'row',
    paddingTop:15,
    paddingBottom:15,

  },
  nameandheart:{
    flex:1,
    flexDirection:'row',
  },
  heart:{
    flex:0.3,
    color:appColors.secondary,
    fontSize:40,
    paddingLeft:10,
  },
  categoryandstar:{
    flex:1,
    flexDirection:'row',
  },
  modalInfo:{
    flex:1,
    paddingLeft:16,
    paddingRight:16,
    paddingTop:10,
    paddingBottom:20,
    borderBottomWidth:0.2,
    borderColor:appColors.textLight,
  },
  name:{
    fontSize:40,
    paddingBottom:10,
    flex:0.7,
  },
  category:{
    flex:0.3,
    fontSize:25,
    textAlign:'right',
    color:appColors.textLight,
  },
  modalContainer:{
    flex:1,
    backgroundColor:'white',
    paddingBottom:18,
  },
};

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false
}))(ShopModal);
