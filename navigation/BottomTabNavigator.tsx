import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import ChatScreen from "../screens/Chat";
import UploadScreen from "../screens/Upload";
import NotificationScreen from "../screens/Notification";
import AccountScreen from "../screens/Account";

type BottomTabNavigatorProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Account">
        {(props) => <AccountScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
