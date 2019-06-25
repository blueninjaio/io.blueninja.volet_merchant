import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

export class Statistic extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Coming Soon </Text>
            </View>
        )
    }
}

export default Statistic
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "#979797",
        fontSize: 20
    }
});