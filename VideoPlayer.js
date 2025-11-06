import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';

/**
 * Ein wrapper um `react-native-video`, der während des Ladens einen
 * Ladeindikator anzeigt. Für 4K‑Streams muss die zugrunde liegende
 * Hardware H.265/HEVC unterstützen. `react-native-video` nutzt
 * ExoPlayer (Android) bzw. AVPlayer (iOS) und übernimmt die HLS‑
 * Dekodierung.
 */
export default function VideoPlayer({ uri, onBuffer, onError }) {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri }}
        style={styles.video}
        controls
        resizeMode="contain"
        onBuffer={onBuffer}
        onError={onError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});