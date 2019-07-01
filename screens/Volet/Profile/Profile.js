import React from "react";
export const { width, height } = Dimensions.get("window");
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo";

export class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView>
          <LinearGradient colors={["#36D1DC", "#5B86E5"]} style={styles.header}>
            <Text style={{ color: "white", fontSize: 18 }}>User Profile</Text>
          </LinearGradient>
          <View style={styles.userDetails}>
            <Image
              resizeMode="contain"
              source={{
                uri: `https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg`
              }}
              style={{
                backgroundColor: "grey",
                borderColor: "white",
                width: 120,
                height: 120,
                borderRadius: 60
              }}
            />
            <View style={styles.userImage}>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginLeft: 10 }}
              >
                Fa Mulan
              </Text>
              <Image
                source={require("../../../assets/check.png")}
                resizeMode="contain"
                style={{ width: 15, height: 15, marginLeft: 10 }}
              />
            </View>
            <Text style={{ paddingTop: 10 }}>+0123345678</Text>
          </View>
          <View style={styles.voletContainer}>
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.voletBalance}
            >
              <Text style={{ color: "grey", opacity: 0.7 }}>
                Your Volet Balance
              </Text>
              <Text style={{ color: "white", fontSize: 18 }}>RM 200.00</Text>
            </LinearGradient>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("PersonalDetails")}
              style={styles.listItemButton}
            >
              <View style={styles.show}>
                <Image
                  source={require("../../../assets/profile.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.listItemText}>Personal Details</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("DeepWorks")}
              style={styles.listItemButton}
            >
              <View style={styles.show}>
                <Image
                  source={require("../../../assets/piggy.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.listItemText}>Withdraw Volet</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("DeepWorks")}
              style={styles.listItemButton}
            >
              <View style={styles.show}>
                <Image
                  source={require("../../../assets/transaction.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.listItemText}>Transaction History</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("DeepWorks")}
              style={styles.listItemButton}
            >
              <View style={styles.show}>
                <Image
                  source={require("../../../assets/directP.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.listItemText}>Billing Method</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("")}
              style={styles.listItemButton}
            >
              <View style={styles.show}>
                <Image
                  source={require("../../../assets/pen.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.listItemText}>Reviews and Ratings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Setting")}
              style={styles.listItemButton}
            >
              <View style={styles.show}>
                <Image
                  source={require("../../../assets/config.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.listItemText}>Settings</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    height: height / 4.3,
    justifyContent: "center",
    alignItems: "center",
    width: width
  },
  userDetails: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50
  },
  userImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  voletContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  voletBalance: {
    width: width / 1.4,
    // padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    height: height / 10
  },
  show: {
    justifyContent: "flex-start",
    width: width / 1.8,
    alignItems: "center",
    flexDirection: "row"
  },
  listItemButtonSwitch: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    // borderWidth: 1,
    // borderColor: "#979797",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    // borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1
  },
  listItemButton: {
    padding: 10,
    // borderRadius: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    // borderWidth: 1,
    // borderColor: "#979797",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 20
  }
});
