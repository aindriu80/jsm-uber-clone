import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    JakartaBold: require("../assets/fonts/PlusJakartaSansBold.ttf"),
    JakartaExtraBold: require("../assets/fonts/PlusJakartaSansExtraBold.ttf"),
    JakartaExtraLight: require("../assets/fonts/PlusJakartaSansExtraLight.ttf"),
    JakartaLight: require("../assets/fonts/PlusJakartaSansLight.ttf"),
    JakartaMedium: require("../assets/fonts/PlusJakartaSansMedium.ttf"),
    JakartaSemiBold: require("../assets/fonts/PlusJakartaSansSemiBold.ttf"),
  });

  // Define a function to handle hiding the splash screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      console.log("Fonts loaded successfully.");
      // Hide splash screen only when fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen when fonts are loaded
      onLayoutRootView();
    } else {
      console.log("Fonts not loaded yet.");
    }
  }, [fontsLoaded, onLayoutRootView]);

  if (!fontsLoaded) {
    console.log("Fonts are not loaded yet.");
    return null;
  }

  return (
    <Stack onLayout={onLayoutRootView}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
