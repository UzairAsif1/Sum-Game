import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function Game() {
  const [target, setTarget] = useState<number>(0);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [gameStatus, setGameStatus] =useState<string>('');

  const settingTarget = () => {
    setTarget(Math.floor(10 + Math.random() * (50 - 10)));
  };

  const generateNums = (count: number) => {
    let newItems: number[] = [];
    let sum = 0;

    while (sum < target - 3) {
      let num = Math.floor(1 + Math.random() * 15);
      if (sum + num <= target) {
        newItems.push(num);
        sum += num;
      }
    }

    while (newItems.length < count) {
      newItems.push(Math.floor(1 + Math.random() * 9));
    }

    setRandomNumbers(newItems.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    settingTarget();
    generateNums(6);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Sum Game</Text>

      <View style={styles.targetContainer}>
        <Text style={styles.targetLabel}>Target</Text>
        <Text style={styles.target}>{target}</Text>
      </View>

      <View style={styles.tilesContainer}>
        {randomNumbers.map((num, index) => (
          <TouchableOpacity key={index} style={styles.tile}>
            <Text style={styles.tileText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Retry"
          onPress={() => {
            settingTarget();
            generateNums(6);
          }}
          color="#007AFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  targetContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  targetLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  target: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
    marginBottom: 20,
  },
  tile: {
    width: 100,
    height: 100,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedTile: {
    backgroundColor: '#005bb5',
  },
  tileText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
