import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Content,Icon} from 'native-base';
import NavigationContainer from './NavigationContainer';

import {connect} from 'react-redux';

class FoodyScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        searchText: PropTypes.string.isRequired
    };
    static navigationOptions = {
    tabBarLabel: '食起來',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map-marker-circle"
      style={{fontSize: 24,color: tintColor}}
      />
    ),
  };
    constructor(props) {
        super(props);
    }

    render() {
        const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Foody'>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center'}}>Searchtext: {searchText}</Text>
                </View>
            </NavigationContainer>
        );
    }
}

export default connect(state => ({
    searchText: state.search.searchText,
}))(FoodyScreen);
