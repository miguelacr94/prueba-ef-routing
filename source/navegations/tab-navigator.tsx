import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import { Platform, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PastLaunchScreen from "../screens/launch/past-launch/past-launch-screen";
import { RootStackParamList } from "../types/navigationType";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: "#e25b24",
          height: Platform.OS === "android" ? 80 : 120,
          shadowColor: "transparent",
        },
        headerTitleStyle: {
          fontFamily: "Poppins-medium",
        },
        tabBarStyle: {
          backgroundColor: "#e25b24",
        },
        headerTintColor: "#fff",
        headerRight: () => null,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "ClientHomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "OffersScreen") {
            iconName = focused ? "pricetag-sharp" : "pricetag-outline";
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "RequestScreen") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "CoursesScreen") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          }

          const iconColor = focused ? "white" : "white";

          return (
            <View
              style={{
                backgroundColor: "#e25b24",
                borderRadius: 150,
                marginTop: focused ? -8 : 0,
                justifyContent: "center",
                alignItems: "center",
                height: focused ? 55 : 30,
                width: focused ? 55 : 30,
              }}
            >
              {/* @ts-ignore */}
              <Ionicons name={iconName} size={18} color={iconColor} />
            </View>
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen
        name="LaunchPastScreen"
        options={{ title: "Cursos", animation: "fade" }}
        component={LaunchPastStack}
      />
      <Tab.Screen
        name="RequestScreen"
        options={{ title: "Solicitudes", animation: "fade" }}
        component={LaunchPastStack}
      />
    </Tab.Navigator>
  );
}

const LaunchPastStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => null,
        headerLeft: () => null,
        headerStyle: {
          backgroundColor: "#e25b24",
          height: Platform.OS === "android" ? 80 : 120,
          shadowColor: "transparent",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Poppins-medium",
        },
      }}
    >
      <Stack.Screen
        name="LaunchPastScreen"
        component={PastLaunchScreen}
        options={{ title: "Inicio" }}
      />
      {/* <Stack.Screen
        options={{
          title: "Destalle de past",
          headerLeft: () => <BackScreen />, // Back solo en detalle
        }}
        name="RequestDetailScreen"
        component={RequestDetailScreen}
      /> */}
    </Stack.Navigator>
  );
};
