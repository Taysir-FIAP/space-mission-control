import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

type MissionCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export function MissionCard({ title, value, subtitle }: MissionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  title: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 6,
  },
  value: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.primary,
    fontSize: 13,
    marginTop: 6,
  },
});