import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { useMission } from '../../context/MissionContext';
import {
  MissionFormData,
  MissionFormErrors,
  validateMissionForm,
} from '../../utils/validations';

export default function MissionScreen() {
  const { mission, updateMission } = useMission();

  const [form, setForm] = useState<MissionFormData>({
    missionName: mission.missionName,
    operatorName: mission.operatorName,
    energy: String(mission.energy),
    temperature: String(mission.temperature),
    oxygen: String(mission.oxygen),
    communication: String(mission.communication),
    orbitalStability: String(mission.orbitalStability),
    radiation: String(mission.radiation),
  });

  const [errors, setErrors] = useState<MissionFormErrors>({});

  useEffect(() => {
  setForm({
    missionName: mission.missionName,
    operatorName: mission.operatorName,
    energy: String(mission.energy),
    temperature: String(mission.temperature),
    oxygen: String(mission.oxygen),
    communication: String(mission.communication),
    orbitalStability: String(mission.orbitalStability),
    radiation: String(mission.radiation),
  });
}, [mission]);

  function updateField(field: keyof MissionFormData, value: string) {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [field]: undefined,
      }));
    }
  }

  function handleSubmit() {
    const validationErrors = validateMissionForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Alert.alert('Dados inválidos', 'Corrija os campos destacados antes de salvar.');
      return;
    }

    updateMission({
      missionName: form.missionName.trim(),
      operatorName: form.operatorName.trim(),
      energy: Number(form.energy),
      temperature: Number(form.temperature),
      oxygen: Number(form.oxygen),
      communication: Number(form.communication),
      orbitalStability: Number(form.orbitalStability),
      radiation: Number(form.radiation),
    });

    Alert.alert('Missão atualizada', 'Os dados foram salvos com sucesso.');
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>MISSÃO</Text>
        <Text style={styles.title}>Atualizar dados da missão</Text>
        <Text style={styles.subtitle}>
          Altere os parâmetros operacionais. Os dados são validados, salvos localmente e usados
          para gerar alertas automáticos.
        </Text>

        <View style={styles.formBox}>
          <InputField
            label="Nome da missão"
            value={form.missionName}
            error={errors.missionName}
            onChangeText={(value) => updateField('missionName', value)}
            placeholder="Ex: Orbital Guardian"
          />

          <InputField
            label="Operador responsável"
            value={form.operatorName}
            error={errors.operatorName}
            onChangeText={(value) => updateField('operatorName', value)}
            placeholder="Ex: Equipe FIAP"
          />

          <InputField
            label="Energia (%)"
            value={form.energy}
            error={errors.energy}
            onChangeText={(value) => updateField('energy', value)}
            placeholder="0 a 100"
            keyboardType="numeric"
          />

          <InputField
            label="Temperatura interna (°C)"
            value={form.temperature}
            error={errors.temperature}
            onChangeText={(value) => updateField('temperature', value)}
            placeholder="-50 a 100"
            keyboardType="numeric"
          />

          <InputField
            label="Oxigênio (%)"
            value={form.oxygen}
            error={errors.oxygen}
            onChangeText={(value) => updateField('oxygen', value)}
            placeholder="0 a 100"
            keyboardType="numeric"
          />

          <InputField
            label="Comunicação (%)"
            value={form.communication}
            error={errors.communication}
            onChangeText={(value) => updateField('communication', value)}
            placeholder="0 a 100"
            keyboardType="numeric"
          />

          <InputField
            label="Estabilidade orbital (%)"
            value={form.orbitalStability}
            error={errors.orbitalStability}
            onChangeText={(value) => updateField('orbitalStability', value)}
            placeholder="0 a 100"
            keyboardType="numeric"
          />

          <InputField
            label="Radiação (%)"
            value={form.radiation}
            error={errors.radiation}
            onChangeText={(value) => updateField('radiation', value)}
            placeholder="0 a 100"
            keyboardType="numeric"
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar dados da missão</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric';
  onChangeText: (value: string) => void;
};

function InputField({
  label,
  value,
  error,
  placeholder,
  keyboardType = 'default',
  onChangeText,
}: InputFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  formBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 15,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 6,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: 'bold',
  },
});