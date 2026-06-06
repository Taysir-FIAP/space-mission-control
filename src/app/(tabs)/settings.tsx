import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { useMission } from '../../context/MissionContext';

type ThresholdForm = {
  energyWarning: string;
  energyCritical: string;

  temperatureWarning: string;
  temperatureCritical: string;

  oxygenWarning: string;
  oxygenCritical: string;

  communicationWarning: string;
  communicationCritical: string;

  stabilityWarning: string;
  stabilityCritical: string;

  radiationWarning: string;
  radiationCritical: string;
};

const defaultThresholds: ThresholdForm = {
  energyWarning: '40',
  energyCritical: '20',

  temperatureWarning: '32',
  temperatureCritical: '40',

  oxygenWarning: '85',
  oxygenCritical: '75',

  communicationWarning: '70',
  communicationCritical: '50',

  stabilityWarning: '75',
  stabilityCritical: '60',

  radiationWarning: '45',
  radiationCritical: '70',
};

export default function SettingsScreen() {
  const { mission, updateMission, updateThresholds, resetMission } = useMission();

  const [thresholds, setThresholds] = useState<ThresholdForm>({
    energyWarning: String(mission.thresholds.energyWarning),
    energyCritical: String(mission.thresholds.energyCritical),

    temperatureWarning: String(mission.thresholds.temperatureWarning),
    temperatureCritical: String(mission.thresholds.temperatureCritical),

    oxygenWarning: String(mission.thresholds.oxygenWarning),
    oxygenCritical: String(mission.thresholds.oxygenCritical),

    communicationWarning: String(mission.thresholds.communicationWarning),
    communicationCritical: String(mission.thresholds.communicationCritical),

    stabilityWarning: String(mission.thresholds.stabilityWarning),
    stabilityCritical: String(mission.thresholds.stabilityCritical),

    radiationWarning: String(mission.thresholds.radiationWarning),
    radiationCritical: String(mission.thresholds.radiationCritical),
  });

  function updateThresholdField(field: keyof ThresholdForm, value: string) {
    setThresholds((previousThresholds) => ({
      ...previousThresholds,
      [field]: value,
    }));
  }

  function isInvalidNumber(value: string) {
    const parsedValue = Number(value);
    return value.trim() === '' || Number.isNaN(parsedValue) || parsedValue < 0 || parsedValue > 100;
  }

  function validateThresholdLogic() {
    const energyWarning = Number(thresholds.energyWarning);
    const energyCritical = Number(thresholds.energyCritical);

    const temperatureWarning = Number(thresholds.temperatureWarning);
    const temperatureCritical = Number(thresholds.temperatureCritical);

    const oxygenWarning = Number(thresholds.oxygenWarning);
    const oxygenCritical = Number(thresholds.oxygenCritical);

    const communicationWarning = Number(thresholds.communicationWarning);
    const communicationCritical = Number(thresholds.communicationCritical);

    const stabilityWarning = Number(thresholds.stabilityWarning);
    const stabilityCritical = Number(thresholds.stabilityCritical);

    const radiationWarning = Number(thresholds.radiationWarning);
    const radiationCritical = Number(thresholds.radiationCritical);

    if (energyWarning <= energyCritical) {
      return 'Na energia, o limite de atenção deve ser maior que o limite crítico.';
    }

    if (oxygenWarning <= oxygenCritical) {
      return 'No oxigênio, o limite de atenção deve ser maior que o limite crítico.';
    }

    if (communicationWarning <= communicationCritical) {
      return 'Na comunicação, o limite de atenção deve ser maior que o limite crítico.';
    }

    if (stabilityWarning <= stabilityCritical) {
      return 'Na estabilidade orbital, o limite de atenção deve ser maior que o limite crítico.';
    }

    if (temperatureWarning >= temperatureCritical) {
      return 'Na temperatura, o limite de atenção deve ser menor que o limite crítico.';
    }

    if (radiationWarning >= radiationCritical) {
      return 'Na radiação, o limite de atenção deve ser menor que o limite crítico.';
    }

    return null;
  }

  function handleSaveThresholds() {
    const hasInvalidField = Object.values(thresholds).some(isInvalidNumber);

    if (hasInvalidField) {
      Alert.alert(
        'Limiares inválidos',
        'Todos os limites devem ser números entre 0 e 100.'
      );
      return;
    }

    const logicError = validateThresholdLogic();

    if (logicError) {
      Alert.alert('Lógica inválida', logicError);
      return;
    }

    updateThresholds({
      energyWarning: Number(thresholds.energyWarning),
      energyCritical: Number(thresholds.energyCritical),

      temperatureWarning: Number(thresholds.temperatureWarning),
      temperatureCritical: Number(thresholds.temperatureCritical),

      oxygenWarning: Number(thresholds.oxygenWarning),
      oxygenCritical: Number(thresholds.oxygenCritical),

      communicationWarning: Number(thresholds.communicationWarning),
      communicationCritical: Number(thresholds.communicationCritical),

      stabilityWarning: Number(thresholds.stabilityWarning),
      stabilityCritical: Number(thresholds.stabilityCritical),

      radiationWarning: Number(thresholds.radiationWarning),
      radiationCritical: Number(thresholds.radiationCritical),
    });

    Alert.alert('Configurações salvas', 'Os novos limiares foram aplicados à missão.');
  }

  function handleResetMission() {
    resetMission();
    setThresholds(defaultThresholds);

    Alert.alert(
      'Missão resetada',
      'Os dados da missão foram restaurados para os valores iniciais.'
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>CONFIGURAÇÕES</Text>
      <Text style={styles.title}>Controle da central</Text>
      <Text style={styles.subtitle}>
        Configure alertas automáticos, níveis de atenção, limites críticos e persistência local da
        missão.
      </Text>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <View style={styles.switchTextBox}>
            <Text style={styles.cardTitle}>Alertas automáticos</Text>
            <Text style={styles.cardDescription}>
              Quando ativado, o sistema gera avisos e ocorrências críticas automaticamente ao
              detectar parâmetros fora dos limites.
            </Text>
          </View>

          <Switch
            value={mission.autoAlertsEnabled}
            onValueChange={(value) => updateMission({ autoAlertsEnabled: value })}
            trackColor={{
              false: colors.surfaceLight,
              true: colors.primary,
            }}
            thumbColor={colors.text}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Limiares de atenção e criticidade</Text>
        <Text style={styles.cardDescription}>
          Configure quando um parâmetro deve ficar em atenção, amarelo, ou crítico, vermelho.
        </Text>

        <ThresholdPair
          title="Energia"
          description="Valores baixos indicam risco de perda de alimentação dos sistemas."
          warningLabel="Atenção quando estiver abaixo de ou igual a (%)"
          criticalLabel="Crítico quando estiver abaixo de ou igual a (%)"
          warningValue={thresholds.energyWarning}
          criticalValue={thresholds.energyCritical}
          onChangeWarning={(value) => updateThresholdField('energyWarning', value)}
          onChangeCritical={(value) => updateThresholdField('energyCritical', value)}
        />

        <ThresholdPair
          title="Temperatura"
          description="Valores altos podem indicar superaquecimento dos módulos."
          warningLabel="Atenção quando estiver acima de ou igual a (°C)"
          criticalLabel="Crítico quando estiver acima de ou igual a (°C)"
          warningValue={thresholds.temperatureWarning}
          criticalValue={thresholds.temperatureCritical}
          onChangeWarning={(value) => updateThresholdField('temperatureWarning', value)}
          onChangeCritical={(value) => updateThresholdField('temperatureCritical', value)}
        />

        <ThresholdPair
          title="Oxigênio"
          description="Valores baixos indicam risco no sistema de suporte de vida."
          warningLabel="Atenção quando estiver abaixo de ou igual a (%)"
          criticalLabel="Crítico quando estiver abaixo de ou igual a (%)"
          warningValue={thresholds.oxygenWarning}
          criticalValue={thresholds.oxygenCritical}
          onChangeWarning={(value) => updateThresholdField('oxygenWarning', value)}
          onChangeCritical={(value) => updateThresholdField('oxygenCritical', value)}
        />

        <ThresholdPair
          title="Comunicação"
          description="Valores baixos indicam instabilidade no contato com a base."
          warningLabel="Atenção quando estiver abaixo de ou igual a (%)"
          criticalLabel="Crítico quando estiver abaixo de ou igual a (%)"
          warningValue={thresholds.communicationWarning}
          criticalValue={thresholds.communicationCritical}
          onChangeWarning={(value) => updateThresholdField('communicationWarning', value)}
          onChangeCritical={(value) => updateThresholdField('communicationCritical', value)}
        />

        <ThresholdPair
          title="Estabilidade orbital"
          description="Valores baixos indicam risco de perda de estabilidade da órbita."
          warningLabel="Atenção quando estiver abaixo de ou igual a (%)"
          criticalLabel="Crítico quando estiver abaixo de ou igual a (%)"
          warningValue={thresholds.stabilityWarning}
          criticalValue={thresholds.stabilityCritical}
          onChangeWarning={(value) => updateThresholdField('stabilityWarning', value)}
          onChangeCritical={(value) => updateThresholdField('stabilityCritical', value)}
        />

        <ThresholdPair
          title="Radiação"
          description="Valores altos indicam exposição perigosa para sistemas e tripulação."
          warningLabel="Atenção quando estiver acima de ou igual a (%)"
          criticalLabel="Crítico quando estiver acima de ou igual a (%)"
          warningValue={thresholds.radiationWarning}
          criticalValue={thresholds.radiationCritical}
          onChangeWarning={(value) => updateThresholdField('radiationWarning', value)}
          onChangeCritical={(value) => updateThresholdField('radiationCritical', value)}
        />

        <Pressable style={styles.primaryButton} onPress={handleSaveThresholds}>
          <Text style={styles.primaryButtonText}>Salvar limiares</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Persistência local</Text>
        <Text style={styles.cardDescription}>
          Os dados da missão e configurações são salvos localmente com AsyncStorage. Ao fechar e
          abrir o app, o estado anterior é recuperado.
        </Text>

        <Pressable style={styles.dangerButton} onPress={handleResetMission}>
          <Text style={styles.dangerButtonText}>Resetar missão</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

type ThresholdPairProps = {
  title: string;
  description: string;
  warningLabel: string;
  criticalLabel: string;
  warningValue: string;
  criticalValue: string;
  onChangeWarning: (value: string) => void;
  onChangeCritical: (value: string) => void;
};

function ThresholdPair({
  title,
  description,
  warningLabel,
  criticalLabel,
  warningValue,
  criticalValue,
  onChangeWarning,
  onChangeCritical,
}: ThresholdPairProps) {
  return (
    <View style={styles.thresholdBox}>
      <Text style={styles.thresholdTitle}>{title}</Text>
      <Text style={styles.thresholdDescription}>{description}</Text>

      <View style={styles.fieldsGrid}>
        <View style={styles.fieldGroup}>
          <Text style={styles.warningLabel}>{warningLabel}</Text>
          <TextInput
            style={[styles.input, styles.warningInput]}
            value={warningValue}
            onChangeText={onChangeWarning}
            keyboardType="numeric"
            placeholder="0 a 100"
            placeholderTextColor={colors.muted}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.criticalLabel}>{criticalLabel}</Text>
          <TextInput
            style={[styles.input, styles.criticalInput]}
            value={criticalValue}
            onChangeText={onChangeCritical}
            keyboardType="numeric"
            placeholder="0 a 100"
            placeholderTextColor={colors.muted}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 110,
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchTextBox: {
    flex: 1,
    marginRight: 14,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  thresholdBox: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  thresholdTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  thresholdDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  fieldsGrid: {
    gap: 12,
  },
  fieldGroup: {
    marginBottom: 2,
  },
  warningLabel: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  criticalLabel: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 15,
  },
  warningInput: {
    borderColor: colors.warning,
  },
  criticalInput: {
    borderColor: colors.danger,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  dangerButtonText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: 'bold',
  },
});