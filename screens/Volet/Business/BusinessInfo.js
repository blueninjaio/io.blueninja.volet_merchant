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

export class BusinessInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      brandingName: "",
      businessType: "",
      busniessCategory: "",
      businessEmail: "",
      businessContact: "",
      busniessRegisterNum: "",
      tax: "",
      businessWebsite: "",
      legalName: ""
    };
  }


  /**
  |--------------------------------------------------
  | Input check! NOTES-> TO be altered soon
  |--------------------------------------------------
  */
  inputCheck = () => {
    this.props.navigation.navigate("BillingInfo", {
      companyName: this.state.companyName,
      brandingName: this.state.brandingName,
      businessType: this.state.businessType,
      busniessCategory: this.state.busniessCategory,
      businessEmail: this.state.businessEmail,
      businessContact: this.state.businessContact,
      busniessRegisterNum: this.state.busniessRegisterNum,
      tax: this.state.tax,
      businessWebsite: this.state.businessWebsite,
      legalName: this.state.legalName,
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
              <Text>Business Information</Text>
              <Text>
                Tell us a little bit about the busniess that you are going to
                start on Volet
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Legal / Company Name </Text>
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
                onChangeText={companyName => this.setState({ companyName })}
                value={this.state.companyName}
                type="text"
                placeholder="Company name"
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
              <Text>Branding Name</Text>
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
                onChangeText={brandingName => this.setState({ brandingName })}
                value={this.state.brandingName}
                type="text"
                placeholder="Branding Name"
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
              <Text>Type of Business</Text>
              <Picker
                selectedValue={this.state.businessType}
                style={{
                  height: 170,
                  width: width / 1.5,
                  backgroundColor: "grey"
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ businessType: itemValue })
                }
              >
                <Picker.Item label="Salon" value="salon" />
                <Picker.Item label="Doorstep" value="Doorstep" />
                <Picker.Item label="Shop" value="shop" />
              </Picker>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Business Category</Text>
              {/* <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 20,
                  backgroundColor: "white"
                }}
              > */}
              <Picker
                selectedValue={this.state.busniessCategory}
                style={{
                  height: 170,
                  width: width / 1.5,
                  backgroundColor: "grey"
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ busniessCategory: itemValue })
                }
              >
                <Picker.Item label="Salon" value="salon" />
                <Picker.Item label="Doorstep" value="Doorstep" />
                <Picker.Item label="Shop" value="shop" />
              </Picker>
              {/* </View> */}
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Business Email</Text>
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
                onChangeText={businessEmail => this.setState({ businessEmail })}
                value={this.state.businessEmail}
                type="text"
                placeholder="Business Email "
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
              <Text>Business Phone Number</Text>
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
                onChangeText={businessContact => this.setState({ businessContact })}
                value={this.state.businessContact}
                type="text"
                placeholder="Business Email "
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
              <Text>Business Registration Number</Text>
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
                onChangeText={busniessRegisterNum =>
                  this.setState({ busniessRegisterNum })
                }
                value={this.state.busniessRegisterNum}
                type="number"
                placeholder="Business Registration Number"
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
              <Text>GST / SST Registration Number</Text>
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
                onChangeText={tax => this.setState({ tax })}
                value={this.state.tax}
                type="text"
                placeholder="GST / SST Registration Number"
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
              <Text>Business Website</Text>
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
                onChangeText={businessWebsite => this.setState({ businessWebsite })}
                value={this.state.businessWebsite}
                type="text"
                placeholder="Business Website"
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
              <Text>Legal Representative Name</Text>
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
                onChangeText={legalName => this.setState({ legalName })}
                value={this.state.legalName}
                type="text"
                placeholder="Legal Representative Name"
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

export default BusinessInfo;
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
