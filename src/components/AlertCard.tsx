import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { MissionAlert } from '../utils/alertRules';

type AlertCardProps = {
  alert: MissionAlert;
};

export function AlertCard({ alert }: AlertCardProps) {
  const isCritical = alert.type === 'critical';
  const color = isCritical ? colors.danger : colors.warning;

  return (
    <View style={[styles.card, { borderColor: color }]}>
      <View style={styles.header}>
        <Text style={[styles.badge, { color }]}>
          {isCritical ? 'CRÍTICO' : 'AVISO'}
        </Text>
      </View>

      <Text style={styles.title}>{alert.title}</Text>
      <Text style={styles.message}>{alert.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    marginBottom: 14,
  },
  header: {
    marginBottom: 8,
  },
  badge: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  message: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});