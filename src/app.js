import React from 'react';
import {BackHandler,View} from 'react-native';

import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';
import {search} from './states/search';
import {toast} from './states/toast';

import {post, postForm, postItem} from './states/post-reducers';

import {TabNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';
import TodayScreen from './components/TodayScreen';
import PostFormScreen from './components/PostFormScreen';
import ForecastScreen from './components/ForecastScreen';
import FoodyScreen from './components/FoodyScreen';
import SettingScreen from './components/SettingScreen';
const AppNavigator = TabNavigator({

    Today: {screen: TodayScreen},
    Foody: {screen: FoodyScreen}

}, {
    headerMode: 'none',
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true,
        activeTintColor: appColors.primary,
        inactiveTintColor: appColors.text,
        tabStyle: {
          height: 48,
        },
        style: {
          backgroundColor: 'white',
          borderTopWidth: 0.2,
          borderTopColor: appColors.text
        },
        labelStyle:{
          marginTop: 0,
          marginBottom: 0,
          fontSize:14
        },

        indicatorStyle:{
          backgroundColor: appColors.primary,
        },

  }

});

class AppWithStyleAndNavigator extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>


                  <AppNavigator navigation={addNavigationHelpers({
                      dispatch: this.props.dispatch,
                      state: this.props.nav
                  })}/>




            </StyleProvider>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {dispatch, nav} = this.props;
            if (nav.index === 0)
                return false;
            dispatch(NavigationActions.back())
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }
}

const AppWithNavState = connect(state => ({
    nav: state.nav
}))(AppWithStyleAndNavigator);

// Nav reducer
const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Today'}));
const nav = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

// Create Redux store
const store = createStore(combineReducers({
    nav, search, toast,
    post, postForm, postItem
}), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavState/>
            </Provider>
        );
    }
}
