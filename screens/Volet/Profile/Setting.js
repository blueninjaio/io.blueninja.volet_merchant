import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import ListButton from "../../../component/ListButton";
export const { width, height } = Dimensions.get("window");

export class Setting extends Component {
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
        title: "Language",
        desc: "English",
        extraProps: this.state.isTrue,
        icon: require("../../../assets/glasses.png"),
        navigation: this.props.navigation
      },
      {
        title: "Currency",
        desc: "English",
        extraProps: this.state.isTrue,
        icon: require("../../../assets/glasses.png"),
        navigation: this.props.navigation
      },
      {
        title: "About Volet",
        extraProps: this.state.isFalse,
        icon: require("../../../assets/glasses.png"),
        navigation: this.props.navigation,
        page: "AboutVolet"
      },
      {
        title: "Security",
        extraProps: this.state.isFalse,
        icon: require("../../../assets/glasses.png"),
        navigation: this.props.navigation,
        page: "Security"
      },
      {
        title: "Logout",
        extraProps: this.state.isFalse,
        icon: require("../../../assets/glasses.png"),
        navigation: this.props.navigation,
        page: "Logout"
      }
    ];
    return (
      <View style={styles.container}>
        {list.map((x, i) => (
          <ListButton
            key={i}
            title={x.title}
            desc={x.desc}
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

export default Setting;
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
