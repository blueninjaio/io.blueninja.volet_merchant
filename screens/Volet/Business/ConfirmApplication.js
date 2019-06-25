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
const url = "http://165.22.245.137";

export class ConfirmApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.navigation.state.params.firstName,
      lastName: this.props.navigation.state.params.lastName,
      email: this.props.navigation.state.params.email,
      contact: this.props.navigation.state.params.contact,
      id: this.props.navigation.state.params.id,
      icImage: this.props.navigation.state.params.icImage,
      companyName: this.props.navigation.state.params.companyName,
      brandingName: this.props.navigation.state.params.brandingName,
      businessType: this.props.navigation.state.params.businessType,
      busniessCategory: this.props.navigation.state.params.busniessCategory,
      businessEmail: this.props.navigation.state.params.businessEmail,
      businessContact: this.props.navigation.state.params.businessContact,
      busniessRegisterNum: this.props.navigation.state.params
        .busniessRegisterNum,
      tax: this.props.navigation.state.params.tax,
      businessWebsite: this.props.navigation.state.params.businessWebsite,
      paymentMethod: this.props.navigation.state.params.paymentMethod,
      bank: this.props.navigation.state.params.bank,
      currency: this.props.navigation.state.params.currency,
      branch: this.props.navigation.state.params.branch,
      bankAccNum: this.props.navigation.state.params.bankAccNum,
      billingAddress: this.props.navigation.state.params.billingAddress,
      postalCode: this.props.navigation.state.params.postalCode,
      states: this.props.navigation.state.params.states,
      country: this.props.navigation.state.params.country,
      legalName: this.props.navigation.state.params.legalName
    };
  }

  inputCheck = () => {
    console.log("first name: ", this.props.navigation.state.params.firstName);
    console.log("last name: ", this.props.navigation.state.params.lastName);

    fetch(`${url}/api/business/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        f_name: this.props.navigation.state.params.firstName,
        l_name: this.props.navigation.state.params.lastName,
        email: this.props.navigation.state.params.email,
        contact: this.props.navigation.state.params.contact,
        identification: this.props.navigation.state.params.id,
        // identification: this.props.navigation.state.params.icImage,
        identification_image: null,
        company_name: this.props.navigation.state.params.companyName,
        branding: this.props.navigation.state.params.brandingName,
        type_of_business: this.props.navigation.state.params.businessType,
        busniess_category: this.props.navigation.state.params.busniessCategory,
        business_email: this.props.navigation.state.params.businessEmail,
        business_contact: this.props.navigation.state.params.businessContact,
        busniess_num: this.props.navigation.state.params.busniessRegisterNum,
        tax_number: this.props.navigation.state.params.tax,
        // businessWebsite: this.props.navigation.state.params.businessWebsite,
        payment_method: this.props.navigation.state.params.paymentMethod,
        bank: this.props.navigation.state.params.bank,
        currency: this.props.navigation.state.params.currency,
        branch: this.props.navigation.state.params.branch,
        account_num: this.props.navigation.state.params.bankAccNum,
        billing_address: this.props.navigation.state.params.billingAddress,
        postalcode: this.props.navigation.state.params.postalCode,
        state: this.props.navigation.state.params.states,
        country: this.props.navigation.state.params.country,
        legal_name: this.props.navigation.state.params.legalName
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Add Business Details :", data);
        if (data.success === true) {
          this.props.navigation.navigate("ValidateApp");
        } else {
          Alert.alert(
            "Error",
            `${data.message}`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server",
          `Please check your internet or try again later`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  render() {
    return (
      <View styles={styles.container}>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "space-around",
                height: height / 8,
                width: width / 1.2
              }}
            >
              <Text>Confirm Application </Text>
              <Text>
                Please confirm all the details you entered below is correct and
                click confirm
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: width / 1.2
              }}
            >
              <Text>Seller Name</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SellerAcc")}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text>{this.props.navigation.state.params.firstName}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Email</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Mobile Number</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.contact}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>IC / Passport Number</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.id}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Email</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.email}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: width / 1.2
              }}
            >
              <Text>Legal / Company Name</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("BusinessInfo")}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text>{this.props.navigation.state.params.legalName}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Branding Name</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.brandingName}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Type Of Business</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.businessType}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Business Category</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.busniessCategory}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Business Email</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.businessEmail}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Busniess Phone Number</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.businessContact}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Business Registration Number</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.busniessRegisterNum}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>GST / SST Registration Number</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.tax}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Business Website</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.businessWebsite}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Legal Representative Name</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.legalName}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: width / 1.2
              }}
            >
              <Text>Billing Address</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("BillingInfo")}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text>{this.props.navigation.state.params.billingAddress}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Payment Method</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.paymentMethod}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Bank</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.bank}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Branch</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.branch}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Bank Account Number</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.bankAccNum}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20
            }}
          >
            <View style={{ width: width / 1.2 }}>
              <Text>Currency</Text>
              <Text style={{ fontWeight: "bold" }}>
                {this.props.navigation.state.params.currency}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 30
            }}
          >
            <TouchableOpacity onPress={() => this.inputCheck()}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ConfirmApplication;
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
