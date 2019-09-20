import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
export const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";
import { dev, prod, url } from "../../../config/index";
import { LinearGradient } from "expo";

export class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  /**
  |--------------------------------------------------
  | Implementing User logout with redux
  |--------------------------------------------------
  */
  UserSignedOut = async () => {
    try {
      let value = await AsyncStorage.clear();
      console.log("Remove token", value);
      if (value === null || value === undefined) {
        // let value = await AsyncStorage.removeItem("token");
        // if (value === null) {
        // this.props.logMeIn();
        this.removeNotificationToken();
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server",
        `${error}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  /**
  |--------------------------------------------------
  | Implementation of retrieving User email 
  |--------------------------------------------------
  */
  componentDidMount() {
    this.getEmail();
  }

  getEmail = async () => {
    try {
      let value = await AsyncStorage.getItem("email");
      if (value !== null) {
        this.setState({ email: value });
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server",
        `${error}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  /**
|--------------------------------------------------
| Remove Notification Token
|--------------------------------------------------
*/
  removeNotificationToken = async () => {
    const [token, tac_token] = await Promise.all([
      AsyncStorage.getItem("token"),
      AsyncStorage.getItem("tac_token")
    ]);
    await AsyncStorage.clear();

    if (token === null) {
      this.props.logMeIn();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            height: height / 2
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "black" }}>
              We are sad to see you go
            </Text>
            <Text style={{ fontSize: 16, color: "black" }}>
              Are you sure you want to log out
            </Text>
          </View>
          <View>
            <View style={{ marginBottom: 15 }}>
              <LinearGradient
                colors={["#36D1DC", "#5B86E5"]}
                style={styles.buttonStyle}
              >
                <TouchableOpacity
                  onPress={() => this.UserSignedOut()}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.loginText}>Yes</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View>
              <LinearGradient
                colors={["#36D1DC", "#5B86E5"]}
                style={styles.buttonStyle}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Home")}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.loginText}>No</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logMeIn: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
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
