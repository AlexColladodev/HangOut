// Fondo.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Fondo = () => {
  return (
    <>
      <View style={styles.circle6} />
      <View style={styles.circle5} />
      <View style={styles.circle4} />
      <View style={styles.circle3} />
      <View style={styles.circle2} />
      <View style={styles.circle1} />
    </>
  );
};

const styles = StyleSheet.create({
  circle6: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    borderWidth: 2,
    borderColor: '#AEC6CF',
    opacity: 0.3,
    backgroundColor: 'transparent',
    right: '51.5%',
    top: '35%',
    marginTop: -300,
    marginRight: -300,
  },
  circle5: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    borderWidth: 2,
    borderColor: '#87CEEB',
    backgroundColor: 'transparent',
    right: '51.5%',
    top: '35%',
    marginTop: -250,
    marginRight: -250,
    opacity: 0.3
  },
  circle4: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: '#683475',
    backgroundColor: 'transparent',
    right: '51.5%',
    top: '35%',
    marginTop: -200,
    marginRight: -200,
    opacity: 0.3
  },
  circle3: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#DB7093',
    backgroundColor: 'transparent',
    right: '51.5%',
    top: '35%',
    marginTop: -150,
    marginRight: -150,
    opacity: 0.3
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#A65E2E',
    backgroundColor: 'transparent',
    right: '51.5%',
    top: '35%',
    marginTop: -100,
    marginRight: -100,
    opacity: 0.3
  },
  circle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF6961',
    backgroundColor: 'transparent',
    right: '51.5%',
    top: '35%',
    marginTop: -50,
    marginRight: -50,
    opacity: 0.3
  }
});

export default Fondo;
