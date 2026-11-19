import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

export default function TabsLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarLabelPosition: "below-icon",
        tabBarHideOnKeyboard: true,
        tabBarStyle: [styles.tabBar, { height: 64 + bottom, paddingBottom: SPACE.xs + bottom }],
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarAccessibilityLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={23} color={typeof color === "string" ? color : COLORS.muted} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Tambah",
          tabBarAccessibilityLabel: "Tambah",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={25} color={typeof color === "string" ? color : COLORS.muted} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorite",
          tabBarAccessibilityLabel: "Favorite",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={23} color={typeof color === "string" ? color : COLORS.muted} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: SPACE.xs,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    minHeight: 48,
  },
  tabLabel: {
    fontSize: TYPO.caption - 1,
    lineHeight: 16,
    fontWeight: "600",
  },
});
