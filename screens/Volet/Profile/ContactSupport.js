import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export class ContactSupport extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: width / 1.2, paddingTop: 30 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.Thumbnail} />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text style={{ fontSize: 18, color: "rgb(57,57,56)" }}>
              Support Contact Details
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingBottom: 20,
                paddingTop: 10
              }}
            >
              <Text style={{ color: "rgb(77,150,224)", marginBottom: 15 }}>
                By Phone
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 20
                }}
              >
                <Text>Customer Service: </Text>
                <Text>International: </Text>
                <Text>9am - 12am(Malaysian Time) </Text>
                <Text>Monday - Sunday</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingBottom: 20
              }}
            >
              <Text style={{ color: "rgb(77,150,224)", marginBottom: 15 }}>
                By Email
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 20
                }}
              >
                <Text>help@volet.com</Text>
                <Text>9am - 12am(Malaysian Time) </Text>
                <Text>Monday - Sunday</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ContactSupport;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  Thumbnail: {
    backgroundColor: "grey",
    height: height / 3.5,
    width: width / 1.2
  }
});
