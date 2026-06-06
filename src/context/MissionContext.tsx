import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { generateAlerts, MissionAlert, MissionData } from '../utils/alertRules';

type MissionContextType = {
  mission: MissionData;
  alerts: MissionAlert[];
  updateMission: (data: Partial<MissionData>) => void;
  updateThresholds: (data: Partial<MissionData['thresholds']>) => void;
  resetMission: () => void;
};

const MissionContext = createContext<MissionContextType | undefined>(undefined);

const STORAGE_KEY = '@space_mission_control_v2';

const initialMission: MissionData = {
  missionName: 'Orbital Guardian',
  operatorName: 'Equipe FIAP',
  energy: 78,
  temperature: 24,
  oxygen: 96,
  communication: 88,
  orbitalStability: 91,
  radiation: 12,
  autoAlertsEnabled: true,
  thresholds: {
  energyWarning: 40,
  energyCritical: 20,

  temperatureWarning: 32,
  temperatureCritical: 40,

  oxygenWarning: 85,
  oxygenCritical: 75,

  communicationWarning: 70,
  communicationCritical: 50,

  stabilityWarning: 75,
  stabilityCritical: 60,

  radiationWarning: 45,
  radiationCritical: 70,
},
};

type MissionProviderProps = {
  children: ReactNode;
};

export function MissionProvider({ children }: MissionProviderProps) {
  const [mission, setMission] = useState<MissionData>(initialMission);
  const [alerts, setAlerts] = useState<MissionAlert[]>([]);

  useEffect(() => {
    loadMission();
  }, []);

  useEffect(() => {
    setAlerts(generateAlerts(mission));
    saveMission(mission);
  }, [mission]);

  async function loadMission() {
    try {
      const storedMission = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedMission) {
        setMission(JSON.parse(storedMission));
      }
    } catch (error) {
      console.log('Erro ao carregar dados da missão:', error);
    }
  }

  async function saveMission(data: MissionData) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log('Erro ao salvar dados da missão:', error);
    }
  }

  function updateMission(data: Partial<MissionData>) {
    setMission((previousMission) => ({
      ...previousMission,
      ...data,
    }));
  }

  function updateThresholds(data: Partial<MissionData['thresholds']>) {
    setMission((previousMission) => ({
      ...previousMission,
      thresholds: {
        ...previousMission.thresholds,
        ...data,
      },
    }));
  }

  function resetMission() {
    setMission(initialMission);
  }

  return (
    <MissionContext.Provider
      value={{
        mission,
        alerts,
        updateMission,
        updateThresholds,
        resetMission,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);

  if (!context) {
    throw new Error('useMission deve ser usado dentro de MissionProvider');
  }

  return context;
}