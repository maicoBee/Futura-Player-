import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import EpgScreen from './src/screens/EpgScreen';

const Stack = createStackNavigator();

/**
 * Einstiegspunkt der App. Mit dem React‑Navigation‑Stack navigieren wir
 * zwischen den Bildschirmen: Home (Playlist & Kanalauswahl), Player
 * (Videowiedergabe) und EPG (Programmübersicht).
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="EPG" component={EpgScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}