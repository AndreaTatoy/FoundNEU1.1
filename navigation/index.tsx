import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import HomeScreen from '../screens/Home';
import ChatScreen from '../screens/Chat';
import UploadScreen from '../screens/Upload';
import NotificationScreen from '../screens/Notification';
import AccountScreen from '../screens/Account';
import getTabBarIcon from '../utils/getTabBarIcon'; // Ensure this path is correct

// Define props for BottomTabNavigator
type BottomTabNavigatorProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const icons = {
  Home: require('../assets/icons/home.png'),
  HomeFocused: require('../assets/icons/home-filled.png'),
  Chat: require('../assets/icons/chat.png'),
  ChatFocused: require('../assets/icons/chat-filled.png'),
  Upload: require('../assets/icons/upload.png'),
  UploadFocused: require('../assets/icons/upload-filled.png'),
  Notification: require('../assets/icons/notif.png'),
  NotificationFocused: require('../assets/icons/notif-filled.png'),
  Account: require('../assets/icons/account.png'),
  AccountFocused: require('../assets/icons/account-filled.png'),
};

const Tab = createBottomTabNavigator();

const getTabBarIconLocal = (routeName: string, focused: boolean) => {
  const iconKey = focused
    ? (`${routeName}Focused` as keyof typeof icons)
    : (routeName as keyof typeof icons);

  return (
    <View>
      <Image source={icons[iconKey]} style={{ width: 24, height: 24 }} />
    </View>
  );
};

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getTabBarIconLocal(route.name, focused),
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Account">
        {() => <AccountScreen setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
