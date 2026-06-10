import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState('Red');
  const [diceValue, setDiceValue] = useState('-');
  const [isRolling, setIsRolling] = useState(false);

  const players = ['Red', 'Green', 'Yellow', 'Blue'];

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    let count = 0;
    
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 5) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setIsRolling(false);
        
        Alert.alert('Dice Rolled 🎲', `${currentPlayer} Team rolled a ${finalValue}!`, [
          {
            text: 'Next Turn',
            onPress: () => {
              const nextIndex = (players.indexOf(currentPlayer) + 1) % players.length;
              setCurrentPlayer(players[nextIndex]);
            }
          }
        ]);
      }
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎲 MINI LUDO KING 🎲</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          <View style={[styles.house, { backgroundColor: '#ff4d4d' }]}><View style={[styles.token, { backgroundColor: '#9c0c0c' }]} /></View>
          <View style={[styles.house, { backgroundColor: '#2ecc71' }]}><View style={[styles.token, { backgroundColor: '#116936' }]} /></View>
        </View>
        <View style={styles.centerRow}><Text style={styles.centerText}>HOME</Text></View>
        <View style={styles.row}>
          <View style={[styles.house, { backgroundColor: '#3498db' }]}><View style={[styles.token, { backgroundColor: '#1a5276' }]} /></View>
          <View style={[styles.house, { backgroundColor: '#f1c40f' }]}><View style={[styles.token, { backgroundColor: '#b7950b' }]} /></View>
        </View>
      </View>
      <View style={styles.controls}>
        <Text style={styles.turnText}>Turn: <Text style={{fontWeight:'bold'}}>{currentPlayer}</Text></Text>
        <TouchableOpacity style={styles.button} onPress={rollDice} disabled={isRolling}>
          <Text style={styles.buttonText}>ROLL DICE 🎲</Text>
        </TouchableOpacity>
        <Text style={styles.resultText}>Result: {diceValue}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a252f', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20 },
  board: { width: 300, height: 300, backgroundColor: '#fff', borderWidth: 4, borderColor: '#2c3e50' },
  row: { flex: 2, flexDirection: 'row' },
  centerRow: { flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#2c3e50' },
  centerText: { fontWeight: 'bold', color: '#2c3e50' },
  house: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  token: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: '#fff' },
  controls: { marginTop: 25, backgroundColor: '#2c3e50', padding: 20, borderRadius: 10, width: 260, alignItems: 'center' },
  turnText: { fontSize: 18, color: '#fff', marginBottom: 10 },
  button: { backgroundColor: '#e67e22', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 5, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  resultText: { color: '#fff', fontSize: 20, marginTop: 10, fontWeight: 'bold' }
});
