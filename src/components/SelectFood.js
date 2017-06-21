import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  ListView,
  Text,
  Modal,
  View,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

import {connect} from 'react-redux';
import {setSearchFood,setSearchFoodAll,searchFoody,searchRestaurant} from '../states/search';
import {
  Content,
  ListItem,
  Separator,
  Container,
  Header,
  Button,
  Item,
  Input,
  List,
  CheckBox,

} from 'native-base';
import appColors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
const Dimensions = require('Dimensions');
var initOpens=Array(12).fill(false);

class SelectFood extends React.Component {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    style: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };


  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      modalOpen: false,
      subModalOpen: initOpens,
      activeSection: false,
      collapsed: [true,true],
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleSearchFood = this.handleSearchFood.bind(this);
  }
  _toggleExpanded = (index) => {
    this.setState((prev)=>{
      let m=prev.subModalOpen;
      m[index]=!m[index];
      return {subModalOpen:m};
    });
  }

  _setSection(section) {
    this.setState({activeSection: section});
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[
        styles.header, isActive
          ? styles.active
          : styles.inactive
      ]} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[
        styles.content, isActive
          ? styles.active
          : styles.inactive
      ]} transition="backgroundColor">
        <Animatable.Text animation={isActive
          ? 'bounceIn'
          : undefined}>{section.content}</Animatable.Text>
      </Animatable.View>
    );
  }
  handleSelectAll(name,amount){
    for(let i=0;i< amount;i++)
    {
      this.props.dispatch(setSearchFoodAll(name));
    }
  };
  handleSelectOne(foodCat,searchFood){
    this.props.dispatch(setSearchFood(foodCat,searchFood));
    this.forceUpdate();
  };
  handleCloseSearch=()=>{
    if(this.props.searchText||this.props.searchCity)
      this.props.dispatch(searchRestaurant(this.props.searchText,this.props.searchCity,this.props.category))
    else
      this.props.dispatch(searchFoody(this.props.lat,this.props.lng,this.props.category));
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }


  render() {
    const {
      searchFood,
      searchCity,
      searchText,
      style,
      iconStyle
    } = this.props;

    return (
      <Container>
        <Modal animationType={"fade"} transparent={true} visible={this.state.modalOpen} onRequestClose={this.handleCloseSearch}>
          <View style={styles.modalTransparent}>
            <View style={styles.topHeader}>
              <Button transparent iconLeft onPress={this.handleCloseSearch}>
                <Icon color={'white'} size={30} name='times'/>
              </Button>
              <Text style={StyleSheet.flatten(styles.topHeaderLocation)}>想吃什麼？</Text>
            </View>
              <Container>
                <Content>
                  <List>
                    {searchFood.map((FoodCat,index) =>
                      (<View>
                        <ListItem button key={index} onPress={()=>{}} style={StyleSheet.flatten(styles.content)}>
                          <View style={styles.header}>
                            <View style={styles.headerTextView}>
                              <Text style={styles.headerText}>{FoodCat[0]}&nbsp;&nbsp;&nbsp;<Icon name={'angle-down'}/></Text>
                            </View>
                          </View>
                      </ListItem>
                      {FoodCat.map((FoodCatIn,_index) =>{
                        if(_index>1)
                        {
                          return(
                          <ListItem button onPress={()=>{this.handleSelectOne(FoodCat[0],(FoodCatIn[0]))}} style={StyleSheet.flatten(styles.foodButton)}>
                            <Text style={StyleSheet.flatten(styles.textbtn)}>{(FoodCatIn[0])}</Text>
                            <Container style={StyleSheet.flatten(styles.checkbox)}><CheckBox onPress={()=>{this.handleSelectOne(FoodCat[0],(FoodCatIn[0]))}} checked={FoodCatIn[1]} /></Container>
                          </ListItem>
                          )
                        }
                      })}</View>)
                    )}
                  </List>
                </Content>
              </Container>
          </View>

        </Modal>
        <Button onPress={() => {
          this.setState({modalOpen: true})
        }} iconRight small style={StyleSheet.flatten(styles.button)}>
          <Icon name='angle-down'/>
          <Text>種類</Text>
          <Icon name='cutlery'/>
        </Button>
      </Container>

    );
  }

  handleSearchFood(food) {
    //this.setState({modalOpen: true});
    this.props.dispatch(setSearchFood(food));
    this.setState({modalOpen: false});
  }

}

const styles = StyleSheet.create({
  slowlist:{
    flex:1,
  },
  checkbox:{
    flex:0.2,
    height:20,
  },
  textbtn:{
    fontSize:24,
    color:'white',
    flex:0.8,
    textAlign:'center',

  },
  foodButton:{
    borderBottomWidth:0,
    width:Dimensions.get('window').width,
    flex:1,
    flexDirection:'row',
  },
  textbtnheader:{
    fontSize:24,
    color:'white',
    marginLeft:3,
    marginRight:3,

  },
  headerTextView:{
    flex:0.5,
  },
  headerButton:{
    flex:0.5,
    alignItems:'flex-end',
  },
  foodButtonHeader:{
    alignSelf:'flex-end',
  },


  foodButtons:{
    flex:1,

  },
  collapsible:{
    flex:1,
  },
  list: {
    flex: 1
  },
  container: {
    flex: 0.9,

    backgroundColor: appColors.secondaryLight
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20
  },
  header: {
    flex:1,
    flexDirection:'row',


  },
  insideText:{
    color:'white',
    fontWeight: '300',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    color:'white',

  },
  content: {
    borderBottomWidth:0.2,
    borderBottomColor:appColors.secondaryLight,
    flexDirection:'column',
    flex:1
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  inactive: {
    backgroundColor: appColors.secondaryLight
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  activeSelector: {
    fontWeight: 'bold'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  },
  itemText: {
    color: 'white',
    fontSize: 20
  },
  seperator: {
    backgroundColor: 'rgba(0,0,0, 0.0)',
    height: 50
  },
  seperatorText: {
    color: 'white',
    fontSize: 40
  },

  modalTransparent: {
    backgroundColor: appColors.secondary,
    flex: 1
  },
  button: {
    backgroundColor: 'white',
    width: 150
  },

  topHeader: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor:appColors.secondary,
    borderBottomWidth:0.2,
    borderColor:appColors.secondaryLight,
  },

  topHeaderLocation: {
    color: 'white',
    fontSize: 30,
    fontWeight:'bold',
    paddingLeft: 150,
    paddingTop: 5
  }
}
);


export default connect(state => ({
  searchFood: state.search.searchFood,
  searchCity: state.search.searchCity,
  searchText: state.search.searchText,
  category:state.search.category,
  lat:state.search.lat,
  lng:state.search.lng
}))(SelectFood);
