import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./screens/Home";
import HomeScreen2 from "./screens/Home2";
import IssLocationScreen from "./screens/IssLocation";
import MeteorScreen from "./screens/Meteors";
import UpdateScreen from "./screens/Updates";
import DailyPicScreens from './screens/DailyPic';
import SpaceCraftsScreen from './screens/SpaceCrafts';
import StarMapScreen from './screens/StarMap';

const Stack = createStackNavigator()

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home' 
        screenOptions={{headerShown:false}}>
          <Stack.Screen
            name='Home' component={HomeScreen}
          />
          <Stack.Screen
            name='Home2' component={HomeScreen2}
          />

          <Stack.Screen
            name='Iss Location' component={IssLocationScreen}
          />
          <Stack.Screen
            name='Meteors' component={MeteorScreen}
          />
          <Stack.Screen
            name='Updates' component={UpdateScreen}
          />
          
          <Stack.Screen 
            name='Daily Pics' component={DailyPicScreens} 
          />

          <Stack.Screen 
            name='Space Crafts' component={SpaceCraftsScreen} 
          />
          <Stack.Screen 
            name='Star Map' component={StarMapScreen}
          />

      </Stack.Navigator>
    </NavigationContainer>
  ); 
}

export default App;
