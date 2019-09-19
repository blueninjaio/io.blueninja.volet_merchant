import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import ListButton from "../../../component/ListButton";
export const { width, height } = Dimensions.get("window");

export class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrue: true,
      isFalse: false
    };
  }

  render() {
    const list = [
      {
        title: "Reset Password",
        extraProps: this.state.isFalse,
        icon: require("../../../assets/glasses.png"),
        navigation: this.props.navigation,
        page: "ResetPassword"
      }
    ];
    return (
      <View style={styles.container}>
        {list.map((x, i) => (
          <ListButton
            key={i}
            title={x.title}
            extraProps={x.extraProps}
            icon={x.icon}
            navigation={x.navigation}
            page={x.page}
          />
        ))}
      </View>
    );
  }
}

export default Security;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});
