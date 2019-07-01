import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
export const { width, height } = Dimensions.get("window");
import { Dropdown } from "react-native-material-dropdown";

export class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayList: ["krustyList", "Burgerking", "MCD"]
    };
  }

  /**
  |--------------------------------------------------
  | Implementing Dropdown list
  |--------------------------------------------------
  */
  createData() {
    return this.state.arrayList.map(el => ({ value: el }));
  }
  render() {
    const dropDownValue = this.createData();

    return (
      <View style={styles.container}>
        <Dropdown
          data={dropDownValue}
          label="Select"
          style={{
            width: width / 1.2
          }}
          onChangeText={value => {
            this.setState({ country: value });
          }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              width: width / 1.1,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                height: height / 5,
                justifyContent: "space-between",
                padding: 10,
                alignItems: "flex-start",
                backgroundColor: "brown",
                width: width / 2.5
              }}
            >
              <View
                style={{
                  paddingBottom: 30,
                  backgroundColor: "pink",
                  alignItems: "flex-start"
                }}
              >
                <Text>Todays Earnings</Text>
              </View>
              <View
                style={{ backgroundColor: "yellow", alignItems: "flex-start" }}
              >
                <Text>MYR</Text>
                <Text>12,321</Text>
              </View>
            </View>
            <View
              style={{
                height: height / 5,
                justifyContent: "space-between",
                padding: 10,
                alignItems: "flex-start",
                backgroundColor: "brown",
                width: width / 2.5
              }}
            >
              <View
                style={{
                  paddingBottom: 30,
                  backgroundColor: "pink",
                  alignItems: "flex-start"
                }}
              >
                <Text>This Weeks Earnings</Text>
              </View>
              <View
                style={{ backgroundColor: "yellow", alignItems: "flex-start" }}
              >
                <Text>MYR</Text>
                <Text>12,321</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: width / 1.1,
              padding: 10,
              backgroundColor: "pink",
              marginTop: 20
            }}
          >
            <View style={{ justifyContent: "flex-start", width: width / 3 }}>
              <Text>Average Daily Earnings</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
              <Text>MYR</Text>
              <Text>10,524</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: width / 1.1,
              padding: 10,
              backgroundColor: "pink",
              marginTop: 20,
              marginBottom: 20
            }}
          >
            <View style={{ justifyContent: "flex-start", width: width / 3 }}>
              <Text>Average Daily Customers</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
              <Text>2123</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              width: width / 1.1,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                height: height / 5,
                justifyContent: "space-between",
                padding: 10,
                alignItems: "flex-start",
                backgroundColor: "brown",
                width: width / 2.5
              }}
            >
              <View
                style={{
                  paddingBottom: 30,
                  backgroundColor: "pink",
                  alignItems: "flex-start",
                  width: width / 3
                }}
              >
                <Text>Todays Earnings</Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: "yellow", alignItems: "flex-start" }}
              >
                <Text>View</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: height / 5,
                justifyContent: "space-between",
                padding: 10,
                alignItems: "flex-start",
                backgroundColor: "brown",
                width: width / 2.5
              }}
            >
              <View
                style={{
                  paddingBottom: 30,
                  backgroundColor: "pink",
                  alignItems: "flex-start",
                  width: width / 3
                }}
              >
                <Text>This Weeks Customer</Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: "yellow", alignItems: "flex-start" }}
              >
                <Text>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Statistic;
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
