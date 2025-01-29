import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';

export default function Game() {
  const [target, setTarget] = useState<number>(0);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [gameStatus, setGameStatus] =useState<string>('');

  const settingTarget = () => {
    setTarget(Math.floor(10 + Math.random() * (50 - 10)));
  };

  const generateNums = (count: number) => {
    let newItems: Set<number> = new Set(); 
    let subsetSize = Math.random() < 0.5 ? 3 : 4; 
    let subset: Set<number> = new Set();
    let remainingTarget = target;
  
    while (remainingTarget > 0 && subset.size < subsetSize) {
      let num = Math.floor(1 + Math.random() * 19); 
  
      if (!subset.has(num) && remainingTarget - num >= 0) {
        subset.add(num);
        remainingTarget -= num;
      }
    }
  
    if (remainingTarget > 0) {
      let lastNum = Array.from(subset).pop(); 
      subset.delete(lastNum!);
      subset.add(lastNum! + remainingTarget); 
    }
  
    newItems = new Set([...subset]);
  
    while (newItems.size < count) {
      let randomNum = Math.floor(1 + Math.random() * 19);
      if (!newItems.has(randomNum)) {
        newItems.add(randomNum);
      }
    }
  
    let shuffledNumbers = Array.from(newItems).sort(() => Math.random() - 0.5);
  
    setGameStatus(''); 
    setRandomNumbers(shuffledNumbers); 
  };

  const handleTilePress = (num: number) => {
    if (gameStatus) return; 

    const newSelection = [...selectedNumbers, num];
    const totalSum = newSelection.reduce((sum, val) => sum + val, 0);

    setSelectedNumbers(newSelection);

    if (totalSum === target) {
      Alert.alert('🎉 Congratulations!', 'You hit the target!', [{ text: 'OK', onPress: () => newGame }]);
      setGameStatus('You Win! 🎉');
    } else if (totalSum > target) {
      Alert.alert('❌ Game Over!', 'You exceeded the target!', [{ text: 'Try Again', onPress: () => newGame }]);
      setGameStatus('You Lose! ❌');
    }
  };


  const newGame = () => {
    settingTarget();
    generateNums(6);
    setSelectedNumbers([]);

  }
  

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

      {gameStatus ? <Text style={styles.status}>{gameStatus}</Text> : null}

      <View style={styles.tilesContainer}>
        {randomNumbers.map((num, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tile, selectedNumbers.includes(num) ? styles.selectedTile : null]}
            onPress={() => handleTilePress(num)}
          >
            <Text style={styles.tileText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="New Game" onPress={newGame} color="#007AFF" />
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
  status: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff0000',
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