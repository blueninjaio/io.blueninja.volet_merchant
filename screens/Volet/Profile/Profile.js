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
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import { LinearGradient } from "expo";
import { NavigationEvents } from "react-navigation";

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      id: "",
      contact: ""
    };
  }

  /**
|--------------------------------------------------
| Get Volet balance
|--------------------------------------------------
*/
  componentDidMount = () => {
    this.getUserID();
  };

  getUserID = async () => {
    try {
      let id = await AsyncStorage.getItem("ID");
      let username = await AsyncStorage.getItem("firstname");
      let contact = await AsyncStorage.getItem("contact");

      if (id !== null) {
        this.setState({ id });
        this.setState({ username });
        this.setState({ contact });
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server storage",
        `${error}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  render() {
    const list = [
      {
        screen: "PersonalDetails",
        img: require("../../../assets/profile.png"),
        title: "Personal Details"
      },
      {
        screen: "",
        img: require("../../../assets/piggy.png"),
        title: "Withdraw Volet"
      },
      {
        screen: "",
        img: require("../../../assets/transaction.png"),
        title: "Transaction History"
      },
      {
        screen: "",
        img: require("../../../assets/directP.png"),
        title: "Billing Method"
      },
      {
        screen: "ReviewRatings",
        img: require("../../../assets/pen.png"),
        title: "Review and Ratings"
      },
      {
        screen: "Setting",
        img: require("../../../assets/config.png"),
        title: "Settings"
      }
    ];
    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView>
          <LinearGradient colors={["#36D1DC", "#5B86E5"]} style={styles.header}>
            <Text style={{ color: "white", fontSize: 18 }}>
              Merchant Profile
            </Text>
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
                {this.state.username}
              </Text>
            </View>
            <Text style={{ paddingTop: 10 }}>+{this.state.contact}</Text>
          </View>
          <View style={styles.voletContainer}>
            <LinearGradient
              colors={["#5B86E5", "#36D1DC"]}
              style={styles.voletBalance}
            >
              <Text style={{ color: "white", opacity: 0.7 }}>
                Your Volet Balance
              </Text>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                RM 200.00
              </Text>
            </LinearGradient>
          </View>

          {/* List of navigation */}
          <View>
            {list.map((x, i) => (
              <View style={styles.shadowSet} key={i}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(x.screen)}
                  style={styles.listItemButton}
                >
                  <View style={styles.show}>
                    <Image
                      source={x.img}
                      resizeMode="contain"
                      style={{ width: 40, height: 40 }}
                    />
                    <Text style={styles.listItemText}>{x.title}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
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
    marginLeft: 5,
    marginRight: 5
  },
  listItemButton: {
    padding: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 20
  },
  shadowSet: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: "#dbdbdb",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15
  }
});
