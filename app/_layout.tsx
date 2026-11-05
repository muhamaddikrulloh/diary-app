import { Stack } from "expo-router";
import { DiaryProvider } from "../src/context/DiaryContext";
import { COLORS } from "../src/styles/tokens";

export default function RootLayout() {
  return (
    <DiaryProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontWeight: "600", fontSize: 17 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail/[id]" options={{ title: "Detail Diary" }} />
      </Stack>
    </DiaryProvider>
  );
}
