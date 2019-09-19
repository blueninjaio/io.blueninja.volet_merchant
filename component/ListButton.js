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

export class ListButton extends Component {
  render() {
    return (
      <View style={styles.shadowSet}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(this.props.page)}
          style={styles.listItemButtonSwitch}
        >
          <View style={styles.show}>
            <Image
              source={this.props.icon}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.listItemText}>{this.props.title}</Text>
          </View>
          {this.props.extraProps === true ? (
            <View>
              <Text style={styles.listItemText}>{this.props.desc}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

export default ListButton;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  listItemButtonSwitch: {
    padding: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  show: {
    justifyContent: "flex-start",
    width: width / 1.8,
    alignItems: "center",
    flexDirection: "row"
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 20
  },
  shadowSet: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: "#dbdbdb",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15
  }
});
