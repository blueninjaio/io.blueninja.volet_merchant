import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../../config";
import { NavigationEvents } from "react-navigation";

export class Business extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      id: "",
      service: [],
      categoryList: []
    };
  }

  /**
  |--------------------------------------------------
  | Implementation of Get Business Categories
  |--------------------------------------------------
  */

  componentDidMount = () => {
    this.addBusiness();
    this.getUserInfo();
  };

  getUserInfo = async () => {
    try {
      let email = await AsyncStorage.getItem("email");
      if (email !== null) {
        this.setState({ email });
        this.getMerchantBusiness(email);
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

  addBusiness = () => {
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
        console.log("Get Business Details :", data.categories);
        if (data.categories.length >= 1) {
          this.setState({ categoryList: data.categories });
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

  getMerchantBusiness = email => {
    fetch(`${url}/api/business/merchant/email`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Get Merchant Business :", data);
        if (data.success === true) {
          this.setState({ service: data.businesses });
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

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => this.getUserInfo()}
          onWillFocus={payload => this.addBusiness()}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 20
          }}
          onPress={() => this.props.navigation.navigate("SellerAcc")}
        >
          <Icon name="ios-add-circle-outline" type="Ionicons" />
          <Text>Add Business</Text>
        </TouchableOpacity>
        <View>
          <FlatList
            data={this.state.categoryList}
            // showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={true}
            contentContainerStyle={styles.flatlistStyles}
            renderItem={({ item }) => (
              <View style={styles.ViewStyle}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("")}
                  style={styles.imageButton}
                >
                  <Thumbnail
                    large
                    // source={{ uri: `${item.image}` }}
                    style={{ backgroundColor: "grey" }}
                  />
                  <Text style={{ textAlign: "center" }}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {this.state.service.map((item, i) =>
          item.isApproved === true ? (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#ddd",
                alignItems: "center",
                padding: 10,
                marginTop: 10,
                marginBottom: 10
              }}
              onPress={() =>
                this.props.navigation.navigate("BusinessEdit", {
                  businessID: item._id,
                  businessInfo: this.state.service
                })
              }
            >
              <Thumbnail
                small
                source={{ uri: `${item.image}` }}
                style={{ backgroundColor: "grey" }}
              />
              <Text>{item.branding}</Text>
            </TouchableOpacity>
          ) : null
        )}
      </View>
    );
  }
}

export default Business;

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
  imageButton: {
    justifyContent: "space-around",
    alignItems: "center"
  }
});
