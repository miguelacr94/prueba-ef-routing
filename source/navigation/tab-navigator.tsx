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

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: '#e25b24',
          height: Platform.OS === 'android' ? 80 : 120,
          shadowColor: 'transparent',
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-medium',
        },
        tabBarStyle: {
          backgroundColor: '#e25b24',
        },
        headerTintColor: '#fff',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'LaunchPastScreen') {
            iconName = focused ? 'rocket-launch' : 'rocket-launch-outline';
          } else if (route.name === 'LaunchFutureScreen') {
            iconName = focused ? 'rocket' : 'rocket-outline';
          }

          const iconColor = focused ? 'white' : 'white';

          return (
            <View
              style={{
                backgroundColor: '#e25b24',
                borderRadius: 150,
                marginTop: focused ? -8 : 0,
                justifyContent: 'center',
                alignItems: 'center',
                height: focused ? 55 : 30,
                width: focused ? 55 : 30,
              }}>
              {/* @ts-ignore */}
              <Ionicons name="rocket-" size={18} color={iconColor} />
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
      })}>
      <Tab.Screen
        name="LaunchPastScreen"
        options={{ title: 'Pasados', animation: 'fade' }}
        component={PastLaunchStack}
      />
      <Tab.Screen
        name="LaunchFutureScreen"
        options={{ title: 'Próximos', animation: 'fade' }}
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
          backgroundColor: '#e25b24',
          height: Platform.OS === 'android' ? 80 : 120,
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poppins-medium',
        },
      }}>
      <Stack.Screen
        name="LaunchPastScreen"
        component={PastLaunchScreen}
        options={{
          headerRight: () => <SearchOption className="px-6" />,
          headerLeft: () => <Title className="px-6" />,
        }}
      />
      <Stack.Screen
        options={{
          title: 'Destalle de lanzamiento',
          headerLeft: () => <BackScreenOption />,
        }}
        name="LaunchDetailScreen"
        component={LaunchDetailScreen}
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
        headerStyle: {
          backgroundColor: '#e25b24',
          height: Platform.OS === 'android' ? 80 : 120,
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poppins-medium',
        },
      }}>
      <Stack.Screen
        name="LaunchFutureScreen"
        component={NextLaunchScreen}
        options={{
          headerRight: () => <SearchOption />,
          headerLeft: () => <Title />,
        }}
      />
      <Stack.Screen
        options={{
          title: 'Destalle de lanzamiento',
          headerLeft: () => <BackScreenOption />, // Back solo en detalle
        }}
        name="LaunchDetailScreen"
        component={LaunchDetailScreen}
      />
    </Stack.Navigator>
  );
};

export const SearchLaunchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerRight: () => null,
        headerLeft: () => null,
        headerStyle: {
          backgroundColor: '#e25b24',
          height: Platform.OS === 'android' ? 80 : 120,
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poppins-medium',
        },
      }}>
      <Stack.Screen
        name="LaunchSearchScreen"
        component={LaunchSearchScreen}
        options={{
          title: '',
          headerRight: () => <Title className="px-8" />,
          headerLeft: () => <BackScreenOption />,
        }}
      />
      <Stack.Screen
        options={{
          title: 'Destalle de lanzamiento',
          headerLeft: () => <BackScreenOption />, // Back solo en detalle
        }}
        name="LaunchDetailScreen"
        component={LaunchDetailScreen}
      />
    </Stack.Navigator>
  );
};
