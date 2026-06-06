export type MissionData = {
  missionName: string;
  operatorName: string;
  energy: number;
  temperature: number;
  oxygen: number;
  communication: number;
  orbitalStability: number;
  radiation: number;
  autoAlertsEnabled: boolean;
  thresholds: {
    energyWarning: number;
    energyCritical: number;

    temperatureWarning: number;
    temperatureCritical: number;

    oxygenWarning: number;
    oxygenCritical: number;

    communicationWarning: number;
    communicationCritical: number;

    stabilityWarning: number;
    stabilityCritical: number;

    radiationWarning: number;
    radiationCritical: number;
  };
};

export type MissionAlert = {
  id: string;
  type: 'critical' | 'warning';
  title: string;
  message: string;
};

export function generateAlerts(mission: MissionData): MissionAlert[] {
  if (!mission.autoAlertsEnabled) {
    return [];
  }

  const alerts: MissionAlert[] = [];
  const { thresholds } = mission;

  addLowValueAlert({
    alerts,
    id: 'energy',
    value: mission.energy,
    warningLimit: thresholds.energyWarning,
    criticalLimit: thresholds.energyCritical,
    criticalTitle: 'Energia crítica',
    warningTitle: 'Energia em atenção',
    unit: '%',
    criticalMessage: `Nível de energia em ${mission.energy}%. Recarregamento emergencial recomendado.`,
    warningMessage: `Nível de energia em ${mission.energy}%. Monitorar consumo dos sistemas principais.`,
  });

  addHighValueAlert({
    alerts,
    id: 'temperature',
    value: mission.temperature,
    warningLimit: thresholds.temperatureWarning,
    criticalLimit: thresholds.temperatureCritical,
    criticalTitle: 'Temperatura crítica',
    warningTitle: 'Temperatura em atenção',
    unit: '°C',
    criticalMessage: `Temperatura interna em ${mission.temperature}°C. Risco aos sistemas da missão.`,
    warningMessage: `Temperatura interna em ${mission.temperature}°C. Recomendada verificação térmica.`,
  });

  addLowValueAlert({
    alerts,
    id: 'oxygen',
    value: mission.oxygen,
    warningLimit: thresholds.oxygenWarning,
    criticalLimit: thresholds.oxygenCritical,
    criticalTitle: 'Oxigênio crítico',
    warningTitle: 'Oxigênio em atenção',
    unit: '%',
    criticalMessage: `Nível de oxigênio em ${mission.oxygen}%. Verificar suporte de vida imediatamente.`,
    warningMessage: `Nível de oxigênio em ${mission.oxygen}%. Monitorar sistema de suporte de vida.`,
  });

  addLowValueAlert({
    alerts,
    id: 'communication',
    value: mission.communication,
    warningLimit: thresholds.communicationWarning,
    criticalLimit: thresholds.communicationCritical,
    criticalTitle: 'Comunicação crítica',
    warningTitle: 'Comunicação instável',
    unit: '%',
    criticalMessage: `Sinal de comunicação em ${mission.communication}%. Contato com a base em risco.`,
    warningMessage: `Sinal de comunicação em ${mission.communication}%. Possível instabilidade no canal.`,
  });

  addLowValueAlert({
    alerts,
    id: 'stability',
    value: mission.orbitalStability,
    warningLimit: thresholds.stabilityWarning,
    criticalLimit: thresholds.stabilityCritical,
    criticalTitle: 'Instabilidade orbital crítica',
    warningTitle: 'Estabilidade orbital em atenção',
    unit: '%',
    criticalMessage: `Estabilidade orbital em ${mission.orbitalStability}%. Correção de rota necessária.`,
    warningMessage: `Estabilidade orbital em ${mission.orbitalStability}%. Acompanhar trajetória da missão.`,
  });

  addHighValueAlert({
    alerts,
    id: 'radiation',
    value: mission.radiation,
    warningLimit: thresholds.radiationWarning,
    criticalLimit: thresholds.radiationCritical,
    criticalTitle: 'Radiação crítica',
    warningTitle: 'Radiação em atenção',
    unit: '%',
    criticalMessage: `Radiação em ${mission.radiation}%. Ativar protocolo de proteção.`,
    warningMessage: `Radiação em ${mission.radiation}%. Monitorar exposição da tripulação e equipamentos.`,
  });

  return alerts;
}

type LowValueAlertParams = {
  alerts: MissionAlert[];
  id: string;
  value: number;
  warningLimit: number;
  criticalLimit: number;
  criticalTitle: string;
  warningTitle: string;
  unit: string;
  criticalMessage: string;
  warningMessage: string;
};

function addLowValueAlert({
  alerts,
  id,
  value,
  warningLimit,
  criticalLimit,
  criticalTitle,
  warningTitle,
  criticalMessage,
  warningMessage,
}: LowValueAlertParams) {
  if (value <= criticalLimit) {
    alerts.push({
      id,
      type: 'critical',
      title: criticalTitle,
      message: criticalMessage,
    });
    return;
  }

  if (value <= warningLimit) {
    alerts.push({
      id,
      type: 'warning',
      title: warningTitle,
      message: warningMessage,
    });
  }
}

type HighValueAlertParams = LowValueAlertParams;

function addHighValueAlert({
  alerts,
  id,
  value,
  warningLimit,
  criticalLimit,
  criticalTitle,
  warningTitle,
  criticalMessage,
  warningMessage,
}: HighValueAlertParams) {
  if (value >= criticalLimit) {
    alerts.push({
      id,
      type: 'critical',
      title: criticalTitle,
      message: criticalMessage,
    });
    return;
  }

  if (value >= warningLimit) {
    alerts.push({
      id,
      type: 'warning',
      title: warningTitle,
      message: warningMessage,
    });
  }
}