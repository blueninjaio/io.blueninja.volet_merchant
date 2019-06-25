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
  TouchableOpacity,
  Picker
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

export class ValidateApplication extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            height: height / 1.1
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Icon name="checkcircleo" type="AntDesign" />
            <Text style={{ fontWeight: "bold" }}>
              Your account is being set up, our team is validating the details
              and we will contact you shortly!
            </Text>
          </View>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ValidateApplication;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //   justifyContent:"center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});
