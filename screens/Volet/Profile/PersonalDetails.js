import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  AsyncStorage
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { ImagePicker, Permissions, LinearGradient } from "expo";
import api from "../../../api/index";

export class PersonalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      address: "",
      imageUri: "",
      user: {}
    };
  }

  /**
  |--------------------------------------------------
  | Implementing Permission Requst for Image picker
  |--------------------------------------------------
  */
  componentDidMount() {
    this.getPermissionAsync();
    this.onLoadGetNumber();
  }
  getPermissionAsync = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        //its granted.
      }
    }
  };

  onLoadGetNumber = async () => {
    const contact = await AsyncStorage.getItem("contact");
    this.setState({ contact });
    console.log("Personal Details contacts", contact);
  };

  /**
  |--------------------------------------------------
  | Image Picker Implementation
  |--------------------------------------------------
  */
  _onChoosePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    console.log("Image link", result); // this logs correctly
    if (!result.cancelled) {
      this.setState({ imageUri: result.base64 });

      // TODO: why isn't this showing up inside the Image on screen?
    }
  };

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  _onTakePic = async () => {
    const { cancelled, uri } = await Expo.ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
    }
  };

  inputCheck = () => {
    const { firstName, lastName, email, address, imageUri } = this.state;

    let formData = new FormData();
    formData.append("f_name", firstName);
    formData.append("l_name", lastName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("image", `data:image/jpg;base64,${imageUri}`);

    const body = {
      f_name: firstName,
      l_name: lastName,
      email,
      address,
      imageUri
    };

    api
      .editInfo(body)
      .then(data => {
        console.log("data: ", data);
        if (data.success === true) {
          this.setState({ user: data.user });
          alert("Successfully Updated");
        } else alert(data.message);
      })
      .catch(err => {
        console.log("Error for personal details:", err);

        Alert.alert(
          "Error connecting to server",
          `Please try again later`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  render() {
    return (
      <SafeAreaView styles={styles.container}>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.imageUri !== "" ? (
                <Thumbnail
                  large
                  style={{ backgroundColor: "grey" }}
                  source={{ uri: `${this.state.imageUri}` }}
                />
              ) : (
                <Thumbnail large style={{ backgroundColor: "grey" }} />
              )}

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: 30
                }}
                onPress={() => this._onChoosePic()}
              >
                <Icon
                  name="ios-add-circle-outline"
                  type="Ionicons"
                  style={{ fontSize: 17, color: "#5B86E5" }}
                />
                <Text
                  style={{ marginLeft: 10, fontSize: 14, fontWeight: "500" }}
                >
                  Upload Profile Images
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text style={{ color: "rgb(74, 74, 74)" }}>First Name</Text>
              <TextInput
                style={{
                  width: width / 1.2,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
                type="text"
                placeholder={this.state.user.f_name}
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Last Name</Text>
              <TextInput
                style={{
                  width: width / 1.2,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
                type="text"
                placeholder={this.state.user.l_name}
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Email</Text>
              <TextInput
                style={{
                  width: width / 1.2,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                type="text"
                placeholder={this.state.user.email}
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Mobile Number</Text>
              <TextInput
                style={{
                  width: width / 1.2,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                // onChangeText={contact => this.setState({ contact })}
                value={this.state.contact}
                type="number"
                placeholder={this.state.contact}
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30,
                marginBottom: 20
              }}
            >
              <Text>Address </Text>
              <TextInput
                style={{
                  width: width / 1.2,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
                type="text"
                placeholder={this.state.user.address}
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.buttonStyle}
            >
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.inputCheck()}
              >
                <Text style={styles.loginText}>Next</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PersonalDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
