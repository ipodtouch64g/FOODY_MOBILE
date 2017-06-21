import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Image,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native'; // Interaction
import {searchFoodyFromApi} from '../api/posts.js'
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import NavigationContainer from './NavigationContainer';
import SearchList from './SearchList';
import SearchButtonWithModal from './SearchButtonWithModal';
import SelectCity from './SelectCity';
import SelectFood from './SelectFood';
import LoadingFoodyIndicator from './LoadingFoodyIndicator';
import {connect} from 'react-redux';
import {searchFoody,setSearchLatLng} from '../states/search';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';
import Interactable from 'react-native-interactable'; //Up intersex
const Screen = Dimensions.get('window'); //Up intersex

class TodayScreen extends React.Component {
  static propTypes = {
    creatingPost: PropTypes.bool.isRequired,
    creatingVote: PropTypes.bool.isRequired,
    toast: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  static navigationOptions = {
    tabBarLabel: '主頁',
    tabBarIcon: ({tintColor}) => (<Icon name="home" style={{
      fontSize: 24,
      color: tintColor
    }}/>)
  };

  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
    this.state = {
      visible:false,
      fabActive: false
    };
    this.color = this._deltaY.interpolate({
        inputRange: [-50, 0],
        outputRange: ['#fff', appColors.secondaryLight],
        extrapolateRight: 'clamp'
    });
    this.handleFabClose = this.handleFabClose.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }
  componentWillUnmount(){
    if(this.watchID)
      navigator.geolocation.clearWatch(this.watchID);
  }

  componentDidMount(){

    this.watchID=navigator.geolocation.getCurrentPosition(
      (position) => {
        let region={
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta:  0.0200,
          longitudeDelta: 0.0075
        }
        this.props.dispatch(setSearchLatLng(region.latitude,region.longitude));
        this.setState({canStartSearchFoody:true},()=>{
          console.log(region.latitude,region.longitude);
          this.props.dispatch(searchFoody(this.props.lat,this.props.lng,this.props.category));
        });
      },
      (error) => {
        console.log(error)
      },
      {enableHighAccuracy:true, timeout: 20000, maximumAge: 1000 });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.toast) {
      Toast.show({text: nextProps.toast, position: 'bottom', duration: appMetrics.toastDuration})
      this.props.dispatch(setToast(''));
    }
  }


  render() {
    const {navigate} = this.props.navigation;



    return (

        <View style={styles.container}>
        <SearchButtonWithModal _deltaY={this._deltaY}/>
       <Animated.View style={[styles.filterContainer, {
         transform: [{
           translateY: this._deltaY.interpolate({
             inputRange: [-130, -60],
             outputRange: [-33, 0],
             extrapolateRight: 'clamp'
           })
         }]
       },{backgroundColor:this.color}]}>


         <Animated.View style={[styles.filterField, {
           opacity: this._deltaY.interpolate({
             inputRange: [-70, -50],
             outputRange: [0, 1],
             extrapolateLeft: 'clamp',
             extrapolateRight: 'clamp'
           })
         }]}>
           <View style={[styles.filterFieldText]}><SelectCity/></View>
          <View style={[styles.filterFieldText]}><SelectFood /></View>

         </Animated.View>


       </Animated.View>

       <Interactable.View
         verticalOnly={true}
         snapPoints={[{y: 0}, {y: -80}]}
         style={{flex:1}}
         animatedValueY={this._deltaY}>
          {this.props.restaurants.length>0?<SearchList/>:<LoadingFoodyIndicator/>}



       </Interactable.View>
     </View>

    );
  }

  handleFabClose() {
    this.setState({
      fabActive: !this.state.fabActive
    });
  }

  handleCreatePost(mood) {
    this.handleFabClose();
    this.props.dispatch(selectMood(mood));
    this.props.navigation.navigate('PostForm');
  }
}
const styles = StyleSheet.create({
  listitem:{
    borderBottomWidth:0,
  },
  listitemtitle:{
    borderBottomWidth:0,
    flex:1,

  },

  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',

  },
  filterContainer: {
    backgroundColor: "white",

  },
  filterTop: {
    marginBottom:30
  },
  filterUp: {
    marginLeft: 24,
    width: 26,
    height: 26
  },
  filterField: {

    height: 40,
    // backgroundColor: color,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  filterFieldText: {



    marginVertical: 5

  },
  content: {
    zIndex:1000,
  },
  panelTitle: {
    fontSize: 27,
    height: 35
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#de6d77',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  photo: {
    width: Screen.width - 40,
    height: 190,
    marginBottom: 20
  }
});
// const styles = {
//     fabMask: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: appColors.mask
//     },
//     fabContainer: {
//         marginLeft: 10
//     },
//     fab: {
//         backgroundColor: appColors.primary
//     },
//     mood: {
//         backgroundColor: appColors.primaryLightBorder
//     },
//     moodIcon: {
//         color: appColors.primaryLightText
//     },
//
// };

export default connect((state, ownProps) => ({
  restaurants:state.search.restaurants,
  searchFood:state.search.searchFood,
  searchCity:state.search.searchCity,
  creatingPost: state.post.creatingPost,
  creatingVote: state.post.creatingVote,
  toast: state.toast,
  category:state.search.category,
  searchText: state.search.searchText,
  lat:state.search.lat,
  lng:state.search.lng
}))(TodayScreen);
