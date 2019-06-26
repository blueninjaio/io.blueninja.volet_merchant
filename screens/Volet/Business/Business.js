import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Icon } from "native-base";
export const { width, height } = Dimensions.get("window");

export class Business extends Component {
  render() {
    return (
      <View styles={styles.container}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 20
          }}
          onPress={() => this.props.navigation.navigate("SellerAcc")}
        >
          <Icon name="ios-add-circle-outline" type="Ionicons" />
          <Text>Add Business</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Business;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});
