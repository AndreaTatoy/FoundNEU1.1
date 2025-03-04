import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

// Define the navigation type
type RootStackParamList = {
  Login: undefined;
};

type LoginScreenProps = StackScreenProps<RootStackParamList, "Login"> & {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Login: React.FC<LoginScreenProps> = ({ setIsLoggedIn }) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Sign In" onPress={() => setIsLoggedIn(true)} />
    </View>
  );
};

export default Login;