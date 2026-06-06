export type MissionFormData = {
  missionName: string;
  operatorName: string;
  energy: string;
  temperature: string;
  oxygen: string;
  communication: string;
  orbitalStability: string;
  radiation: string;
};

export type MissionFormErrors = Partial<Record<keyof MissionFormData, string>>;

export function validateMissionForm(data: MissionFormData): MissionFormErrors {
  const errors: MissionFormErrors = {};

  if (!data.missionName.trim()) {
    errors.missionName = 'O nome da missão é obrigatório.';
  } else if (data.missionName.trim().length < 3) {
    errors.missionName = 'O nome da missão deve ter pelo menos 3 caracteres.';
  }

  if (!data.operatorName.trim()) {
    errors.operatorName = 'O nome do operador é obrigatório.';
  } else if (data.operatorName.trim().length < 3) {
    errors.operatorName = 'O operador deve ter pelo menos 3 caracteres.';
  }

  validatePercentage(data.energy, 'energy', 'Energia', errors);
  validateTemperature(data.temperature, errors);
  validatePercentage(data.oxygen, 'oxygen', 'Oxigênio', errors);
  validatePercentage(data.communication, 'communication', 'Comunicação', errors);
  validatePercentage(data.orbitalStability, 'orbitalStability', 'Estabilidade orbital', errors);
  validatePercentage(data.radiation, 'radiation', 'Radiação', errors);

  return errors;
}

function validatePercentage(
  value: string,
  field: keyof MissionFormData,
  label: string,
  errors: MissionFormErrors
) {
  const numberValue = Number(value);

  if (value.trim() === '') {
    errors[field] = `${label} é obrigatório.`;
    return;
  }

  if (Number.isNaN(numberValue)) {
    errors[field] = `${label} deve ser um número.`;
    return;
  }

  if (numberValue < 0 || numberValue > 100) {
    errors[field] = `${label} deve estar entre 0 e 100.`;
  }
}

function validateTemperature(value: string, errors: MissionFormErrors) {
  const numberValue = Number(value);

  if (value.trim() === '') {
    errors.temperature = 'Temperatura é obrigatória.';
    return;
  }

  if (Number.isNaN(numberValue)) {
    errors.temperature = 'Temperatura deve ser um número.';
    return;
  }

  if (numberValue < -50 || numberValue > 100) {
    errors.temperature = 'Temperatura deve estar entre -50°C e 100°C.';
  }
}