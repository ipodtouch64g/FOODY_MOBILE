import React,{Component} from 'react';
import {View, Image, StyleSheet,FlatList} from 'react-native';
import { Fab, Button, Toast, Container, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import appColors from '../styles/colors';
import ShopModal from './ShopModal.js';

import {connect} from 'react-redux';
import {searchFoodyFromApi} from '../api/posts.js';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView from 'react-native-maps';
import {Select,
        Option,
        OptionList,
        updatePosition,} from 'react-native-dropdown';

const initRest={image: require('../images/default.png'),
                name:'Restaurant Name',
                category:'Restaurant Category',
                average:'Restaurant Average',
                address:'Restaurant address',
                lat:0,lng:0};


class FoodyScreen extends React.Component {
    static navigationOptions = {
    tabBarLabel: '食起來',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map-marker"
      style={{fontSize: 24,color: tintColor}}
      />
    ),
  };
  constructor(props) {
        super(props);

        this.deckSwiper=null;
        this.state = {
          region: {
            latitude: 22.7920733,
            longitude: 120.9933566,
            latitudeDelta:  0.0231,
            longitudeDelta: 0.0111
          },
          fabActive: true,
          visible: false,
          modalVisible: false,
          shop: null,
          markers:[],
          restaurants:[initRest],
          distance:1,
          limit:15
        };
       this.onRegionChange=this.onRegionChange.bind(this);
       this.onSearch=this.onSearch.bind(this);
       this._getOptionList1=this._getOptionList1.bind(this);
       this._getOptionList2=this._getOptionList2.bind(this);
       this._setDistance=this._setDistance.bind(this);
       this._setLimit=this._setLimit.bind(this);
    }
    onSearch(){
      this.setState({fabActive:false,visible:true});
      searchFoodyFromApi(this.state.region.latitude,this.state.region.longitude,this.state.distance,this.state.limit).then(n => {
        let marker=[this.state.markers[0]];
        let rests=[initRest];
        console.log(n);
        if(n.length)
        {
          for(var el of n){
            if(el.image==='-1')
              el.image=require('../images/default.png');
            else
              el.image={uri:el.image};
            rests.push(el);

            let m={
              latlng:{latitude:el.lat,longitude:el.lng},
              title:el.name
            }
            marker.push(m);
          }
        }

        this.setState({markers:marker,restaurants:rests,fabActive:true,visible:false});
      });
    }

    onRegionChange(region) {
      this.setState({region :region});
    }

     _getOptionList1() {
       return this.refs['OPTIONLIST1'];
     }
     _getOptionList2() {
        return this.refs['OPTIONLIST2'];
      }
     _setDistance(dis) {
       this.setState({distance: Number(dis)});
     }

     _setLimit(l) {
       this.setState({limit: Number(l)});
     }

    componentDidMount(){
      updatePosition(this.refs['SELECT1']);
      updatePosition(this.refs['SELECT2']);
      updatePosition(this.refs['OPTIONLIST1']);
      updatePosition(this.refs['OPTIONLIST2']);
      this.watchID=navigator.geolocation.getCurrentPosition(
        (position) => {
          let region={
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta:  0.0200,
            longitudeDelta: 0.0075
          }
          let m=[{
            latlng:{latitude:position.coords.latitude,longitude:position.coords.longitude},
            title:"Here!"
          }];
          this.setState({ region :region,markers:m});
        },
        (error) => {
          console.log(error)
        },
        {enableHighAccuracy:true, timeout: 20000, maximumAge: 1000 });
    }
    componentWillUnmount(){
      if(this.watchID)
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
      return (
      <View style={{flex:1}}>
        <View style ={styles.container}>
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            style={styles.map}
          >
          {this.state.markers.map((marker,index) => (
            <MapView.Marker
                coordinate={marker.latlng}
                title={marker.title}
                identifier={marker.title}
                pinColor={index===0?"green":"red"}>
              <MapView.Callout onPress={()=>{
                this.setState({modalVisible:true,shop:this.state.restaurants[index]});
              }}/>
          </MapView.Marker>
          ))}
         </MapView>
         <ShopModal {...this.state.shop} visible={this.state.modalVisible} setVisibility={()=>{this.setState({modalVisible:false})}}/>
         <Fab
             active={this.state.fabActive}
             containerStyle={StyleSheet.flatten(styles.fabContainer)}
             style={StyleSheet.flatten(styles.fab)}
             position="topRight"
             onPress={this.onSearch}>
             <Icon name='map-marker' />
          </Fab>
        <View style={{flex: 1}}>
          <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        </View>
        <View >
          <Select
            width={200}
            ref="SELECT1"
            optionListRef={this._getOptionList1}
            defaultValue="Select distance to Foody ..."
            onSelect={this._setDistance}>
            <Option>0.5</Option>
            <Option>1</Option>
            <Option>5</Option>
            <Option>10</Option>
          </Select>
          <OptionList ref="OPTIONLIST1"/>
        </View>
        <View >
            <Select
                width={200}
                ref="SELECT2"
                optionListRef={this._getOptionList2}
                defaultValue="number of restaurants..."
                onSelect={this._setLimit}>
                <Option>5</Option>
                <Option>10</Option>
                <Option>15</Option>
                <Option>30</Option>
              </Select>
            <OptionList ref="OPTIONLIST2"/>
        </View>
      </View>
      <View style={{flex:0.8}} >
          <DeckSwiper
              dataSource={this.state.restaurants}
              renderItem={item =>
                  <Card style={{ elevation: 15 }}>
                      <CardItem>
                          <Left>
                              <Image style={{ width: 100,height:100 }} source={item.image} />
                              <Body>
                                  <Text>{item.name}</Text>
                                  <Icon name="map-marker" style={{ color: appColors.primary }} />
                                  <Text note>{item.address}</Text>
                              </Body>
                          </Left>
                      </CardItem>
                      <CardItem style={StyleSheet.flatten(styles.text)}>
                          <Icon name="dollar" style={{ color: appColors.primary }} />
                          <Text>{item.average}   </Text>
                          <Icon name="hashtag" style={{ color: appColors.primary }} />
                          <Text>{item.category}</Text>
                      </CardItem>
                  </Card>
              }
          />
        </View>
      </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  fab: {
      backgroundColor: appColors.secondary
  },
  fabContainer: {
      marginTop: 100
  },
  text:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top:      50
  },
});

export default connect(state => ({
    lat: state.search.lat,
    lng: state.search.lng
}))(FoodyScreen);
