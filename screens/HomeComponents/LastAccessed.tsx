import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const LastAccessed = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Accessed</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.placeholder} />
            <Text style={styles.itemTitle}>Title</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
  },
  item: {
    alignItems: "center",
    marginRight: 12,
  },
  placeholder: {
    width: 120,
    height: 120,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  itemTitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
  },
});

export default LastAccessed;
