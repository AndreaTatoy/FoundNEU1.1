import React from "react";
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from "react-native";
import Header from './Header';

const contacts = [
  {
    id: "1",
    name: "Shaina Blessy Meir Telen",
    email: "shainablessymeir.telen@neu.edu.ph",
    image: require("../assets/shaina.jpg"),
  },
  {
    id: "2",
    name: "Faye Camille Buri",
    email: "fayecamille.buri@neu.edu.ph",
    image: require("../assets/faye.png"),
  },
  {
    id: "3",
    name: "Venus Ruselle Daanoy",
    email: "venusruselle.daanoy@neu.edu.ph",
    image: require("../assets/venus.jpg"),
  },
  {
    id: "4",
    name: "John Keith Mercado",
    email: "johnkeith.mercado@neu.edu.ph",
    image: require("../assets/john.png"),
  },
  {
    id: "5",
    name: "Louise Andrea Tatoy",
    email: "louiseandrea.tatoy@neu.edu.ph",
    image: require("../assets/louise.jpg"),
  },
];

const Chat = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Header />
    <View style={styles.container}>
      {/* Contacts List */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contacts</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Image source={item.image} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#777",
  },
});

export default Chat;
