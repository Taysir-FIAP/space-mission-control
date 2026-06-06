import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useMission } from '../../context/MissionContext';
import { MissionCard } from '../../components/MissionCard';

export default function HomeScreen() {
  const { mission, alerts } = useMission();

const criticalAlerts = alerts.filter((alert) => alert.type === 'critical').length;
const warningAlerts = alerts.filter((alert) => alert.type === 'warning').length;

const generalStatus =
  criticalAlerts > 0
    ? 'Falha Crítica Iminente'
    : warningAlerts > 0
      ? 'Atenção Operacional'
      : 'Operação Normal';

const generalStatusColor =
  criticalAlerts > 0
    ? colors.danger
    : warningAlerts > 0
      ? colors.warning
      : colors.success;
      
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>SPACE MISSION CONTROL</Text>
      <Text style={styles.title}>{mission.missionName}</Text>
      <Text style={styles.subtitle}>
        Central de monitoramento cross-platform para acompanhamento de missão espacial.
      </Text>

      <View style={[styles.statusBox, { borderColor: generalStatusColor }]}>
        <Text style={styles.statusLabel}>Status geral da missão</Text>
        <Text style={[styles.statusValue, { color: generalStatusColor }]}>
          {generalStatus}
        </Text>
      </View>

      <MissionCard
        title="Operador responsável"
        value={mission.operatorName}
        subtitle="Equipe conectada ao painel principal"
      />

      <MissionCard
        title="Energia disponível"
        value={`${mission.energy}%`}
        subtitle="Sistema de alimentação da nave"
      />

      <MissionCard
        title="Comunicação"
        value={`${mission.communication}%`}
        subtitle="Qualidade do sinal com a base"
      />

      <MissionCard
        title="Alertas ativos"
        value={alerts.length}
        subtitle={
          alerts.length > 0
            ? 'Existem ocorrências que precisam de atenção'
            : 'Nenhum alerta crítico no momento'
        }
      />
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  statusBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  statusLabel: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 6,
  },
  statusValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});