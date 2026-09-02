import { View } from 'react-native';

import { Colors } from '@/constants/theme';

/** Embeds a GAF web widget on web via iframe. */
export function GafWidget({ url, title }: { url: string; title: string }) {
  return (
    <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: Colors.white }}>
      <iframe src={url} title={title} style={{ width: '100%', height: 1000, border: 'none', display: 'block' }} />
    </View>
  );
}
