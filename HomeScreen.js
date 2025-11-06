import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

import { parseM3U } from '../utils/playlistParser';

/**
 * HomeScreen lädt die Playlist vom angegebenen URL (M3U/M3U8) und listet die
 * Kanäle. Durch Antippen eines Eintrags navigiert der Benutzer zum
 * PlayerScreen. Für private Zwecke können Sie die URL über eine
 * Umgebungsvariable oder einen lokalen Speicher konfigurieren.
 */
export default function HomeScreen({ navigation }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        // TODO: Ersetzen Sie diese URL durch Ihre eigene M3U/M3U8‑Datei oder Xtream‑Link.
        const playlistUrl = 'https://example.com/playlist.m3u';
        const response = await axios.get(playlistUrl);
        const parsed = parseM3U(response.data);
        setChannels(parsed);
      } catch (error) {
        console.error('Playlist konnte nicht geladen werden:', error.message);
        Alert.alert('Fehler', 'Die Playlist konnte nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylist();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Player', { channel: item })}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={channels}
        keyExtractor={(item, index) => item.url + index}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.epgButton}
        onPress={() => navigation.navigate('EPG')}
      >
        <Text style={styles.epgButtonText}>EPG anzeigen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  epgButton: {
    padding: 16,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  epgButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});