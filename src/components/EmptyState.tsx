import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  compact?: boolean;
};

export default function EmptyState({ icon, title, description, compact = false }: Props) {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <View style={[styles.iconWrap, compact && styles.compactIconWrap]}>
        <Ionicons name={icon} size={compact ? 22 : 28} color={COLORS.accent} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: SPACE.xl,
    paddingVertical: SPACE.xxxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  compactContainer: {
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.xl,
    borderWidth: 0,
  },
  iconWrap: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACE.l,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accentSoft,
  },
  compactIconWrap: {
    width: 48,
    height: 48,
    marginBottom: SPACE.m,
  },
  title: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    maxWidth: 280,
    marginTop: SPACE.s,
    color: COLORS.muted,
    fontSize: TYPO.body,
    lineHeight: 22,
    textAlign: "center",
  },
});
