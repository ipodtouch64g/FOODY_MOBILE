import React from 'react';
import { Animated,View,Text } from 'react-native';
import Animation from 'lottie-react-native';
const Dimensions = require('Dimensions');
export default class LoadingFoodyIndicator extends React.Component
{
  constructor(props)
  {
    super(props);
  }
  componentDidMount() {
    this.animation.play();
  }
  render(){
    return(
      <View style={styles.titleContainer}>
      <Animation
      ref={animation => { this.animation = animation; }}
      loop={true}
      style={{
      height:300,
      width:300,
      left:20
      }}
      source={require('../utilities/PinJump.json')}
      />

      <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>正在搜尋您附近的餐廳...</Text>

      </View>
    )
  }
}
const styles={
  titleContainer:{
    flex:1,
  },

}
