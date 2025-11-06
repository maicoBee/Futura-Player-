import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';

export default function PlayerScreen({ route, navigation }) {
  const { channel } = route.params;
  if (!channel) {
    return (
      <View style={styles.centered}>
        <Text>Kein Kanal ausgewählt</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{channel.name}</Text>
      <VideoPlayer uri={channel.url} />
      <TouchableOpacity
        style={styles.epgButton}
        onPress={() => navigation.navigate('EPG', { channel })}
      >
        <Text style={styles.epgButtonText}>Programm anzeigen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  epgButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  epgButtonText: {
    color: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});