import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Battery from 'expo-battery';

export default function App() {
  const [level, setLevel] = useState<number>();
  const [state, setState] = useState<Battery.BatteryState>();
  const [lowPowerMode, setLowPowerMode] = useState<boolean>();

  useEffect(() => {
    async function getBatteryInfo() {
      let battery = await Battery.getPowerStateAsync();
      setLevel(battery.batteryLevel);
      setState(battery.batteryState);
      setLowPowerMode(battery.lowPowerMode)
    }
    getBatteryInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Nível de Bateria: {(level * 100).toPrecision(2)}%</Text>
      <Text>Estado da Bateria: {state === 1 ? 'Descarregando'
        : state === 2 ? 'Carregando'
        : state === 3 ? 'Carregado'
            : 'Sem Informações'}</Text>
        <Text>Baixo Consumo: {lowPowerMode ? 'Ativado' : 'Desativado'}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
