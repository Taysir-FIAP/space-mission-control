import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/colors';
import { useMission } from '../../context/MissionContext';
import { SensorCard } from '../../components/SensorCard';

function getLowValueStatus(value: number, warningLimit: number, criticalLimit: number) {
  if (value <= criticalLimit) return 'critical';
  if (value <= warningLimit) return 'warning';
  return 'normal';
}

function getHighValueStatus(value: number, warningLimit: number, criticalLimit: number) {
  if (value >= criticalLimit) return 'critical';
  if (value >= warningLimit) return 'warning';
  return 'normal';
}

export default function DashboardScreen() {
  const { mission } = useMission();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>DASHBOARD</Text>
      <Text style={styles.title}>Sensores em tempo real</Text>
      <Text style={styles.subtitle}>
        Monitoramento dos principais parâmetros operacionais da missão.
      </Text>

      <SensorCard
        label="Energia"
        value={mission.energy}
        unit="%"
        description="Carga disponível para os sistemas principais."
        status={getLowValueStatus(mission.energy, 40, mission.thresholds.energyCritical)}
      />

      <SensorCard
        label="Oxigênio"
        value={mission.oxygen}
        unit="%"
        description="Nível do sistema de suporte de vida."
        status={getLowValueStatus(mission.oxygen, 85, mission.thresholds.oxygenCritical)}
      />

      <SensorCard
        label="Comunicação"
        value={mission.communication}
        unit="%"
        description="Qualidade do sinal com a central terrestre."
        status={getLowValueStatus(
          mission.communication,
          70,
          mission.thresholds.communicationCritical
        )}
      />

      <SensorCard
        label="Estabilidade orbital"
        value={mission.orbitalStability}
        unit="%"
        description="Precisão da trajetória e estabilidade de órbita."
        status={getLowValueStatus(
          mission.orbitalStability,
          75,
          mission.thresholds.stabilityCritical
        )}
      />

      <SensorCard
        label="Radiação"
        value={mission.radiation}
        unit="%"
        description="Exposição estimada à radiação espacial."
        status={getHighValueStatus(mission.radiation, 45, mission.thresholds.radiationCritical)}
      />

      <SensorCard
        label="Temperatura"
        value={mission.temperature}
        unit="°C"
        description="Temperatura interna dos módulos operacionais."
        status={getHighValueStatus(
          mission.temperature,
          32,
          mission.thresholds.temperatureCritical
        )}
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
});