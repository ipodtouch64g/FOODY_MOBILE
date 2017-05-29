import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';

import {connect} from 'react-redux';
import {createVote, setTooltipToggle, toggleTooltip} from '../states/post-actions';
import {setToast} from '../states/toast';

import moment from 'moment';
import {ListItem, Icon} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather';

class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        mood: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        clearVotes: PropTypes.number.isRequired,
        cloudsVotes: PropTypes.number.isRequired,
        drizzleVotes: PropTypes.number.isRequired,
        rainVotes: PropTypes.number.isRequired,
        thunderVotes: PropTypes.number.isRequired,
        snowVotes: PropTypes.number.isRequired,
        windyVotes: PropTypes.number.isRequired,
        tooltipOpen: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    render() {
        const {id, mood, text, ts, clearVotes, cloudsVotes, drizzleVotes, rainVotes, thunderVotes, snowVotes, windyVotes, tooltipOpen} = this.props;

        return (
            <ListItem onPress={this.handleTooltipToggle} style={StyleSheet.flatten(styles.listItem)}>
                <View style={styles.post}>
                    <View style={styles.mood}>{
                        getMoodIcon({group: mood, style: styles.moodIcon})
                    }</View>
                    <View style={styles.wrap}>
                        <Text style={styles.ts}>{moment(ts * 1000).calendar()}</Text>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
                <View style={styles.vote}>
                    {clearVotes > 0 && <View style={styles.voteResult}>
                        {getMoodIcon({group: 'Clear', style: styles.voteResultIcon})}
                        <Text style={styles.voteResultText}>{clearVotes}</Text>
                    </View>}
                    {cloudsVotes > 0 && <View style={styles.voteResult}>
                        {getMoodIcon({group: 'Clouds', style: styles.voteResultIcon})}
                        <Text style={styles.voteResultText}>{cloudsVotes}</Text>
                    </View>}
                    {drizzleVotes > 0 && <View style={styles.voteResult}>
                        {getMoodIcon({group: 'Drizzle', style: styles.voteResultIcon})}
                        <Text style={styles.voteResultText}>{drizzleVotes}</Text>
                    </View>}
                    {rainVotes > 0 && <View style={styles.voteResult}>
                        {getMoodIcon({group: 'Rain', style: styles.voteResultIcon})}
                        <Text style={styles.voteResultText}>{rainVotes}</Text>
                    </View>}
                    {thunderVotes > 0 && <View style={styles.voteResult}>
                        {getMoodIcon({group: 'Thunder', style: styles.voteResultIcon})}
                        <Text style={styles.voteResultText}>{thunderVotes}</Text>
                    </View>}
                    {snowVotes > 0 && <View style={styles.voteResult}>
                        {getMoodIcon({group: 'Snow', style: styles.voteResultIcon})}
                        <Text style={styles.voteResultText}>{snowVotes}</Text>
                    </View>}
                    {windyVotes > 0 && <View style={styles.voteResult}>
                        {getMoodIcon({group: 'Windy', style: styles.voteResultIcon})}
                        <Text style={styles.voteResultText}>{windyVotes}</Text>
                    </View>}
                    <Icon name='plus' style={StyleSheet.flatten(styles.votePlus)} />
                </View>
                {tooltipOpen &&
                    <View style={styles.tooltip} onPress={this.handleTooltipToggle}>
                        {getMoodIcon({
                            group: 'Clear',
                            onPress: () => this.handleVote('Clear'),
                            style: styles.tooltipIcon
                        })}
                        {getMoodIcon({
                            group: 'Clouds',
                            onPress: () => this.handleVote('Clouds'),
                            style: styles.tooltipIcon
                        })}
                        {getMoodIcon({
                            group: 'Drizzle',
                            onPress: () => this.handleVote('Drizzle'),
                            style: styles.tooltipIcon
                        })}
                        {getMoodIcon({
                            group: 'Rain',
                            onPress: () => this.handleVote('Rain'),
                            style: styles.tooltipIcon
                        })}
                        {getMoodIcon({
                            group: 'Thunder',
                            onPress: () => this.handleVote('Thunder'),
                            style: styles.tooltipIcon
                        })}
                        {getMoodIcon({
                            group: 'Snow',
                            onPress: () => this.handleVote('Snow'),
                            style: styles.tooltipIcon
                        })}
                        {getMoodIcon({
                            group: 'Windy',
                            onPress: () => this.handleVote('Windy'),
                            style: styles.tooltipIcon
                        })}
                    </View>
                }
            </ListItem>
        );
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

    handleVote(vote) {
        const {dispatch, id} = this.props;
        dispatch(createVote(id, vote)).then(() => {
            dispatch(setToast('Voted.'));
        });
        dispatch(setTooltipToggle(id, false));
    }
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 0
    },
    post: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    mood: {
        width: 48,
        marginLeft: 12,
        marginRight: 8,
        top: 12,
        alignItems: 'center'
    },
    moodIcon: {
        color: appColors.text,
        fontSize: 32
    },
    wrap: {
        flex: 1
    },
    ts: {
        color: appColors.textLight
    },
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4
    },
    vote: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    voteResult: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 4
    },
    voteResultIcon: {
        fontSize: 17,
        color: appColors.textLight,
        marginRight: 2
    },
    voteResultText: {
        fontSize: 17,
        color: appColors.textLight
    },
    votePlus: {
        fontSize: 24,
        top: 2,
        color: appColors.textLight
    },
    tooltip: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.mask
    },
    tooltipIcon: {
        fontSize: 24,
        color: appColors.primaryText,
        marginHorizontal: 12
    }
});

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false
}))(PostItem);
