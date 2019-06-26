import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Picker
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");

export class BillingInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentMethod: "",
      bank: "",
      currency: "",
      branch: "",
      bankAccNum: "",
      billingAddress: "",
      postalCode: "",
      states: "",
      country: ""
    };
  }


  /**
  |--------------------------------------------------
  | Input check! NOTES-> TO be altered soon
  |--------------------------------------------------
  */
  inputCheck = () => {
    this.props.navigation.navigate("ConfirmApp", {
      paymentMethod: this.state.paymentMethod,
      bank: this.state.bank,
      currency: this.state.currency,
      branch: this.state.branch,
      bankAccNum: this.state.bankAccNum,
      billingAddress: this.state.billingAddress,
      postalCode: this.state.postalCode,
      states: this.state.states,
      country: this.state.country,
      companyName: this.props.navigation.state.params.companyName,
      brandingName: this.props.navigation.state.params.brandingName,
      businessType: this.props.navigation.state.params.businessType,
      busniessCategory: this.props.navigation.state.params.busniessCategory,
      businessEmail: this.props.navigation.state.params.businessEmail,
      businessContact: this.props.navigation.state.params.businessContact,
      busniessRegisterNum: this.props.navigation.state.params.busniessRegisterNum,
      tax: this.props.navigation.state.params.tax,
      businessWebsite: this.props.navigation.state.params.businessWebsite,
      legalName: this.props.navigation.state.params.legalName,
      firstName: this.props.navigation.state.params.firstName,
      lastName: this.props.navigation.state.params.lastName,
      email: this.props.navigation.state.params.email,
      contact: this.props.navigation.state.params.contact,
      id: this.props.navigation.state.params.id,
      icImage: this.props.navigation.state.params.icImage
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
              <Text>Billing Info</Text>
              <Text>
                Tell us your preferred billing info for future billing
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Payment Method</Text>
              <Picker
                selectedValue={this.state.paymentMethod}
                style={{
                  height: 170,
                  width: width / 1.5,
                  backgroundColor: "grey"
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ paymentMethod: itemValue })
                }
              >
                <Picker.Item label="AUTOPLAY" value="autopay" />
                <Picker.Item label="PayPal" value="paypal" />
                <Picker.Item label="Visa" value="visa" />
              </Picker>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Bank</Text>
              <Picker
                selectedValue={this.state.bank}
                style={{
                  height: 170,
                  width: width / 1.5,
                  backgroundColor: "grey"
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ bank: itemValue })
                }
              >
                <Picker.Item label="CIMB" value="cimb" />
                <Picker.Item label="Maybank" value="may" />
                <Picker.Item label="RHB" value="rhb" />
              </Picker>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Branch</Text>
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
                onChangeText={branch => this.setState({ branch })}
                value={this.state.branch}
                type="text"
                placeholder="Branch"
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
              <Text>Bank Account Number</Text>
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
                onChangeText={bankAccNum => this.setState({ bankAccNum })}
                value={this.state.bankAccNum}
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
              <Text>Currency</Text>
              <Picker
                selectedValue={this.state.currency}
                style={{
                  height: 170,
                  width: width / 1.5,
                  backgroundColor: "grey"
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ currency: itemValue })
                }
              >
                <Picker.Item label="MYR" value="rm" />
                <Picker.Item label="$" value="dollor" />
                <Picker.Item label="Baht" value="baht" />
              </Picker>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Billing Address</Text>
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
                onChangeText={billingAddress =>
                  this.setState({ billingAddress })
                }
                value={this.state.billingAddress}
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
              <Text>Postal Code</Text>
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
                onChangeText={postalCode => this.setState({ postalCode })}
                value={this.state.postalCode}
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
              <Text>State</Text>
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
                onChangeText={states => this.setState({ states })}
                value={this.state.states}
                type="text"
                placeholder="Passport Number"
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
              <Text>Country</Text>
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
                onChangeText={country => this.setState({ country })}
                value={this.state.country}
                type="text"
                placeholder="Passport Number"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>

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

export default BillingInfo;
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
