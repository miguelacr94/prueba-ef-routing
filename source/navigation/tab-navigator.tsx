import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PastLaunchScreen from '../screens/launch/past-launch/past-launch-screen';
import { RootStackParamList } from '../types/navigationType';
import NextLaunchScreen from 'source/screens/launch/next-launch/next-launch-screen';
import LaunchDetailScreen from 'source/screens/launch/past-launch/launch-detail-screen';
import BackScreenOption from 'components/ui/back-screen-option';
import SearchOption from 'components/header/search-option';
import Title from 'components/header/title';
import LaunchSearchScreen from 'source/screens/launch/search-screen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'ClientHomeScreen';

    if (routeName === 'LaunchDetailScreen') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: '#1e293b',
          height: Platform.OS === 'android' ? 80 : 120,
          shadowColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#334155',
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-medium',
          color: '#e2e8f0',
        },
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopWidth: 1,
          borderTopColor: '#334155',
          display: getTabBarVisibility(route) ? 'flex' : 'none',
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          height: Platform.OS === 'ios' ? 85 : 60,
        },
        headerTintColor: '#e2e8f0',
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'LaunchPastScreen') {
            iconName = focused ? 'rocket' : 'rocket-outline';
          } else if (route.name === 'LaunchFutureScreen') {
            iconName = focused ? 'rocket' : 'rocket-outline';
          }

          const iconColor = focused ? '#ffffff' : '#94a3b8';

          return (
            <View
              className={`
                ${focused ? 'bg-blue-600 shadow-lg shadow-blue-500/25' : 'bg-transparent'} 
                items-center justify-center rounded-full
                ${focused ? '-mt-2 h-14 w-14' : 'h-8 w-8'}
                transition-all duration-200
              `}>
              <Ionicons
                /* @ts-ignore */
                name={iconName}
                size={focused ? 22 : 18}
                color={iconColor}
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontFamily: 'Poppins-medium',
          fontSize: 12,
          marginTop: 4,
        },
      })}>
      <Tab.Screen
        name="LaunchPastScreen"
        options={{
          title: 'Pasados',
          animation: 'fade',
        }}
        component={PastLaunchStack}
      />
      <Tab.Screen
        name="LaunchFutureScreen"
        options={{
          title: 'Próximos',
          animation: 'fade',
        }}
        component={NextLaunchStack}
      />
    </Tab.Navigator>
  );
}

const PastLaunchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => null,
        headerLeft: () => null,
        title: '',
        headerStyle: {
          backgroundColor: '#1e293b',
          height: Platform.OS === 'android' ? 80 : 120,
          shadowColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#334155',
        },
        headerTintColor: '#e2e8f0',
        headerTitleStyle: {
          fontFamily: 'Poppins-medium',
          color: '#ffffff',
        },
        cardStyle: {
          backgroundColor: '#0f172a',
        },
      }}>
      <Stack.Screen
        name="LaunchPastScreen"
        component={PastLaunchScreen}
        options={{
          headerRight: () => (
            <View className="px-6">
              <SearchOption />
            </View>
          ),
          headerLeft: () => (
            <View className="px-6">
              <Title />
            </View>
          ),
        }}
      />
      <Stack.Screen
        options={{
          title: 'Detalle de lanzamiento',
          headerTitleStyle: {
            fontFamily: 'Poppins-medium',
            color: '#ffffff',
            fontSize: 18,
          },
          headerLeft: () => (
            <View className="pl-4">
              <BackScreenOption />
            </View>
          ),
        }}
        name="LaunchDetailScreen"
        component={LaunchDetailScreen as React.ComponentType}
      />
    </Stack.Navigator>
  );
};

const NextLaunchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => null,
        headerLeft: () => null,
        title: '',
        headerStyle: {
          backgroundColor: '#1e293b',
          height: Platform.OS === 'android' ? 80 : 120,
          shadowColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#334155',
        },
        headerTintColor: '#e2e8f0',
        headerTitleStyle: {
          fontFamily: 'Poppins-medium',
          color: '#ffffff',
        },
        cardStyle: {
          backgroundColor: '#0f172a',
        },
      }}>
      <Stack.Screen
        name="LaunchFutureScreen"
        component={NextLaunchScreen}
        options={{
          headerRight: () => (
            <View className="px-6">
              <SearchOption />
            </View>
          ),
          headerLeft: () => (
            <View className="px-6">
              <Title />
            </View>
          ),
        }}
      />
      <Stack.Screen
        options={{
          title: 'Detalle de lanzamiento',
          headerTitleStyle: {
            fontFamily: 'Poppins-medium',
            color: '#ffffff',
            fontSize: 18,
          },
          headerLeft: () => (
            <View className="pl-4">
              <BackScreenOption />
            </View>
          ),
        }}
        name="LaunchDetailScreen"
        component={LaunchDetailScreen as React.ComponentType}
      />
    </Stack.Navigator>
  );
};

export const SearchLaunchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => null,
        headerLeft: () => null,
        headerStyle: {
          backgroundColor: '#1e293b',
          height: Platform.OS === 'android' ? 80 : 120,
          shadowColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#334155',
        },
        headerTintColor: '#e2e8f0',
        headerTitleStyle: {
          fontFamily: 'Poppins-medium',
          color: '#ffffff',
        },
        cardStyle: {
          backgroundColor: '#0f172a',
        },
      }}>
      <Stack.Screen
        name="LaunchSearchScreen"
        component={LaunchSearchScreen}
        options={{
          title: '',
          headerRight: () => (
            <View className="px-8">
              <Title />
            </View>
          ),
          headerLeft: () => (
            <View className="pl-4">
              <BackScreenOption />
            </View>
          ),
        }}
      />
      <Stack.Screen
        options={{
          title: 'Detalle de lanzamiento',
          headerTitleStyle: {
            fontFamily: 'Poppins-medium',
            color: '#ffffff',
            fontSize: 18,
          },
          headerLeft: () => (
            <View className="pl-4">
              <BackScreenOption />
            </View>
          ),
        }}
        name="LaunchDetailScreen"
        component={LaunchDetailScreen as React.ComponentType}
      />
    </Stack.Navigator>
  );
};
