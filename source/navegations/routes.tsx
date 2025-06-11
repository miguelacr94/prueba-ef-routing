import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { BottomTabNavigator } from "./tab-navigator";
import { RootStackParamList } from "../types/navigationType";
import SplashScreen from "../screens/splash-screen";

const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen"
      >
        <Stack.Screen
          name="SplashScreen"
          options={{ animation: "fade_from_bottom" }}
          component={SplashScreen}
        />

        <Stack.Screen
          name="LaunchPastScreen"
          options={{ animation: "fade_from_bottom" }}
          component={BottomTabNavigator}
        />

        {/* <Stack.Screen
          name="LaunchPastScreen"
          options={{ animation: "fade_from_bottom" }}
          component={}
        /> */}
      </Stack.Navigator>
    </View>
  );
};

export default Routes;
