import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";

export default class ReviewRatings extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ alignSelf: "center", marginTop: 15 }}>
            {" "}
            Add business to view reviews and ratings{" "}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
