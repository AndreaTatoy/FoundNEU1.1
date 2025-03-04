import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import Login from './screens/Login';
import BottomTabNavigator from './navigation';
import Account from './screens/Account';

// Define the navigation parameters correctly
type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Account: undefined;
};

// Create Stack Navigator with correct types
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main">
              {props => <BottomTabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Account">
              {props => <Account {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Login">
            {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
