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
import api from "../../../api/index";
import { url } from "../../../config/index";

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      id: "",
      contact: "",
      balance: 0,
      userImage: ""
    };
  }

  /**
|--------------------------------------------------
| Get Volet balance
|--------------------------------------------------
*/
  componentDidMount = () => {
    this.getUserID();
    this.getVolet();
  };

  getUserID = async () => {
    try {
      const [id, username, contact] = await Promise.all([
        AsyncStorage.getItem("ID"),
        AsyncStorage.getItem("firstname"),
        AsyncStorage.getItem("contact")
      ]);

      if (id !== null) {
        this.setState({ id, username, contact });
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

  getVolet = async () => {
    try {
      api
        .usersInfo()
        .then(data => {
          if (data.success === true) {
            this.setState({ balance: data.user.credits });
            if (data.user.photo_url) {
              this.setState({ userImage: data.user.photo_url });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const list = [
      {
        screen: "PersonalDetails",
        img: require("../../../assets/human.png"),
        title: "Personal Details",
        width: 32,
        height: 30,
        marginRight: 10
      },
      {
        screen: "",
        img: require("../../../assets/piggy.png"),
        title: "Withdraw Volet",
        width: 40,
        height: 40
      },
      {
        screen: "",
        img: require("../../../assets/transaction.png"),
        title: "Transaction History",
        width: 40,
        height: 40
      },
      {
        screen: "",
        img: require("../../../assets/directP.png"),
        title: "Billing Method",
        width: 40,
        height: 40
      },
      {
        screen: "ReviewRatings",
        img: require("../../../assets/pen.png"),
        title: "Review and Ratings",
        width: 40,
        height: 40
      },
      {
        screen: "Setting",
        img: require("../../../assets/config.png"),
        title: "Settings",
        width: 40,
        height: 40
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
            {this.state.userImage !== "" ? (
              <Image
                resizeMode="contain"
                source={{
                  uri: `${url}/images/${this.state.userImage}`
                }}
                style={{
                  backgroundColor: "grey",
                  borderColor: "white",
                  width: 120,
                  height: 120,
                  borderRadius: 60
                }}
              />
            ) : (
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
            )}

            <View style={styles.userImage}>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, marginLeft: 10 }}
              >
                {this.state.username}
              </Text>
            </View>
            <Text style={{ paddingTop: 10 }}>{this.state.contact}</Text>
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
                RM {this.state.balance}
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
                      style={{
                        width: x.width,
                        height: x.height,
                        marginRight: x.marginRight
                      }}
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
