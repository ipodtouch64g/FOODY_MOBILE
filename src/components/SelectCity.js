import React from 'react';
import PropTypes from 'prop-types';
import {Text, Modal, View, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {searchRestaurant, setSearchCity} from '../states/search';

import {
  Content,
  ListItem,
  Separator,
  Container,
  Header,
  Button,
  Item,
  Input,List
} from 'native-base';
import appColors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
const Dimensions = require('Dimensions');
class SelectCity extends React.Component {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    style: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
    this.handleSearchCity = this.handleSearchCity.bind(this);

  }

  render() {
    const {searchCity, searchText, style, iconStyle} = this.props;

    return (

      <Container>
        <Modal animationType={"fade"} transparent={true} visible={this.state.modalOpen} onRequestClose={() => {
          this.setState({
            modalOpen: !this.state.modalOpen
          })
        }}>
          <View style={styles.modalTransparent}>
            <View style={styles.topHeader}>
              <Button transparent iconLeft onPress={() => {
                this.props.dispatch(setSearchCity(''));
                this.setState({
                  modalOpen: !this.state.modalOpen
                });
              }}>
                <Icon color={'white'} size={30} name='times'/>
              </Button>
              <Text style={styles.topHeaderLocation}>選擇地區</Text>
            </View>
            <View style={styles.list}>
              <Container>
                <Content>
                  <List >
                    <Separator style={styles.seperator}>
                      <Text style={styles.seperatorText}>北部</Text>
                    </Separator>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('台北市')}} >
                      <Text style={styles.itemText}>台北市</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('新北市')}}>
                      <Text style={styles.itemText}>新北市</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('新竹市')}}>
                      <Text style={styles.itemText}>新竹市</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('基隆市')}}>
                      <Text style={styles.itemText}>基隆市</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('桃園市')}}>
                      <Text style={styles.itemText}>桃園市</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('宜蘭縣')}}>
                      <Text style={styles.itemText}>宜蘭縣</Text>
                    </ListItem>
                    <ListItem  style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('新竹縣')}}>
                      <Text style={styles.itemText}>新竹縣</Text>
                    </ListItem>
                    <Separator style={styles.seperator}>
                      <Text style={styles.seperatorText}>中部</Text>
                    </Separator>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('臺中市')}}>
                      <Text style={styles.itemText}>臺中市</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('彰化縣')}}>
                      <Text style={styles.itemText}>彰化縣</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('苗栗縣')}}>
                      <Text style={styles.itemText}>苗栗縣</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('南投縣')}}>
                      <Text style={styles.itemText}>南投縣</Text>
                    </ListItem>
                    <ListItem  style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('雲林縣')}}>
                      <Text style={styles.itemText}>雲林縣</Text>
                    </ListItem>
                    <Separator style={styles.seperator}>
                      <Text style={styles.seperatorText}>南部</Text>
                    </Separator>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('台南市')}}>
                      <Text style={styles.itemText}>台南市</Text>
                    </ListItem>
                    <ListItem style={styles.itemstyle} button onPress={()=>{this.handleSearchCity('高雄市')}}>
                      <Text style={styles.itemText}>高雄市</Text>
                    </ListItem>

                  </List>

                </Content>
              </Container>
            </View>

          </View>
        </Modal>
        <Button onPress={()=>{this.setState({modalOpen:true})}} iconRight small style={styles.button}>
          <Icon name='map-o'/>
          <Text>{this.props.searchCity?this.props.searchCity:'位置'}</Text>
          <Icon name='angle-down'/>
        </Button>
      </Container>

    );
  }

  handleSearchCity(city) {
    //this.setState({modalOpen: true});
    this.props.dispatch(setSearchCity(city));
    this.props.dispatch(searchRestaurant(this.props.searchText,city,this.props.category));
    this.setState({modalOpen: false});
  }

}

const styles = {
  itemstyle:{
    borderBottomWidth:0.2,
    borderColor:appColors.secondaryLight,
  },
  button: {
    backgroundColor: 'rgba(0,0,0, 0.0)'
  },
  itemText: {
    color: 'white',
    fontSize: 20
  },
  seperator: {
    backgroundColor: 'rgba(0,0,0, 0.0)',
    paddingTop:15,
    height: 55
  },
  seperatorText: {
    color: 'white',
    fontSize: 40
  },
  list: {
    flex: 0.9
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
    color:'white',
    fontSize: 30,
    paddingLeft: 150,
    paddingTop: 5
  }
};

export default connect(state => ({
  searchCity: state.search.searchCity,
  searchText: state.search.searchText,
  category: state.search.category
}))(SelectCity);
