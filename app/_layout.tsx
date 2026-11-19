import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { COLORS, TYPO } from "../src/styles/tokens";

export default function RootLayout() {
  const [iconsLoaded, iconError] = useFonts(Ionicons.font);

  if (!iconsLoaded && !iconError) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.heroStart },
          headerTintColor: COLORS.white,
          headerTitleStyle: { color: COLORS.white, fontSize: TYPO.title, fontWeight: "600" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="detail/[id]"
          options={{
            title: "Detail Diary",
          }}
        />

        <Stack.Screen
          name="edit/[id]"
          options={{
            title: "Edit Diary",
          }}
        />
      </Stack>
    </Provider>
  );
}
