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

export class ValidateApplication extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            height: height / 1.1
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Icon name="checkcircleo" type="AntDesign" />
            <Text style={{ fontWeight: "bold" }}>
              Your account is being set up, our team is validating the details
              and we will contact you shortly!
            </Text>
          </View>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ValidateApplication;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //   justifyContent:"center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});
