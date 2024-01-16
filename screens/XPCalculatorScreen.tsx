// XPCalculatorScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const XPCalculatorScreen = () => {
  const [currentLevel, setCurrentLevel] = useState('');
  const [levelNeeded, setLevelNeeded] = useState('');
  const [xpNeeded, setXPNeeded] = useState(null);
  const [xpPerDay, setXPPerDay] = useState(null);

  const calculateXP = () => {
    const currentLevelInt = parseInt(currentLevel, 10);
    const levelNeededInt = parseInt(levelNeeded, 10);

    if (
      isNaN(currentLevelInt) ||
      isNaN(levelNeededInt) ||
      currentLevelInt >= levelNeededInt
    ) {
      setXPNeeded(null); // Invalid input, reset XP
      setXPPerDay(null);
      return;
    }

    // XP needed formula (assuming 80,000 XP per level)
    const xpPerLevel = 80000;
    const levelsToGain = levelNeededInt - currentLevelInt;
    const totalXPNeeded = levelsToGain * xpPerLevel;

    // Fixed completion date: March 8, 2024
    const completionDate = new Date('2024-03-08');
    const currentDate = new Date();

    // Calculate the number of days remaining until completion date
    const daysToComplete = Math.ceil((completionDate - currentDate) / (1000 * 60 * 60 * 24));

    // Calculate XP per day
    const xpPerDay = totalXPNeeded / daysToComplete;

    setXPNeeded(totalXPNeeded);
    setXPPerDay(xpPerDay);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Level:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={currentLevel}
        onChangeText={(text) => setCurrentLevel(text)}
      />

      <Text style={styles.label}>Level Needed:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={levelNeeded}
        onChangeText={(text) => setLevelNeeded(text)}
      />

      <Button title="Calculate XP" onPress={calculateXP} />

      {xpNeeded !== null && (
        <Text style={styles.result}>XP Needed: {xpNeeded.toLocaleString()}</Text>
      )}

      {xpPerDay !== null && (
        <Text style={styles.result}>XP per Day: {xpPerDay.toLocaleString()}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default XPCalculatorScreen;
