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
  TouchableHighlight,
  AsyncStorage,
  Alert
} from "react-native";
import {
  Header,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Thumbnail,
  Title,
  Icon
} from "native-base";
import { LinearGradient } from 'expo-linear-gradient'
import NotificationList from "../../../component/NotificationList";
import api from "../../../api/index";
import { url } from "../../../config";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      isVisible: false,
      notificationList: [
        {
          title: "Received by RM 50 from Someone"
        },
        {
          title: "Sent RM 50 to Someone"
        }
      ],
      userImage: "",
      balance: 0
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
      let id = await AsyncStorage.getItem("ID");
      let username = await AsyncStorage.getItem("firstname");
      if (id !== null) {
        this.setState({ id });
        this.setState({ username });
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
          Alert.alert(
            "Error connecting to server Volet, from Home screen",
            `${error}`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
  |--------------------------------------------------
  | Implementation of side bar
  |--------------------------------------------------
  */
  showSidebar = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView>
          <LinearGradient colors={["#36D1DC", "#5B86E5"]} style={styles.header}>
            <Header style={styles.headerOne}>
              <Left />
              <Body style={styles.headerOneBody}>
                <Image
                  source={require("../../../assets/VoletLogo.png")}
                  resizeMode="contain"
                  style={{ width: 90, height: 90 }}
                />
              </Body>
              <Right style={styles.headerOneRight}>
                <TouchableOpacity onPress={() => this.showSidebar()}>
                  <Image
                    source={require("../../../assets/bell.png")}
                    resizeMode="contain"
                    style={{ width: 22, height: 22 }}
                  />
                </TouchableOpacity>
              </Right>
            </Header>
            <View style={styles.welcomeUser}>
              <Text
                style={{
                  padding: 5,
                  fontSize: 17,
                  color: "white",
                  opacity: 0.7
                }}
              >
                Welcome back,{" "}
              </Text>
              <Text
                style={{
                  padding: 5,
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                {this.state.username}
              </Text>
            </View>
          </LinearGradient>
          <View style={styles.userVolet}>
            {this.state.userImage !== "" ? (
              <Thumbnail
                large
                source={{
                  uri: `${url}/images/${this.state.userImage}`
                }}
                style={{ backgroundColor: "grey", borderColor: "white" }}
              />
            ) : (
              <Thumbnail
                large
                source={{
                  uri: `https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg`
                }}
                style={{ backgroundColor: "grey", borderColor: "white" }}
              />
            )}
            <View style={styles.voletBalance}>
              <Text
                style={{
                  padding: 5,
                  fontSize: 17,
                  color: "grey",
                  opacity: 0.9
                }}
              >
                Your Volet Balance
              </Text>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                RM{this.state.balance}
              </Text>
            </View>
          </View>
          <View style={styles.payments}>
            <TouchableOpacity>
              <Image
                source={require("../../../assets/transHis.png")}
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require("../../../assets/PenOrder.png")}
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {this.state.isVisible === true ? (
          <View
            style={{
              position: "absolute",
              width: width / 1.1,
              height: "100%",
              right: 0,
              top: 0,
              zIndex: 999999,
              backgroundColor: "white"
            }}
          >
            <Header style={{ backgroundColor: "white" }}>
              <Left />
              <Body>
                <Title>Notification</Title>
              </Body>
              <Right>
                <TouchableHighlight
                  transparent
                  onPress={() => this.setState({ isVisible: false })}
                >
                  <Icon name="close" />
                </TouchableHighlight>
              </Right>
            </Header>
            <ScrollView>
              <View style={{ flex: 1 }}>
                {this.state.notificationList.map((x, i) => (
                  <View key={i}>
                    <NotificationList
                      icon={require("../../../assets/qrcode.png")}
                      title={x.title}
                    />
                  </View>
                ))}
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TouchableOpacity>
                    <Text>Clear All</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    height: height / 4
  },
  headerOne: {
    backgroundColor: "transparent",
    borderColor: null,
    justifyContent: "center",
    alignItems: "center"
  },
  headerOneBody: {
    alignItems: "center"
  },
  headerOneRight: {
    alignItems: "center"
  },
  welcomeUser: {
    alignItems: "center"
    // flexDirection:"row"
  },
  userVolet: {
    marginTop: -40,
    justifyContent: "center",
    alignItems: "center"
  },
  voletBalance: {
    padding: 15,
    alignItems: "center"
  },
  savingsCard: {
    alignItems: "center"
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0
  },
  payments: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 20
  },
  qrcode: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -5
  },
  savingsBar: {
    height: 16,
    width: width / 1.4,
    marginBottom: 5
  },
  savingsCardTwo: {
    width: width / 1.2,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    // borderColor:"white",
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  }
});
