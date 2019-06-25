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

export class Business extends Component {
    render() {
        return (
            <View styles={styles.container}>
                <TouchableOpacity style={{alignItems:"center", justifyContent:"flex-start", paddingTop: 20}} onPress={() => this.props.navigation.navigate("SellerAcc")}>
                    <Icon name="ios-add-circle-outline" type="Ionicons"/>
                    <Text>Add Business</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Business

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    text:{
        color: "#979797",
        fontSize:20
    }
    
  });