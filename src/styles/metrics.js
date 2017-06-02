import {Platform} from 'react-native';

export default appMetrics = {
    fontSizeBase: 15,
    toastDuration: 2000, // in ms
    parallaxHeaderMaxHeight: 300,
    parallaxHeaderMinHeight: (Platform.OS === 'ios') ? 64 : 56,
    get parallaxHeaderScrollDistance() {
        return this.parallaxHeaderMaxHeight - this.parallaxHeaderMinHeight;
    }
};
