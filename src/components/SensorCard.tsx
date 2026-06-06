import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

type SensorStatus = 'normal' | 'warning' | 'critical';

type SensorCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  description: string;
  status: SensorStatus;
};

export function SensorCard({ label, value, unit = '', description, status }: SensorCardProps) {
  const statusColor =
    status === 'critical'
      ? colors.danger
      : status === 'warning'
        ? colors.warning
        : colors.success;

  const statusLabel =
    status === 'critical'
      ? 'Crítico'
      : status === 'warning'
        ? 'Atenção'
        : 'Normal';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.statusBadge, { borderColor: statusColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
      </View>

      <Text style={styles.value}>
        {value}
        {unit}
      </Text>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Number(value)}%`,
              backgroundColor: statusColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },
  progressBackground: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceLight,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
});