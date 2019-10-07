import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo";
import { TextInput } from "react-native-gesture-handler";
import api from "../../api/index";

const { width, height } = Dimensions.get("window");

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: ""
    };
  }

  onActionSendTAC = async () => {
    api
      .sendTAC(`+60${this.state.number}`)
      .then(data => {
        if (data.success) {
          this.props.navigation.navigate("TAC", {
            contact: "+60" + this.state.number,
            requestMethod: "SignUp"
          });

          console.log("Sign Up Contact: ", contact);
        }

        console.log(data);
      })
      .catch(err => console.log(err));
  };

  onActionSaveNumber = async text => {
    this.setState({
      number: text.replace(/[^0-9]/g, "")
    });
    await AsyncStorage.setItem("contact", `+60${this.state.number}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.Logo}>
              <Image
                source={require("../../assets/voletBlueLogo.png")}
                resizeMode="contain"
                style={{ flex: 1, width: width * 0.5 }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "80%"
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
                Whats is your mobile number?
              </Text>
              <Text
                style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
              >
                We will send you a verification code
              </Text>
            </View>

            <View
              style={{
                paddingTop: 20,
                marginBottom: height * 0.112,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "80%"
              }}
            >
              <Text style={{ fontSize: width * 0.04, marginRight: 10 }}>
                +60
              </Text>
              <TextInput
                style={{
                  width: "80%",
                  marginBottom: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5"
                }}
                onChangeText={text => this.onActionSaveNumber(text)}
                value={this.state.number}
                type="number"
                placeholder="Your mobile number"
                placeholderTextColor="rgb(215,215,215)"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 40,
              width: width,
              alignItems: "center"
            }}
          >
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.linearStyle}
            >
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.onActionSendTAC}
              >
                <Text style={styles.loginText}>Send Code</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  SignUpView: {
    height: height / 1.1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  Logo: {
    height: height * 0.2,
    width: width * 0.5,
    alignItems: "center"
  },
  buttonSignUp: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10
  },

  linearStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10,
    marginBottom: height * 0.042
  },
  buttonStyle2: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "grey",
    marginTop: 20
  },
  Thumbnail: {
    backgroundColor: "grey"
  }
});
