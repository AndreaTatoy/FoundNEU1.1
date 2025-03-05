import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { supabase } from "../supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type LoginScreenProps = StackScreenProps<RootStackParamList, "Login"> & {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();

const Login: React.FC<LoginScreenProps> = ({ setIsLoggedIn }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/neu-logo.png")} style={styles.logo} />

      <Text style={styles.title}>
        Found<Text style={{ color: "green" }}>NEU</Text>
      </Text>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "white", elevation: 0, shadowOpacity: 0 },
          tabBarIndicatorStyle: { backgroundColor: "#d32f2f" },
          tabBarLabelStyle: { fontWeight: "bold", textTransform: "none" },
        }}
      >
        <Tab.Screen name="Institutional" component={InstitutionalLogin} />
        <Tab.Screen name="Guest" component={GuestLogin} />
      </Tab.Navigator>
    </View>
  );
};

const InstitutionalLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "674509133893-nm5hnm0q7d8pbh62dms043ibtdbkfluj.apps.googleusercontent.com",
    webClientId: "674509133893-8ghe9hfsqr2u0hpn3fu5bdclfi0h1qpl.apps.googleusercontent.com",
    redirectUri: makeRedirectUri()
  });

  useEffect(() => {
    console.log("Response: ", response);
    if (response?.type === "success") {
      const { id_token } = response.params;
      if (id_token) {
        handleGoogleSignIn(id_token);
      } else {
        console.error("ID Token is undefined");
        Alert.alert("Login Failed", "ID Token is undefined. Please try again.");
      }
    }
  }, [response]);

  const handleGoogleSignIn = async (idToken: string) => {
    console.log("ID Token: ", idToken);
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error) {
      console.error("Login Failed: ", error.message);
      Alert.alert("Login Failed", error.message);
      return;
    }

    const userEmail = data.session?.user?.email;
    console.log("User Email: ", userEmail);
    if (userEmail?.endsWith("@neu.edu.ph")) {
      navigation.navigate("Main");
    } else {
      await supabase.auth.signOut();
      Alert.alert("Access Denied", "Only @neu.edu.ph emails are allowed.");
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.description}>
        Welcome to New Era University’s very own <Text style={{ color: "green" }}>lost & found</Text> app!
      </Text>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Image source={require("../assets/icon.png")} style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const GuestLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.description}>Hello, dear visitor!</Text>
      <Text style={styles.subText}>Enter your email to continue as a guest.</Text>

      {/* Placeholder for Email Input (Can be added later) */}

      {/* Continue as Guest Button */}
      <TouchableOpacity style={styles.googleButton} onPress={() => navigation.replace("Main")}>
        <Text style={styles.googleText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d32f2f",
  },
  loginContainer: {
    padding: 20,
    alignItems: "center",
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
    color: "#666",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
    marginBottom: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: "#333",
    fontSize: 16,
  },
  terms: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Login;
