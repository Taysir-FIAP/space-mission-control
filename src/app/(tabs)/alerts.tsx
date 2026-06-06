import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useMission } from '../../context/MissionContext';
import { AlertCard } from '../../components/AlertCard';

export default function AlertsScreen() {
  const { alerts } = useMission();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>ALERTAS</Text>
      <Text style={styles.title}>Ocorrências da missão</Text>
      <Text style={styles.subtitle}>
        Alertas automáticos são gerados quando os parâmetros atingem níveis críticos.
      </Text>

      {alerts.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhum alerta ativo</Text>
          <Text style={styles.emptyText}>
            Todos os sistemas estão operando dentro dos limites configurados.
          </Text>
        </View>
      ) : (
        alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  emptyBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    color: colors.success,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});