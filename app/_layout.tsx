import "react-native-reanimated";
import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import { tokenCache } from "@/lib/auth";
import { LogBox } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(console.warn);

LogBox.ignoreLogs(["Warning: ..."]);

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded, error] = useFonts({
    JakartaBold: require("../assets/fonts/PlusJakartaSansBold.ttf"),
    JakartaExtraBold: require("../assets/fonts/PlusJakartaSansExtraBold.ttf"),
    JakartaExtraLight: require("../assets/fonts/PlusJakartaSansExtraLight.ttf"),
    JakartaLight: require("../assets/fonts/PlusJakartaSansLight.ttf"),
    JakartaMedium: require("../assets/fonts/PlusJakartaSansMedium.ttf"),
    JakartaSemiBold: require("../assets/fonts/PlusJakartaSansSemiBold.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
    }
  }, [error]);

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
    );
  }
  // Define a function to handle hiding the splash screen
LogBox.ignoreLogs(["Clerk:"]);
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
  }, [error, fontsLoaded, onLayoutRootView]);

  if (!fontsLoaded) {
    console.log("Fonts are not loaded yet.");
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
