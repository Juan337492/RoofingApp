import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { Colors } from '@/constants/theme';

/** Embeds a GAF web widget on iOS/Android via WebView. */
export function GafWidget({ url, title }: { url: string; title: string }) {
  return (
    <View style={{ height: 1000, borderRadius: 8, overflow: 'hidden', backgroundColor: Colors.white }}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        injectedJavaScript={`
          const meta = document.createElement('meta');
          meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          meta.setAttribute('name', 'viewport');
          document.getElementsByTagName('head')[0].appendChild(meta);
          true;
        `}
        scrollEnabled
        scalesPageToFit={false}
        startInLoadingState
        accessibilityLabel={title}
      />
    </View>
  );
}
