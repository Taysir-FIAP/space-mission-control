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
    energyCritical: number;
    temperatureCritical: number;
    oxygenCritical: number;
    communicationCritical: number;
    stabilityCritical: number;
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

  if (mission.energy <= thresholds.energyCritical) {
    alerts.push({
      id: 'energy',
      type: 'critical',
      title: 'Energia crítica',
      message: `Nível de energia em ${mission.energy}%. Recarregamento emergencial recomendado.`,
    });
  }

  if (mission.temperature >= thresholds.temperatureCritical) {
    alerts.push({
      id: 'temperature',
      type: 'critical',
      title: 'Temperatura elevada',
      message: `Temperatura interna em ${mission.temperature}°C. Risco aos sistemas da missão.`,
    });
  }

  if (mission.oxygen <= thresholds.oxygenCritical) {
    alerts.push({
      id: 'oxygen',
      type: 'warning',
      title: 'Oxigênio abaixo do ideal',
      message: `Nível de oxigênio em ${mission.oxygen}%. Verificar suporte de vida.`,
    });
  }

  if (mission.communication <= thresholds.communicationCritical) {
    alerts.push({
      id: 'communication',
      type: 'warning',
      title: 'Comunicação instável',
      message: `Sinal de comunicação em ${mission.communication}%.`,
    });
  }

  if (mission.orbitalStability <= thresholds.stabilityCritical) {
    alerts.push({
      id: 'stability',
      type: 'critical',
      title: 'Instabilidade orbital',
      message: `Estabilidade orbital em ${mission.orbitalStability}%. Correção de rota necessária.`,
    });
  }

  if (mission.radiation >= thresholds.radiationCritical) {
    alerts.push({
      id: 'radiation',
      type: 'critical',
      title: 'Radiação elevada',
      message: `Radiação em ${mission.radiation}%. Ativar protocolo de proteção.`,
    });
  }

  return alerts;
}