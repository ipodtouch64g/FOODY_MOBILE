import React from 'react';
import { View,Text,TextInput,TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import appColors from '../styles/colors';
import {
  Fumi
} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {createComments} from '../states/search';
import Ionicon from 'react-native-vector-icons/Ionicons';
export default class AddComment extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
       name: '',

       text: '',

     };
     this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(){

    if(!(this.state.text && this.state.name))
    {
      if(!this.state.text) alert('請輸入內容');
      if(!this.state.name) alert('請輸入名子');
    }
    else
    {
      console.log(this.state.name,this.state.text);
      this.props.dispatch(createComments(this.state.text,this.props.id,this.state.name,'-1'));
      this.props.setcommentModalOpen();
    }
  }
  render(){
    return(
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={[styles.card2, { backgroundColor: appColors.secondary }]}>

          <Fumi
            label={'您的大名'}
            autoFocus={true}
            inputStyle={{ color: appColors.secondary }}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
             onChangeText={(text) => { this.setState({name: text},()=>{console.log(this.state)}) }}
            iconColor={appColors.secondaryLight}
          />
          <Fumi
            style={styles.input}
            label={'您的評論'}
            iconClass={FontAwesomeIcon}
            iconName={'comments'}
             onChangeText={(text) => { this.setState({text: text},()=>{console.log(this.state)}) }}
            inputStyle={{ color: appColors.secondary }}
            iconColor={appColors.secondaryLight}
          />
            <TouchableOpacity onPress={()=>{this.handleSubmit()}}>
              <Ionicon  name={'ios-checkmark-circle-outline'} style={{textAlign:'center',color:'white',fontSize:50} }></Ionicon>

            </TouchableOpacity>

        </View>


      </ScrollView>
    )
  }
}
const styles={
  container: {
    flex: 1,

    backgroundColor: appColors.secondary,
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
}
