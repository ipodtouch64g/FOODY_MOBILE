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
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import NavigationContainer from './NavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';
import SearchButtonWithModal from './SearchButtonWithModal';
import {connect} from 'react-redux';
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
      fabActive: false
    };

    this.handleFabClose = this.handleFabClose.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
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
          <SearchButtonWithModal/>
       <Animated.View style={[styles.filterContainer, {
         transform: [{
           translateY: this._deltaY.interpolate({
             inputRange: [-130, -50],
             outputRange: [-33, 0],
             extrapolateRight: 'clamp'
           })
         }]
       }]}>

         {/* <TouchableOpacity onPress={() => alert('Anywhere pressed')}>
           <View style={styles.filterField}>
             <Text style={styles.filterFieldText}>Anywhere</Text>
           </View>
         </TouchableOpacity> */}


         <TouchableOpacity onPress={() => alert('Anytime pressed')}>
           <Animated.View style={[styles.filterField, {
             opacity: this._deltaY.interpolate({
               inputRange: [-70, -50],
               outputRange: [0, 1],
               extrapolateLeft: 'clamp',
               extrapolateRight: 'clamp'
             })
           }]}>
             <Text style={styles.filterFieldText}>Anytime</Text>
           </Animated.View>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => alert('Anything pressed')}>
           <Animated.View style={[styles.filterField, {
             opacity: this._deltaY.interpolate({
               inputRange: [-20, 0],
               outputRange: [0, 1],
               extrapolateLeft: 'clamp',
               extrapolateRight: 'clamp'
             })
           }]}>
             <Text style={styles.filterFieldText}>Anything</Text>
           </Animated.View>
         </TouchableOpacity>
       </Animated.View>

       <Interactable.View
         verticalOnly={true}
         snapPoints={[{y: 0}, {y: -92}]}
         boundaries={{top: -200}}
         style={{flex:1}}
         animatedValueY={this._deltaY}>
         <View style={styles.content}>
           <Text style={styles.panelTitle}>San Francisco Airport</Text>
           <Text style={styles.panelSubtitle}>International Airport - 40 miles away</Text>
           <View style={styles.panelButton}>
             <Text style={styles.panelButtonTitle}>Directions</Text>
           </View>
           <View style={styles.panelButton}>
             <Text style={styles.panelButtonTitle}>Search Nearby</Text>
           </View>
         </View>
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
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',

  },
  filterContainer: {
    backgroundColor: appColors.secondary,

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
    height: 36,
    backgroundColor: '#3a969a',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center'
  },
  filterFieldText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 30,

  },
  content: {
    padding: 20,
    backgroundColor: 'white',
      flex:1
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

export default connect((state, ownProps) => ({creatingPost: state.post.creatingPost, creatingVote: state.post.creatingVote, toast: state.toast, searchText: state.search.searchText}))(TodayScreen);
