import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Platform,
  Image
} from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { LinearGradient } from 'expo-linear-gradient';
export const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";

const Main = (props) => {
  const [state, setState] = React.useState({
    compatible: false,
    fingerPrints: false,
    result: '',
    token: '',
  })

  React.useEffect(() => {
    checkDeviceForHardware();
    checkForFingerprints();
    getToken();
  }, [])

  getToken = async () => {
    try {
      let value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setState({ ...state, token: value });
        if (Platform.OS === "android") {
          showAndroidAlert();
        } else {
          scanFingerprint();
        }
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server",
        `Please check your internet or try again later`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  /**
  |--------------------------------------------------
  | Implementation of Phone Touch ID 
  |--------------------------------------------------
  */

  checkDeviceForHardware = async () => {
    try {
      let compatible = await LocalAuthentication.hasHardwareAsync();
      setState({ ...state, compatible });
    } catch (error) {
      console.log('error: ', error)
    }
  };

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setState({ ...state, fingerprints });
  };

  scanFingerprint = async () => {
    let result = await LocalAuthentication.authenticateAsync(
      "Scan your finger."
    );
    login(result.success);
  };

  login = response => {
    if (response === true) {
      props.logMeIn();
    }
  };

  /**
  |--------------------------------------------------
  | Android Touch ID Integration
  |--------------------------------------------------
  */
  showAndroidAlert = () => {
    Alert.alert(
      "Fingerprint Scan",
      "Place your finger over the touch sensor and press scan.",
      [
        {
          text: "Scan",
          onPress: () => {
            scanFingerprint();
          }
        },
        {
          text: "Cancel",
          onPress: () => props.navigation.navigate("Login"),
          style: "cancel"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#36D1DC", "#5B86E5"]}>
        <View style={styles.SignUpView}>
          <Image
            source={require("../../assets/VoletLogo.png")}
            resizeMode="contain"
            style={styles.Logo}
          />
          <Text
            style={{
              textTransform: "uppercase",
              color: "white",
              fontWeight: "bold"
            }}
          >
            merchant
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.buttonSignUp}>
        <LinearGradient
          colors={["#36D1DC", "#5B86E5"]}
          style={styles.buttonStyle}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => props.navigation.navigate("Signup")}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity
          onPress={
            state.token !== ""
            ? () => getToken()
            : () => props.navigation.navigate("Login")
          }
          style={styles.buttonStyle2}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    login: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logMeIn: () => dispatch({ type: "LOGIN" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  SignUpView: {
    height: height / 1.3,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  Logo: {
    // height: width / 1.3,
    width: width / 1.3
  },
  buttonSignUp: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    position: "absolute",
    bottom: 70
  },

  signupText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  },

  loginText: {
    color: "#5B86E5",
    fontWeight: "500",
    fontSize: 16
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.5,
    borderRadius: 10
  },
  buttonStyle2: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10
  }
});
