import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Tambah",
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorite",
        }}
      />
    </Tabs>
  );
}
