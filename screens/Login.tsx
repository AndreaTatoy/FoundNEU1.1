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
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "674509133893-nm5hnm0q7d8pbh62dms043ibtdbkfluj.apps.googleusercontent.com",
    webClientId: "674509133893-8ghe9hfsqr2u0hpn3fu5bdclfi0h1qpl.apps.googleusercontent.com",
    //expoClientId: "674509133893-8ghe9hfsqr2u0hpn3fu5bdclfi0h1qpl.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      native: "foundneu://",
    }),
    scopes: ['openid', 'profile', 'email']
  });

  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleSignIn(response.authentication?.accessToken);
    } else if (response?.type === "error") {
      Alert.alert("Authentication Error", "Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    }
  }, [response]);

  const handleGoogleSignIn = async (accessToken?: string) => {
    if (!accessToken) {
      Alert.alert("Authentication Error", "No access token received");
      return;
    }

    setIsLoading(true);

    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: accessToken,
      });

      if (signInError) {
        throw signInError;
      }

      const userEmail = signInData.user?.email;
      
      if (!userEmail) {
        throw new Error("No email address received from Google");
      }

      console.log("User email:", userEmail);

      if (!userEmail.endsWith("@neu.edu.ph")) {
        await supabase.auth.signOut();
        Alert.alert(
          "Access Denied",
          "Please use your NEU institutional email (@neu.edu.ph) to sign in."
        );
        setIsLoading(false);
        return;
      }

      console.log("Authentication successful");
      navigation.navigate("Main");
      
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert(
        "Authentication Error",
        "An error occurred during sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.description}>
        Welcome to New Era University's very own <Text style={{ color: "green" }}>lost & found</Text> app!
      </Text>
      <TouchableOpacity
        style={[styles.googleButton, isLoading && styles.disabledButton]}
        onPress={() => {
          setIsLoading(true);
          promptAsync();
        }}
        disabled={!request || isLoading}
      >
        <Image source={require("../assets/icon.png")} style={styles.googleIcon} />
        <Text style={styles.googleText}>
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const GuestLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.description}>Hello, dear visitor!</Text>
      <Text style={styles.subText}>Enter your email to continue as a guest.</Text>

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
  disabledButton: {
    opacity: 0.7,
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