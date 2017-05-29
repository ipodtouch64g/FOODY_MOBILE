import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export function getMoodIcon({group='', size=appMetrics.fontSizeBase,
    onPress=undefined, style=undefined}) {
    switch (group) {
        case 'Thunder':
            return <Icon name="bolt" size={size} onPress={onPress} style={style} />;
        case 'Drizzle':
            return <Icon name="tint" size={size} onPress={onPress} style={style} />;
        case 'Rain':
            return <Icon name="umbrella" size={size} onPress={onPress} style={style} />;
        case 'Snow':
            return <Icon name="snowflake-o" size={size} onPress={onPress} style={style} />;
        case 'Windy':
            return <Icon name="leaf" size={size} onPress={onPress} style={style} />;
        case 'Clear':
            return <Icon name="sun-o" size={size} onPress={onPress} style={style} />;
        case 'Clouds':
            return <Icon name="cloud" size={size} onPress={onPress} style={style} />;
        default:
            return <Icon name="help-circle" size={size} onPress={onPress} style={style} />;
    }
}
