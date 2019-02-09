import { ScrollView, View, Text, TouchableHighlight, Image, RefreshControl } from "react-native";
import { Card, Divider, Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import React, { Component } from 'react';

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Image
          source={require('../../../assets/carbon8WordmarkLogoBlack.png')}
          style={{ width: 110, height: 25, marginBottom: 5 }}
        />
      ),
      headerRight: (
        <TouchableHighlight onPress={() => navigation.navigate("ScanModal")}>
          <Icon
            name="ios-barcode" 
            size={30}
            color="#000"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("ScanModal")}
          />
        </TouchableHighlight>
      ),
      headerLeft: (
        <TouchableHighlight onPress={() => navigation.navigate("LogModal")}>
          <Icon
            name="ios-add-circle-outline"
            size={30}
            color="#000"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.navigate("LogModal")}
          />
        </TouchableHighlight>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  onRefresh() {
    this.setState({ refreshing: true });
    
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 3000);
  }

  render() {
    return (
      <ScrollView 
        style={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
            tintColor="#000"
          />
        }
      >
        <View style={{
          height: 260,
          width: "100%"
        }}>
          <Swiper 
            autoplay={true}
            autoplayTimeout={10}
            activeDotColor="#000"
            paginationStyle={{
              marginBottom: -15,
            }}
          >
            <View>
              <Card 
                title="Daily Intake"
                titleStyle={{
                  fontSize: 16,
                  color: "#000",
                  margin: 0
                }}
                containerStyle={{
                  borderColor: "#000",
                  margin: 15,
                  height: 210,
                  padding: 0
                }}
                dividerStyle={{
                  backgroundColor: "#000",
                }}
                wrapperStyle={{
                  margin: 0,
                  padding: 15,
                  paddingBottom: 0,
                  backgroundColor: "#fff"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 50,
                  }}
                >
                  <Text 
                    style={{
                      textAlign: "center",
                      fontSize: 32
                    }}
                  >
                    783 mL
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    marginRight: -15,
                    marginLeft: -15
                  }}
                >
                  <ListItem
                    key={3}
                    title={"Logged Intakes"}
                    titleStyle={{
                      fontSize: 15
                    }}
                    topDivider={true}
                    bottomDivider={false}
                    chevron={true}
                    badge={{
                      value: 3,
                      badgeStyle: {
                        backgroundColor: "#000"
                      }
                    }}
                  />
                  <ListItem
                    key={4}
                    title={"Daily Comparison Graph"}
                    titleStyle={{
                      fontSize: 15
                    }}
                    topDivider={true}
                    bottomDivider={false}
                    chevron={true}
                  />
                </View>
              </Card>
            </View>
            <View>
              <Card
                title="Weekly Intake"
                titleStyle={{
                  fontSize: 16,
                  color: "#000",
                  margin: 0
                }}
                containerStyle={{
                  borderColor: "#000",
                  margin: 15,
                  height: 210,
                  padding: 0
                }}
                dividerStyle={{
                  top: 0,
                  margin: 0,
                  padding: 0,
                  backgroundColor: "#000",
                }}
                wrapperStyle={{
                  margin: 0,
                  padding: 15,
                  paddingBottom: 0,
                  backgroundColor: "#fff"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 50,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 32
                    }}
                  >
                    9.83 L
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    marginRight: -15,
                    marginLeft: -15
                  }}
                >
                  <ListItem
                    key={3}
                    title={"Logged Intakes"}
                    titleStyle={{
                      fontSize: 15
                    }}
                    topDivider={true}
                    bottomDivider={false}
                    chevron={true}
                    badge={{
                      value: 34,
                      badgeStyle: {
                        backgroundColor: "#000"
                      }
                    }}
                  />
                  <ListItem
                    key={4}
                    title={"Weekly Comparison Graph"}
                    titleStyle={{
                      fontSize: 15
                    }}
                    topDivider={true}
                    bottomDivider={false}
                    chevron={true}
                  />
                </View>
              </Card>
            </View>
            <View>
              <Card
                title="Monthly Intake"
                titleStyle={{
                  fontSize: 16,
                  color: "#000",
                  margin: 0
                }}
                containerStyle={{
                  borderColor: "#000",
                  margin: 15,
                  height: 210,
                  padding: 0
                }}
                dividerStyle={{
                  backgroundColor: "#000",
                }}
                wrapperStyle={{
                  margin: 0,
                  padding: 15,
                  paddingBottom: 0,
                  backgroundColor: "#fff"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 50,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 32
                    }}
                  >
                    90.4 L
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    marginRight: -15,
                    marginLeft: -15
                  }}
                >
                  <ListItem
                    key={3}
                    title={"Logged Intakes"}
                    titleStyle={{
                      fontSize: 15
                    }}
                    topDivider={true}
                    bottomDivider={false}
                    chevron={true}
                    badge={{
                      value: 187,
                      badgeStyle: {
                        backgroundColor: "#000"
                      }
                    }}
                  />
                  <ListItem
                    key={4}
                    title={"Monthly Comparison Graph"}
                    titleStyle={{
                      fontSize: 15
                    }}
                    topDivider={true}
                    bottomDivider={false}
                    chevron={true}
                  />
                </View>
              </Card>
            </View>
          </Swiper>
        </View>
        <Divider style={{ backgroundColor: "#000" }} />
        <View
          style={{
            alignItems: "center"
          }}
        > 
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 30
            }}
          >
            No Hydration Goals
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 30,
              marginBottom: 30,
              marginRight: 20,
              marginLeft: 20,
              textAlign: "center"
            }}
          >
            You have no hydration goals! They will show up here when you create one. Press the button below to create one or the icon in the top left.
          </Text>
          <Button
            title="Create Hydration Goal"
            buttonStyle={{
              width: 230,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#000",
              backgroundColor: "#000"
            }}
            titleStyle={{
              fontSize: 15,
              color: "#FFF"
            }}
            onPress={() => this.props.navigation.navigate("LogModal")}
          />
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;
