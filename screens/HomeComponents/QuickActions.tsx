import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const QuickActions = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Saved</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default QuickActions;
