import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");

export class Business extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: [
        {
          image:
            "https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg",
          title: "Restaurants"
        },
        {
          image:
            "https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg",
          title: "Shop"
        },
        {
          image:
            "https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg",
          title: "Stall"
        },
        {
          image:
            "https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg",
          title: "Movie"
        },
        {
          image:
            "https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg",
          title: "Bar"
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
            data={this.state.service}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={true}
            contentContainerStyle={styles.flatlistStyles}
            renderItem={({ item }) => (
              <View style={styles.ViewStyle}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("")}
                  style={styles.imageButton}
                >
                  <Thumbnail large source={{ uri: `${item.image}` }} />
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {this.state.service.map((x, i) => (
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
            onPress={() => this.props.navigation.navigate("BusinessEdit")}
          >
            <Thumbnail
              small
              source={{ uri: `${x.image}` }}
              style={{ backgroundColor: "grey" }}
            />
            <Text>Krusty Krabs Alantic</Text>
          </TouchableOpacity>
        ))}
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
  flatlistStyles: {
    width: width + 5
  },
  imageButton: {
    justifyContent: "space-around",
    alignItems: "center"
  }
});
