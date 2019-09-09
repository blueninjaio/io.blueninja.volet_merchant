import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Picker,
  TextInput,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import DatePicker from "react-native-datepicker";
export const { width, height } = Dimensions.get("window");
import { Dropdown } from "react-native-material-dropdown";
import { dev, prod, url } from "../../../config";
import { ImagePicker, Permissions } from "expo";

export class BusinessEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: "Store",
      storeName: "",
      storeNumber: "",
      storeDesc: "",
      businessCategory: "",
      businessType: "",
      selectedProducts: null,
      isEndTimePickerVisible: false,
      isStartTimePickerVisible: false,
      // startTime: new Date(),
      // endTime: new Date(),
      businessList: [],
      image: "",
      price: "",
      productName: "",
      producttDesc: "",
      businessItems: [],
      editProduct: "",
      editProductPrice: "",
      sunStartTime: new Date(),
      sunEndTime: new Date(),
      monStartTime: new Date(),
      monEndTime: new Date(),
      tueStartTime: new Date(),
      tueEndTime: new Date(),
      wedStartTime: new Date(),
      wedEndTime: new Date(),
      thurStartTime: new Date(),
      thurEndTime: new Date(),
      friStartTime: new Date(),
      friEndTime: new Date(),
      satStartTime: new Date(),
      satEndTime: new Date()
    };
  }

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
  | Implementing Dropdown list
  |--------------------------------------------------
  */
  createData() {
    return this.state.businessList.map(el => ({
      value: el
    }));
  }

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
      this.setState({ image: result.uri });
      // TODO: why isn't this showing up inside the Image on screen?
    }
  };

  /**
  |--------------------------------------------------
  | Implementation of get Business Categories
  |--------------------------------------------------
  */
  componentDidMount = () => {
    // this.getBusinessItem();
    // this.getPermissionAsync();
    // this.getBusiness();
    // console.log("Business id", this.props.navigation.state.params.businessID);
  };

  getBusinessItem = () => {
    fetch(`${url}/api/item/business`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        business_id: this.props.navigation.state.params.businessID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Item data", data);
        if (data.success === true) {
          this.setState({ businessItems: data.item });
        } else {
          alert(data.message);
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

  addBusinessInfo = () => {
    console.log("time", this.state.sunStartTime);
    fetch(`${url}/api/business/info`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        _id: this.props.navigation.state.params.businessID,
        store_name: this.state.storeName,
        store_number: this.state.storeNumber,
        store_description: this.state.storeDesc,
        sunday: { start: this.state.sunStartTime, end: this.state.sunEndTime },
        monday: { start: this.state.monStartTime, end: this.state.monEndTime },
        tuesday: { start: this.state.tueStartTime, end: this.state.tueEndTime },
        wednesday: {
          start: this.state.wedStartTime,
          end: this.state.wedEndTime
        },
        thursday: {
          start: this.state.thurStartTime,
          end: this.state.thurEndTime
        },
        friday: { start: this.state.friStartTime, end: this.state.friEndTime },
        saturday: { start: this.state.satStartTime, end: this.state.satEndTime }
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Business Info", data);
        if (data.success === true) {
          Alert.alert(
            "Success",
            `${data.message}`,
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.navigate("Business")
              }
            ],
            { cancelable: false }
          );
          // this.setState({ businessItems: data.item });
        } else {
          alert(data.message);
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

  deleteProduct = id => {
    fetch(`${url}/api/item/remove`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        _id: id
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Item data", data);
        if (data.success === true) {
          Alert.alert(
            "Succes",
            `${data.message}`,
            [
              {
                text: "OK",
                onPress: () => {
                  this.getBusinessItem(), this.products(null);
                }
              }
            ],
            { cancelable: false }
          );
        } else {
          alert(data.message);
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

  addBusinessItem = () => {
    let splitPrice = this.state.price.split(".");
    fetch(`${url}/api/item/add`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        business_id: this.props.navigation.state.params.businessID,
        name: this.state.productName,
        description: this.state.producttDesc,
        price: { value: splitPrice[0], decimal: splitPrice[1] }
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Item data", data);
        if (data.success === true) {
          Alert.alert(
            "Success",
            `${data.message}`,
            [
              {
                text: "OK",
                onPress: () => {
                  // this.props.navigation.navigate("Business"),
                  this.getBusinessItem(),
                    this.products(null),
                    this.setState({ productName: "" });
                  this.setState({ producttDesc: "" });
                  this.setState({ price: "" });
                }
              }
            ],
            { cancelable: false }
          );
        } else {
          alert(data.message);
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

  Onclick = value => {
    this.setState({ selectedValue: value });
  };

  products = value => {
    this.setState({ selectedProducts: value });
  };

  handleInputChange = text => {
    if (text.indexOf(".") == -1) {
      this.setState({
        price: text
      });
    } else if (text.indexOf(".") >= 1) {
      if (text.split(".")[1].length > 2) {
        this.setState({ price: parseFloat(text).toFixed(2) });
      } else {
        this.setState({ price: text });
      }
    }
  };

  editProduct = x => {
    this.setState({ selectedProducts: "EditProduct" });
    console.log("To be edited product", x);
    let price = x.price.value + "." + x.price.decimal;
    this.setState({ editProduct: x });
    this.setState({ editProductPrice: price });
  };

  render() {
    const dropDownValue = this.createData();
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: width / 2,
                alignItems: "center",
                padding: 15
              }}
            >
              {this.state.selectedValue === "Store" ? (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: "blue"
                  }}
                  onPress={() => this.Onclick("Store")}
                >
                  <Text>Store</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => this.Onclick("Store")}
                >
                  <Text>Store</Text>
                </TouchableOpacity>
              )}

              {this.state.selectedValue === "Product" ? (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: "blue"
                  }}
                  onPress={() => this.Onclick("Product")}
                >
                  <Text>Product</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => this.Onclick("Product")}
                >
                  <Text>Product</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {this.state.selectedValue === "Store" ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {this.state.image === "" ? (
                  <Thumbnail large style={{ backgroundColor: "grey" }} />
                ) : (
                  <Thumbnail
                    large
                    source={{ uri: `${this.state.image}` }}
                    style={{ backgroundColor: "grey" }}
                  />
                )}

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: width / 4
                  }}
                >
                  <Icon name="ios-add-circle-outline" type="Ionicons" />

                  <Text>Add Logo</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 30
                }}
              >
                <Text>Store Name</Text>
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
                  onChangeText={storeName => this.setState({ storeName })}
                  value={this.state.storeName}
                  type="text"
                  placeholder="Store name"
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
                <Text>Store Number</Text>
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
                  onChangeText={storeNumber => this.setState({ storeNumber })}
                  value={this.state.storeNumber}
                  type="number"
                  placeholder="Store Number"
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
                <Text>Store Description</Text>
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
                  onChangeText={storeDesc => this.setState({ storeDesc })}
                  value={this.state.storeDesc}
                  type="text"
                  placeholder="Store Description"
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
                    width: width / 1.5
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
                <Text>Business Catergory</Text>
                <Dropdown
                  data={dropDownValue}
                  label="Select"
                  containerStyle={{
                    // height: 170,
                    width: width / 1.5
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
                  paddingTop: 30,
                  //   backgroundColor:"pink",
                  width: width / 1.4
                }}
              >
                <Text>Opening Hours</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: width / 1.4
                  }}
                >
                  <Text>Sun</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: width / 1.4
                    }}
                  >
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.sunStartTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select date"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time =>
                        this.setState({ sunStartTime: time })
                      }
                    />
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.sunEndTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select time"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time => this.setState({ sunEndTime: time })}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: width / 1.4,
                    marginTop: 20
                  }}
                >
                  <Text>Mon</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: width / 1.4
                    }}
                  >
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.monStartTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select date"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time =>
                        this.setState({ monStartTime: time })
                      }
                    />
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.monEndTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select time"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time => this.setState({ monEndTime: time })}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: width / 1.4,
                    marginTop: 20
                  }}
                >
                  <Text>Tue</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: width / 1.4
                    }}
                  >
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.tueStartTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select date"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time =>
                        this.setState({ tueStartTime: time })
                      }
                    />
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.tueEndTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select time"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time => this.setState({ tueEndTime: time })}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: width / 1.4,
                    marginTop: 20
                  }}
                >
                  <Text>Wed</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: width / 1.4
                    }}
                  >
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.wedStartTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select date"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time =>
                        this.setState({ wedStartTime: time })
                      }
                    />
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.wedEndTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select time"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time => this.setState({ wedEndTime: time })}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: width / 1.4,
                    marginTop: 20
                  }}
                >
                  <Text>Thurs</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: width / 1.4
                    }}
                  >
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.thurStartTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select date"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time =>
                        this.setState({ thurStartTime: time })
                      }
                    />
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.thurEndTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select time"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time =>
                        this.setState({ thurEndTime: time })
                      }
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: width / 1.4,
                    marginTop: 20
                  }}
                >
                  <Text>Fri</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: width / 1.4
                    }}
                  >
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.friStartTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select date"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time =>
                        this.setState({ friStartTime: time })
                      }
                    />
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.friEndTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select time"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time => this.setState({ friEndTime: time })}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: width / 1.4,
                    marginTop: 20
                  }}
                >
                  <Text>Sat</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: width / 1.4
                    }}
                  >
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.satStartTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select date"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time =>
                        this.setState({ satStartTime: time })
                      }
                    />
                    <DatePicker
                      style={{ width: 100 }}
                      date={this.state.satEndTime}
                      mode="time"
                      showIcon={false}
                      placeholder="select time"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={time => this.setState({ satEndTime: time })}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.addBusinessInfo()}
                style={{ backgroundColor: "grey", padding: 20, marginTop: 50 }}
              >
                <Text>Save</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <Text>Delete Product</Text>
              </TouchableOpacity> */}
            </View>
          ) : (
            <View>
              {this.state.selectedProducts === null ? (
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "#ddd",
                      alignItems: "center",
                      padding: 10,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                    onPress={() => this.products("FeaturedProducts")}
                  >
                    <Thumbnail
                      small
                      // source={{ uri: `` }}
                      style={{ backgroundColor: "grey" }}
                    />
                    <Text>Featured Product</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "#ddd",
                      alignItems: "center",
                      padding: 10,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                    // onPress={() => this.props.navigation.navigate("BusinessEdit")}
                  >
                    <Thumbnail
                      small
                      // source={{ uri: `` }}
                      style={{ backgroundColor: "grey" }}
                    />
                    <Text>Products</Text>
                  </TouchableOpacity>
                </View>
              ) : this.state.selectedProducts === "AddProduct" ? (
                <View>
                  <View style={{ paddingLeft: 20 }}>
                    <TouchableOpacity
                      onPress={() => this.products("FeaturedProducts")}
                    >
                      <Text> {`<`} Back </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {this.state.image === "" ? (
                      <Thumbnail
                        large
                        square
                        style={{
                          backgroundColor: "grey",
                          width: width / 1.5,
                          height: height / 6
                        }}
                      />
                    ) : (
                      <Thumbnail
                        large
                        source={{ uri: `${this.state.image}` }}
                        square
                        style={{
                          backgroundColor: "grey",
                          width: width / 1.5,
                          height: height / 5
                        }}
                      />
                    )}
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: width / 4
                      }}
                      onPress={() => this._onChoosePic()}
                    >
                      <Icon name="ios-add-circle-outline" type="Ionicons" />

                      <Text>Add Images</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingTop: 30
                      }}
                    >
                      <Text>Product Name</Text>
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
                        onChangeText={productName =>
                          this.setState({ productName })
                        }
                        value={this.state.productName}
                        type="text"
                        placeholder="Product name"
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
                      <Text>Product Description</Text>
                      <TextInput
                        style={{
                          alignSelf: "center",
                          width: width / 1.2,
                          paddingLeft: 20,
                          // borderRadius: 20,
                          height: 100,
                          color: "rgb(74,74,74)",
                          backgroundColor: "rgb(226,226,226)"
                        }}
                        onChangeText={producttDesc =>
                          this.setState({ producttDesc })
                        }
                        value={this.state.producttDesc}
                        type="text"
                        placeholder="Product Description"
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
                      <Text>Price</Text>
                      <TextInput
                        style={{
                          alignSelf: "center",
                          width: width / 1.2,
                          paddingLeft: 20,
                          height: 50,
                          color: "rgb(74,74,74)",
                          backgroundColor: "rgb(226,226,226)"
                        }}
                        // onChangeText={price => this.setState({ price })}
                        onChangeText={this.handleInputChange}
                        value={this.state.price}
                        type="number"
                        keyboardType="numeric"
                        placeholder="MYR"
                        placeholderTextColor="rgb(74,74,74)"
                        // maxLength={6}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: height / 4
                      }}
                    >
                      <TouchableOpacity
                        style={{ backgroundColor: "grey", padding: 20 }}
                        onPress={() => this.addBusinessItem()}
                      >
                        <Text>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.deleteProduct()}>
                        <Text>Delete Product</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : this.state.selectedProducts === "EditProduct" ? (
                <View>
                  <View style={{ paddingLeft: 20 }}>
                    <TouchableOpacity
                      onPress={() => this.products("FeaturedProducts")}
                    >
                      <Text> {`<`} Back </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {this.state.image === "" ? (
                      <Thumbnail
                        large
                        square
                        style={{
                          backgroundColor: "grey",
                          width: width / 1.5,
                          height: height / 6
                        }}
                      />
                    ) : (
                      <Thumbnail
                        large
                        source={{ uri: `${this.state.image}` }}
                        square
                        style={{
                          backgroundColor: "grey",
                          width: width / 1.5,
                          height: height / 5
                        }}
                      />
                    )}
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: width / 4
                      }}
                      onPress={() => this._onChoosePic()}
                    >
                      <Icon name="ios-add-circle-outline" type="Ionicons" />

                      <Text>Add Images</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingTop: 30
                      }}
                    >
                      <Text>Product Name</Text>
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
                        // onChangeText={productName =>
                        //   this.setState({ productName })
                        // }
                        value={this.state.editProduct.name}
                        type="text"
                        placeholder="Product name"
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
                      <Text>Product Description</Text>
                      <TextInput
                        style={{
                          alignSelf: "center",
                          width: width / 1.2,
                          paddingLeft: 20,
                          // borderRadius: 20,
                          height: 100,
                          color: "rgb(74,74,74)",
                          backgroundColor: "rgb(226,226,226)"
                        }}
                        // onChangeText={producttDesc =>
                        //   this.setState({ producttDesc })
                        // }
                        value={this.state.editProduct.description}
                        type="text"
                        placeholder="Product Description"
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
                      <Text>Price</Text>
                      <TextInput
                        style={{
                          alignSelf: "center",
                          width: width / 1.2,
                          paddingLeft: 20,
                          height: 50,
                          color: "rgb(74,74,74)",
                          backgroundColor: "rgb(226,226,226)"
                        }}
                        // onChangeText={price => this.setState({ price })}
                        // onChangeText={this.handleInputChange}
                        value={this.state.editProductPrice}
                        type="number"
                        keyboardType="numeric"
                        placeholder="MYR"
                        placeholderTextColor="rgb(74,74,74)"
                        // maxLength={6}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: height / 4
                      }}
                    >
                      <TouchableOpacity
                        style={{ backgroundColor: "grey", padding: 20 }}
                        // onPress={() => this.addBusinessItem()}
                      >
                        <Text>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.deleteProduct(this.state.editProduct._id)
                        }
                      >
                        <Text>Delete Product</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ paddingLeft: 20 }}>
                    <TouchableOpacity onPress={() => this.products(null)}>
                      <Text> {`<`} Back </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start"
                      }}
                    >
                      <Text>Featured Products</Text>
                      <Text>Add up to 5 featured products to your shop.</Text>
                    </View>
                  </View>

                  {this.state.businessItems.map((x, i) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "#ddd",
                        alignItems: "center",
                        padding: 10,
                        marginTop: 10,
                        marginBottom: 10
                      }}
                      onPress={() => this.editProduct(x)}
                      key={i}
                    >
                      <Thumbnail
                        small
                        // source={{ uri: `` }}
                        style={{ backgroundColor: "grey" }}
                      />
                      <Text>{x.name}</Text>
                    </TouchableOpacity>
                  ))}
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TouchableOpacity
                      onPress={() => this.products("AddProduct")}
                    >
                      <Icon name="ios-add-circle-outline" type="Ionicons" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default BusinessEdit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  ViewStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 20
  },
  flatlistStyles: {
    width: width + 5
  },
  imageButton: {
    justifyContent: "space-around",
    alignItems: "center"
  }
});
