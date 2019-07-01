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
  ScrollView
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
export const { width, height } = Dimensions.get("window");

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
      isStartTimePickerVisible:false,
      startTime: "00:00:00",
      endTime:"23:59:00",
    };
  }

  Onclick = value => {
    this.setState({ selectedValue: value });
  };

  products = value => {
    this.setState({ selectedProducts: value });
  };

  showStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: true });
  };

  hideStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: false });
  };

  handleStartPicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ startTime: date });
    this.hideStartTimePicker();
  };

  showEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: true });
  };

  hideEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: false });
  };

  handleEndPicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ endTime: date });
    this.hideEndTimePicker();
  };

  render() {
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
                <Thumbnail large style={{ backgroundColor: "grey" }} />
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
                <Text>Type Of Business</Text>
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
                  <Picker.Item label="Food and Beverage" value="fab" />
                  <Picker.Item label="Shop" value="shop" />
                  <Picker.Item label="Cold Drinks" value="drinks" />
                </Picker>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 30
                }}
              >
                <Text>Business Catergory</Text>
                <Picker
                  selectedValue={this.state.businessCategory}
                  style={{
                    height: 170,
                    width: width / 1.5,
                    backgroundColor: "grey"
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ businessCategory: itemValue })
                  }
                >
                  <Picker.Item label="Food and Beverage" value="fab" />
                  <Picker.Item label="Shop" value="shop" />
                  <Picker.Item label="Cold Drinks" value="drinks" />
                </Picker>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 30,
                //   backgroundColor:"pink",
                  width: width/ 1.4
                }}
              >
                <Text>Opening Hours</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  width: width/ 1.4

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
                    <TouchableOpacity onPress={this.showStartTimePicker} style={{padding: 20, }}>
                      <Text>{this.state.startTime}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      mode="time"
                      date={this.state.startTime}
                      isVisible={this.state.isStartTimePickerVisible}
                      onConfirm={this.handleStartPicked}
                      onCancel={this.hideStartTimePicker}
                    />
                    <TouchableOpacity onPress={this.showEndTimePicker} style={{padding: 20,}}>
                      <Text>{this.state.endTime}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      mode="time"
                      date={this.state.endTime}
                      isVisible={this.state.isEndTimePickerVisible}
                      onConfirm={this.handleEndPicked}
                      onCancel={this.hideEndTimePicker}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: "grey", padding: 20 }}
              >
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Delete Product</Text>
              </TouchableOpacity>
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
                    <Thumbnail
                      large
                      square
                      style={{
                        backgroundColor: "grey",
                        width: width / 1.5,
                        height: height / 6
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: width / 4
                      }}
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
                          height: 50,
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
                          // borderRadius: 20,
                          height: 50,
                          color: "rgb(74,74,74)",
                          backgroundColor: "rgb(226,226,226)"
                        }}
                        onChangeText={price => this.setState({ price })}
                        value={this.state.price}
                        type="number"
                        placeholder="MYR"
                        placeholderTextColor="rgb(74,74,74)"
                      />
                    </View>
                    <TouchableOpacity
                      style={{ backgroundColor: "grey", padding: 20 }}
                    >
                      <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text>Delete Product</Text>
                    </TouchableOpacity>
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
                    onPress={() => this.products("AddProduct")}
                  >
                    <Thumbnail
                      small
                      // source={{ uri: `` }}
                      style={{ backgroundColor: "grey" }}
                    />
                    <Text>Krabby Patty</Text>
                  </TouchableOpacity>
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
