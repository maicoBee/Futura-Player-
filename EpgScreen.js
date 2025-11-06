import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

/**
 * EPG‑Screen zeigt die Programmübersicht für einen ausgewählten Kanal. Das
 * XMLTV‑Format wird geparst, und die Sendungen werden nach Startzeit
 * sortiert angezeigt. Für eine vollständige Lösung müssen Sie die
 * Kanal‑ID der Playlist mit der EPG‑Datei abgleichen und die
 * Zeitzone berücksichtigen【402315506996525†L270-L306】.
 */
export default function EpgScreen({ route }) {
  const channel = route?.params?.channel;
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEpg() {
      try {
        // TODO: Ersetzen Sie diese URL durch den Pfad zu Ihrer XMLTV‑Datei.
        const epgUrl = 'https://example.com/epg.xml';
        const response = await axios.get(epgUrl);
        const parser = new XMLParser({ ignoreAttributes: false });
        const jsonObj = parser.parse(response.data);
        /**
         * Die Struktur einer XMLTV‑Datei:
         * {
         *   tv: {
         *     channel: [ ... ],
         *     programme: [ { '@_start': '20250101T000000 +0200', '@_stop': '...', '@_channel': 'ChannelID', title: '...', desc: '...' } ]
         *   }
         * }
         */
        const allPrograms = jsonObj?.tv?.programme || [];
        let filtered = allPrograms;
        if (channel) {
          filtered = allPrograms.filter((p) => p['@_channel'] === channel.name || p['@_channel'] === channel.tvgId);
        }
        // Sortiere nach Startzeit
        filtered.sort((a, b) => (a['@_start'] > b['@_start'] ? 1 : -1));
        setPrograms(filtered);
      } catch (error) {
        console.error('EPG konnte nicht geladen werden:', error.message);
        Alert.alert('Fehler', 'Die EPG‑Datei konnte nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    }
    fetchEpg();
  }, [channel]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.time}>{item['@_start']} – {item['@_stop']}</Text>
      <Text style={styles.description}>{item.desc}</Text>
    </View>
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
        data={programs}
        keyExtractor={(item, index) => item['@_start'] + index}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  item: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    color: '#666',
  },
  description: {
    color: '#333',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});