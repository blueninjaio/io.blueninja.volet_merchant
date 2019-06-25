import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Icon,
  Title,
  Subtitle,
  Item,
  InputGroup,
  Input,
  Badge,
  Header,
  Left,
  Body,
  Right,
  Accordion,
  Tab,
  Tabs,
  Card,
  CardItem,
  Thumbnail,
  Form,
  Label,
  Switch,
  Textarea,
  CheckBox
} from "native-base";
import { LinearGradient } from "expo";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");

export class AddSellerAcc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      id: "",
      icImage: ""
    };
  }

  inputCheck = () => {
    this.props.navigation.navigate("BusinessInfo", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      contact: this.state.contact,
      id: this.state.id,
      icImage: this.state.icImage
    });
  };

  render() {
    return (
      <View styles={styles.container}>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 20
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "space-around",
                height: height / 8
                // backgroundColor: "grey"
              }}
            >
              <Text>Create Seller Account</Text>
              <Text>
                Create a seller account to start your business in Volet
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>First Name</Text>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
                type="text"
                placeholder="First name"
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
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
                type="text"
                placeholder="Last name"
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
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                type="text"
                placeholder="Email"
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
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={contact => this.setState({ contact })}
                value={this.state.contact}
                type="number"
                placeholder="First name"
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
              <Text>IC / Passport Number</Text>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={id => this.setState({ id })}
                value={this.state.id}
                type="text"
                placeholder="Passport Number"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <TouchableOpacity
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                paddingTop: 30
              }}
            >
              <Icon name="ios-add-circle-outline" type="Ionicons" />
              <Text>Upload IC / Passport Images</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
              onPress={() => this.inputCheck()}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AddSellerAcc;
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
  }
});
