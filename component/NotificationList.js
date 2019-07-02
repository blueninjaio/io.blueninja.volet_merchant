import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
export const { width, height } = Dimensions.get("window");

export class NotificationList extends Component {
  render() {
    return (
      <View style={styles.listItemButtonSwitch}>
        <View style={styles.show}>
          <Image
            //   source={{uri: this.props.icon}}
            source={this.props.icon}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.listItemText}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

export default NotificationList;
const styles = StyleSheet.create({
  listItemButtonSwitch: {
    padding: 10,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 15,
    backgroundColor: "pink"

    // marginLeft: 5,
    // marginRight: 5,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: "#ddd",
    // shadowColor: "#000",
    // shadowOffset: { width: 3, height: 5 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 1
  },
  show: {
    justifyContent: "center",
    width: width / 2.2,
    alignItems: "center",
    flexDirection: "row",
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 20
  }
});
