import { Barlow_400Regular, Barlow_500Medium, Barlow_600SemiBold } from '@expo-google-fonts/barlow';
import {
  BarlowCondensed_500Medium,
  BarlowCondensed_600SemiBold,
  BarlowCondensed_700Bold,
} from '@expo-google-fonts/barlow-condensed';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    BarlowCondensed_500Medium,
    BarlowCondensed_600SemiBold,
    BarlowCondensed_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Render immediately (required for static web rendering / SEO).
  // On native the splash screen stays visible until fonts are ready.
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          // Smooth native page transition: new page slides in from the right,
          // and swiping from the left edge goes back (iOS).
          animation: 'slide_from_right',
          animationDuration: 260,
          gestureEnabled: true,
        }}
      />
    </>
  );
}
