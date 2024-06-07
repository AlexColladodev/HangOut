import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Fondo = () => {
  return (
    <>
      <View style={styles.circle10} />
      <View style={styles.circle9} />
      <View style={styles.circle8} />
      <View style={styles.circle7} />
      <View style={styles.circle6} />
      <View style={styles.circle5} />
      <View style={styles.circle4} />
      <View style={styles.circle3} />
      <View style={styles.circle2} />
      <View style={styles.circle1} />
    </>
  );
};

const generateCircleStyles = (size, color) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: size / 2,
  borderWidth: 2,
  borderColor: color,
  backgroundColor: 'transparent',
  right: '51.5%',
  top: '35%',
  marginTop: -(size / 2),
  marginRight: -(size / 2),
  opacity: 0.3
});


const styles = StyleSheet.create({
  circle10: generateCircleStyles(1000, '#8B0000'),
  circle9: generateCircleStyles(900, '#FF4500'),
  circle8: generateCircleStyles(800, '#FF6347'),
  circle7: generateCircleStyles(700, '#FF7F50'),
  circle6: generateCircleStyles(600, '#AEC6CF'),
  circle5: generateCircleStyles(500, '#87CEEB'),
  circle4: generateCircleStyles(400, '#683475'),
  circle3: generateCircleStyles(300, '#DB7093'),
  circle2: generateCircleStyles(200, '#A65E2E'),
  circle1: generateCircleStyles(100, '#FF6961'),
});

export default Fondo;