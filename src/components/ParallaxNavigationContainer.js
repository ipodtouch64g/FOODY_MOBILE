import React from 'react';
import PropTypes from 'prop-types';
import {StatusBar, StyleSheet, Text, View, Platform, Animated} from 'react-native';

import {Container, Header, Button, Icon, Drawer} from 'native-base';
import color from 'color';
import SearchButtonWithModal from './SearchButtonWithModal';
import DrawerSideBar from './DrawerSideBar';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export default class ParallaxNavigationContainer extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        titleLeft: PropTypes.number.isRequired,
        titleTop: PropTypes.number.isRequired,
        renderHeaderContent: PropTypes.func.isRequired,
        renderScroller: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.scrollY = new Animated.Value(0);
        this.scrollYTrace = [];

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    render() {
        const {title, titleLeft, titleTop, navigate,
            renderHeaderContent, renderScroller} = this.props;
        const scrollY = this.scrollY;
        const {
            parallaxHeaderScrollDistance: dist,
            parallaxHeaderMaxHeight: maxHeight,
            parallaxHeaderMinHeight: minHeight,
        } = appMetrics;

        const headerTranslate = scrollY.interpolate({
            inputRange: [0, dist],
            outputRange: [0, -dist],
            extrapolate: 'clamp'
        });
        const imageOpacity = scrollY.interpolate({
            inputRange: [0, dist / 3, dist],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, dist],
            outputRange: [0, 120],
            extrapolate: 'clamp'
        });
        const titleOpacity = scrollY.interpolate({
            inputRange: [0, dist / 3, dist],
            outputRange: [0.7, 0.7, 1],
            extrapolate: 'clamp'
        });
        const titleScale = scrollY.interpolate({
            inputRange: [0, dist / 3, dist],
            outputRange: [0.9, 0.9, 1],
            extrapolate: 'clamp'
        });
        const titleTranslateX = scrollY.interpolate({
            inputRange: [0, dist / 3, dist],
            outputRange: [titleLeft, titleLeft, 0],
            extrapolate: 'clamp'
        });
        const titleTranslateY = scrollY.interpolate({
            inputRange: [0, dist / 3, dist],
            outputRange: [titleTop, titleTop, 0],
            extrapolate: 'clamp'
        });
        const headerContentTranslate = scrollY.interpolate({
            inputRange: [0, dist],
            outputRange: [0, -60],
            extrapolate: 'clamp'
        });
        const scrollViewContentTranslate = scrollY.interpolate({
            inputRange: [0, dist],
            outputRange: [dist, 0],
            extrapolate: 'clamp'
        });

        return (
            <Drawer
                ref={(el) => this.drawer = el}
                content={<DrawerSideBar navigate={navigate} />}
                onClose={this.closeDrawer}
                tweenHandler={(ratio) => ({
                    mainOverlay: {
                        opacity: ratio,
                        backgroundColor: appColors.mask
                    }
                })}>
                <Container>
                    <StatusBar barStyle="light-content"
                        backgroundColor={color(appColors.primary).darken(0.1).hsl().string()} />
                    <Animated.View style={[
                        styles.scrollViewContent, {
                            transform: [
                                {
                                    translateY: scrollViewContentTranslate
                                }
                            ]
                        }
                    ]}>{
                        renderScroller({
                            scrollEventThrottle: 16,
                            onScroll: this.handleScroll
                        })
                    }</Animated.View>

                    <Animated.View style={[
                        styles.header, {
                            transform: [
                                {
                                    translateY: headerTranslate
                                }
                            ]
                        }
                    ]}>
                        <Animated.Image style={[
                            styles.backgroundImage, {
                                opacity: imageOpacity,
                                transform: [
                                    {
                                        translateY: imageTranslate
                                    }
                                ]
                            }
                        ]} source={require('../images/bg.jpg')}>
                            <Animated.View style={[
                                styles.headerContent, {
                                    transform: [
                                        {
                                            translateY: headerContentTranslate
                                        }
                                    ]
                                }
                            ]}>{renderHeaderContent({})}</Animated.View>
                        </Animated.Image>
                    </Animated.View>
                    <View style={styles.bar}>
                        <Button transparent style={StyleSheet.flatten(styles.button)} onPress={this.openDrawer}>
                            <Icon name='menu'
                                style={StyleSheet.flatten(styles.icon)} />
                        </Button>
                        <SearchButtonWithModal style={StyleSheet.flatten(styles.button)}
                            iconStyle={StyleSheet.flatten(styles.icon)} />
                    </View>
                    <Animated.View style={[
                        styles.title, {
                            opacity: titleOpacity,
                            transform: [
                                {
                                    scale: titleScale
                                }, {
                                    translateX: titleTranslateX
                                }, {
                                    translateY: titleTranslateY
                                }
                            ]
                        }
                    ]}>
                        <Text style={styles.titleText}>{title}</Text>
                    </Animated.View>
                    {this.props.children}
                </Container>
            </Drawer>
        );
    }

    openDrawer() {
        this.drawer._root.open();
    }

    closeDrawer() {
        this.drawer._root.close();
    }

    handleScroll(e) {
        const y = e.nativeEvent.contentOffset.y;
        /*
         * Since the scroll view itself is translating, the content offset (y)
         * does not only depend on the touch move gesture and may fluctuate.
         * To smooth out the content offset, we average its values in a small
         * window (5 in this case).
         */
        const trace = this.scrollYTrace;
        trace.push(y);
        if (trace.length > 5) {
            trace.shift();
            const sum = 0;
            for (let t of trace)
                sum += t;
            this.scrollY.setValue(sum / 5);
        }
    }
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: appColors.primary,
        overflow: 'hidden',
        height: appMetrics.parallaxHeaderMaxHeight
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: appMetrics.parallaxHeaderMaxHeight,
        flex: 1,
        resizeMode: 'cover'
    },
    headerContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: appMetrics.parallaxHeaderMaxHeight
    },
    bar: {
        position: 'absolute',
        top: Platform.OS === 'ios'? 15 : 0,
        left: 0,
        right: 0,
        height: (Platform.OS === 'ios') ? 49 : 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    button: {
        height: (Platform.OS === 'ios') ? 49 : 56
    },
    icon: {
        color: 'white'
    },
    title: {
        position: 'absolute',
        top: Platform.OS === 'ios'? 27 : 14,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    titleText: {
        color: 'white',
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: (Platform.OS ==='ios') ? '600' : undefined
    },
    scrollView: {
        position: 'absolute',
        top: appMetrics.parallaxHeaderMinHeight,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent'
    },
    scrollViewContent: {
        flex: 1,
        marginTop: appMetrics.parallaxHeaderMinHeight
    }
});
