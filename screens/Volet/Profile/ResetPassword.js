import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo";

export const { width, height } = Dimensions.get("window");
export class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: "",
      token: "",
      oldPwd: ""
    };
  }

  componentDidMount() {
    this.onLoad();
  }

  onLoad = async () => {
    const [contact, token] = await Promise.all([
      AsyncStorage.getItem("contact"),
      AsyncStorage.getItem("token")
    ]);

    this.setState({ contact, token });
  };

  onActionResetPassword = () => {
    const oldPwd = this.state.oldPwd;
    this.setState({ oldPwd });

    if (oldPwd !== "") {
      this.props.navigation.navigate("FPTac", {
        contact: this.state.contact,
        token: this.state.token,
        oldPwd: this.state.oldPwd
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 20,
              width: width / 1.3
            }}
          >
            <Text
              style={{
                padding: 10,
                color: "#5B86E5",
                fontSize: width * 0.06,
                fontWeight: "500"
              }}
            >
              Reset Password
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Enter your existing password to receive your TAC code to reset
              your password
            </Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 60,
                width: width / 1.3
              }}
            >
              <Text style={{ color: "rgb(74, 74, 74)" }}>Password</Text>
              <TextInput
                style={{
                  width: width / 1.3,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                onChangeText={oldPwd => this.setState({ oldPwd })}
                value={this.state.oldPwd}
                type="text"
                placeholder="Password"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 20 }}>
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.onActionResetPassword}
            >
              <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default ForgetPassword;
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
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  }
});
