import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Icon, Header, Left, Body, Title, Right } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { Dropdown } from "react-native-material-dropdown";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../../config";
import { ImagePicker, Permissions } from "expo";

export class AddSellerAcc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      id: "",
      icImage: "",
      companyName: "",
      brandingName: "",
      businessType: "",
      busniessCategory: "",
      businessEmail: "",
      businessContact: "",
      busniessRegisterNum: "",
      tax: "",
      businessWebsite: "",
      legalName: "",
      paymentMethod: "",
      bank: "",
      currency: "",
      branch: "",
      bankAccNum: "",
      billingAddress: "",
      postalCode: "",
      states: "",
      country: "",
      bankList: ["Maybank", "CIMB", "RHB"],
      currencyList: ["MYR"],
      paymentList: ["Autopay", "PayPal", "Credit"],
      businessList: [],
      ischangeScreen: "AddSellerAcc"
    };
  }

  componentDidMount = () => {
    this.getBusiness();
    this.getPermissionAsync();
    this.getUserInfo();
  };

  /**
  |--------------------------------------------------
  | Implementation of retrieving user info from AsyncStorage
  |--------------------------------------------------
  */

  getUserInfo = async () => {
    try {
      let value = await AsyncStorage.getItem("ID");
      let firstName = await AsyncStorage.getItem("firstname");
      let lastName = await AsyncStorage.getItem("lastname");
      let email = await AsyncStorage.getItem("email");
      let contact = await AsyncStorage.getItem("contact");
      // console.log(firstName);
      // console.log(lastName);

      if (value !== null) {
        this.setState({ _id: value });
        this.setState({ firstName });
        this.setState({ lastName });
        this.setState({ email });
        this.setState({ contact });
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
  | Input check! NOTES-> TO be altered soon
  |--------------------------------------------------
  */
  inputCheck = () => {
    this.props.navigation.navigate("BusinessInfo", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      contact: this.state.contact,
      id: this.state.id,
      icImage: this.state.icImage
      // businessList: this.props.navigation.state.params.businessList
    });
  };

  /**
  |--------------------------------------------------
  | Implementing Permission Requst for Image picker
  |--------------------------------------------------
  */
  getPermissionAsync = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        //its granted.
      }
    }
  };

  /**
|--------------------------------------------------
| Image Picker Implementation
|--------------------------------------------------
*/
  _onChoosePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log("Image link", result); // this logs correctly
    if (!result.cancelled) {
      this.setState({ icImage: result.uri });
      // TODO: why isn't this showing up inside the Image on screen?
    }
  };

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  _onTakePic = async () => {
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
    }
  };

  /**
  |--------------------------------------------------
  | Implementation of get Business Categories
  |--------------------------------------------------
  */
  getBusiness = () => {
    let cateArray = [];
    fetch(`${url}/api/category/`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.categories.length >= 1) {
          data.categories.map(x => cateArray.push(x.title));
          this.setState({ businessList: cateArray });
          // console.log("catearray", cateArray);
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | Add Business Implementation
  |--------------------------------------------------
  */

  addBusiness = () => {
    fetch(`${url}/api/business/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        f_name: this.state.firstName,
        l_name: this.state.lastName,
        email: this.state.email,
        contact: this.state.contact,
        identification: this.state.id,
        identification_image: this.state.icImage,
        // identification_image: null,
        company_name: this.state.companyName,
        branding: this.state.brandingName,
        type_of_business: this.state.businessType,
        busniess_category: this.state.busniessCategory,
        business_email: this.state.businessEmail,
        business_contact: this.state.businessContact,
        busniess_number: this.state.busniessRegisterNum,
        tax_number: this.state.tax,
        // businessWebsite: this.props.navigation.state.params.businessWebsite,
        payment_method: this.state.paymentMethod,
        bank: this.state.bank,
        currency: this.state.currency,
        branch: this.state.branch,
        account_num: this.state.bankAccNum,
        billing_address: this.state.billingAddress,
        postalcode: this.state.postalCode,
        state: this.state.states,
        country: this.state.country,
        legal_name: this.state.legalName
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

  /**
|--------------------------------------------------
| Implementing Dropdown list
|--------------------------------------------------
*/
  createData() {
    return this.state.businessList.map(el => ({
      value: el
    }));
  }
  createData1() {
    return this.state.currencyList.map(el => ({ value: el }));
  }

  createData2() {
    return this.state.bankList.map(el => ({ value: el }));
  }

  createData3() {
    return this.state.paymentList.map(el => ({ value: el }));
  }

  onClickChangeScreen = screenName => {
    // if (screenName === "BusinessInfo") {
    //   if (this.state.id === "") {
    //     alert("Invalid Passport number");
    //   } else if (this.state.icImage === "") {
    //     alert("Invalid Passport image");
    //   } else {
    //     this.setState({ ischangeScreen: screenName });
    //   }
    // } else if (screenName === "BillingInfo") {
    //   this.setState({ ischangeScreen: screenName });
    // } else if (screenName === "ConfirmApplication") {
    //   this.setState({ ischangeScreen: screenName });
    // }
    this.setState({ ischangeScreen: screenName });
  };

  render() {
    const dropDownValue = this.createData();
    const currencyList = this.createData1();
    const bankList = this.createData2();
    const paymentList = this.createData3();
    return (
      <View styles={styles.container}>
        <Header>
          <Left>
            {this.state.ischangeScreen === "AddSellerAcc" ? (
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="ios-arrow-back" type="Ionicons" />
              </TouchableOpacity>
            ) : this.state.ischangeScreen === "BusinessInfo" ? (
              <TouchableOpacity
                onPress={() => this.onClickChangeScreen("AddSellerAcc")}
              >
                <Icon name="ios-arrow-back" type="Ionicons" />
              </TouchableOpacity>
            ) : this.state.ischangeScreen === "BillingInfo" ? (
              <TouchableOpacity
                onPress={() => this.onClickChangeScreen("BusinessInfo")}
              >
                <Icon name="ios-arrow-back" type="Ionicons" />
              </TouchableOpacity>
            ) : this.state.ischangeScreen === "ConfirmApplication" ? (
              <TouchableOpacity
                onPress={() => this.onClickChangeScreen("BillingInfo")}
              >
                <Icon name="ios-arrow-back" type="Ionicons" />
              </TouchableOpacity>
            ) : null}
          </Left>
          <Body>
            <Title>Business</Title>
          </Body>
          <Right>
            <TouchableOpacity>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <ScrollView>
          {this.state.ischangeScreen === "AddSellerAcc" ? (
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
                  value={this.state.contact}
                  type="number"
                  placeholder="Mobile Number"
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
                onPress={() => this._onChoosePic()}
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
              <View style={{ height: height / 3 }}>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingTop: 30,
                    marginBottom: 40
                  }}
                  onPress={() => this.onClickChangeScreen("BusinessInfo")}
                >
                  <Text>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : this.state.ischangeScreen === "BusinessInfo" ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 15,
                paddingRight: 20
              }}
            >
              <View>
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
                    Tell us a little bit about the busniess that you are going
                    to start on Volet
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
                    onChangeText={brandingName =>
                      this.setState({ brandingName })
                    }
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
                  <Dropdown
                    data={dropDownValue}
                    label="Select"
                    containerStyle={{
                      // height: 170,
                      width: width / 1.2
                    }}
                    dropdownMargins={{ min: 8, max: 16 }}
                    onChangeText={value => {
                      this.setState({ businessType: value });
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingTop: 30
                  }}
                >
                  <Text>Business Category</Text>
                  <Dropdown
                    data={dropDownValue}
                    label="Select"
                    containerStyle={{
                      // height: 170,
                      width: width / 1.2
                    }}
                    dropdownMargins={{ min: 8, max: 16 }}
                    onChangeText={value => {
                      this.setState({ busniessCategory: value });
                    }}
                  />
                </View>
              </View>
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
                    onChangeText={businessEmail =>
                      this.setState({ businessEmail })
                    }
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
                    onChangeText={businessContact =>
                      this.setState({ businessContact })
                    }
                    value={this.state.businessContact}
                    type="text"
                    placeholder="Business Contact "
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
                    onChangeText={businessWebsite =>
                      this.setState({ businessWebsite })
                    }
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
                <View style={{ height: height / 3 }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                      paddingTop: 30,
                      marginBottom: 40
                    }}
                    onPress={() => this.onClickChangeScreen("BillingInfo")}
                  >
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : this.state.ischangeScreen === "BillingInfo" ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 15,
                paddingRight: 20
              }}
            >
              <View>
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
                  <Dropdown
                    data={paymentList}
                    label="Select"
                    containerStyle={{
                      // height: 170,
                      width: width / 1.2
                    }}
                    dropdownMargins={{ min: 8, max: 16 }}
                    onChangeText={value => {
                      this.setState({ paymentMethod: value });
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingTop: 30
                  }}
                >
                  <Text>Bank</Text>
                  <Dropdown
                    data={bankList}
                    label="Select"
                    containerStyle={{
                      // height: 170,
                      width: width / 1.2
                    }}
                    dropdownMargins={{ min: 8, max: 16 }}
                    onChangeText={value => {
                      this.setState({ bank: value });
                    }}
                  />
                </View>
              </View>

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
                    placeholder="Bank Account Number"
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
                  <Dropdown
                    data={currencyList}
                    label="Select"
                    containerStyle={{
                      // height: 170,
                      width: width / 1.2
                    }}
                    dropdownMargins={{ min: 8, max: 16 }}
                    onChangeText={value => {
                      this.setState({ currency: value });
                    }}
                  />
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
                    placeholder="Billing Address"
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
                    placeholder="Postal Code"
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
                    placeholder="States"
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
                    placeholder="Country"
                    placeholderTextColor="rgb(74,74,74)"
                  />
                </View>
                <View style={{ height: height / 3 }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                      paddingTop: 30,
                      marginBottom: 40
                    }}
                    onPress={() =>
                      this.onClickChangeScreen("ConfirmApplication")
                    }
                  >
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : this.state.ischangeScreen === "ConfirmApplication" ? (
            <View>
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
                    Please confirm all the details you entered below is correct
                    and click confirm
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
                    onPress={() => this.onClickChangeScreen("AddSellerAcc")}
                  >
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: width / 1.2
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {this.state.firstName} {this.state.lastName}
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
                  <Text style={{ fontWeight: "bold" }}>{this.state.email}</Text>
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
                    {this.state.contact}
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
                  <Text style={{ fontWeight: "bold" }}>{this.state.id}</Text>
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
                  <Text style={{ fontWeight: "bold" }}>{this.state.email}</Text>
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
                    onPress={() => this.onClickChangeScreen("BusinessInfo")}
                  >
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: width / 1.2
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {this.state.legalName}
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
                  <Text>Branding Name</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {this.state.brandingName}
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
                    {this.state.businessType}
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
                    {this.state.busniessCategory}
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
                    {this.state.businessEmail}
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
                    {this.state.businessContact}
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
                    {this.state.busniessRegisterNum}
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
                  <Text style={{ fontWeight: "bold" }}>{this.state.tax}</Text>
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
                    {this.state.businessWebsite}
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
                    {this.state.legalName}
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
                    onPress={() => this.onClickChangeScreen("BillingInfo")}
                  >
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: width / 1.2
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {this.state.billingAddress}
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
                  <Text>Payment Method</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {this.state.paymentMethod}
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
                  <Text style={{ fontWeight: "bold" }}>{this.state.bank}</Text>
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
                    {this.state.branch}
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
                    {this.state.bankAccNum}
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
                    {this.state.currency}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 30,
                  marginBottom: 40
                }}
              >
                <View style={{ height: height / 3 }}>
                  <TouchableOpacity onPress={() => this.addBusiness()}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}
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
