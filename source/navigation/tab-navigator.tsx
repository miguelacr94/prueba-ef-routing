import { createStackNavigator } from '@react-navigation/stack';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationType';

// Screens
import PastLaunchScreen from '../screens/launch/past-launch-screen';
import NextLaunchScreen from '../screens/launch/next-launch-screen';
import LaunchDetailScreen from '../screens/launch/launch-detail-screen';
import SearchLaunchScreen from '../screens/launch/search-screen';

// Components
import SearchOption from '../components/header/search-option';
import BackScreenOption from '../components/ui/back-screen-option';
import Title from '../components/header/title';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Configuración común de header
const commonHeaderOptions = {
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
};

const PastLaunchStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...commonHeaderOptions,
      animationTypeForReplace: 'push',
      animation: 'slide_from_right',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
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
        title: '',
      }}
    />
    <Stack.Screen
      name="LaunchDetailScreen"
      component={LaunchDetailScreen as React.ComponentType}
      options={{
        title: 'Detalle de lanzamiento',
        headerTitleStyle: { fontFamily: 'Poppins-medium', fontSize: 18 },
        headerLeft: () => (
          <View className="">
            <BackScreenOption />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="LaunchSearchScreen"
      component={SearchLaunchScreen}
      options={{
        title: 'Buscar lanzamientos',
        headerTitleStyle: { fontFamily: 'Poppins-medium', fontSize: 18 },
        headerLeft: () => (
          <View className="">
            <BackScreenOption />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

// Stack para Next Launches (similar al anterior)
const NextLaunchStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...commonHeaderOptions,
      animationTypeForReplace: 'push',
      animation: 'slide_from_right',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
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
        title: '',
      }}
    />
    <Stack.Screen
      name="LaunchDetailScreen"
      component={LaunchDetailScreen as React.ComponentType}
      options={{
        title: 'Detalle de lanzamiento',
        headerTitleStyle: { fontFamily: 'Poppins-medium', fontSize: 18 },
        headerLeft: () => (
          <View className="">
            <BackScreenOption />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="LaunchSearchScreen"
      component={SearchLaunchScreen}
      options={{
        title: 'Buscar lanzamientos',
        headerTitleStyle: { fontFamily: 'Poppins-medium', fontSize: 18 },
        headerLeft: () => (
          <View className="">
            <BackScreenOption />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

export function BottomTabNavigator() {
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'LaunchPastScreen';
    return routeName !== 'LaunchDetailScreen' && routeName !== 'LaunchSearchScreen';
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopWidth: 1,
          borderTopColor: '#334155',
          display: getTabBarVisibility(route) ? 'flex' : 'none',
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          height: Platform.OS === 'ios' ? 85 : 60,
        },
        tabBarIcon: ({ focused }) => {
          let iconName = 'rocket-outline';
          if (focused) iconName = 'rocket';

          return (
            <View
              className={`
                ${focused ? 'bg-blue-600 shadow-lg shadow-blue-500/25' : 'bg-transparent'} 
                items-center justify-center rounded-full
                ${focused ? '-mt-2 h-14 w-14' : 'h-8 w-8'}
              `}>
              <Ionicons
                /* @ts-ignore */
                name={iconName}
                size={focused ? 22 : 18}
                color={focused ? '#ffffff' : '#94a3b8'}
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
        options={{ title: 'Pasados' }}
        component={PastLaunchStack}
      />
      <Tab.Screen
        name="LaunchFutureScreen"
        options={{ title: 'Próximos' }}
        component={NextLaunchStack}
      />
    </Tab.Navigator>
  );
}
