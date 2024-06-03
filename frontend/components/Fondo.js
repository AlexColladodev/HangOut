import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Fondo = () => {
  return (
    <>
      <View style={styles.circle26} />
      <View style={styles.circle25} />
      <View style={styles.circle24} />
      <View style={styles.circle23} />
      <View style={styles.circle22} />
      <View style={styles.circle21} />
      <View style={styles.circle20} />
      <View style={styles.circle19} />
      <View style={styles.circle18} />
      <View style={styles.circle17} />
      <View style={styles.circle16} />
      <View style={styles.circle15} />
      <View style={styles.circle14} />
      <View style={styles.circle13} />
      <View style={styles.circle12} />
      <View style={styles.circle11} />
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
  circle26: generateCircleStyles(2600, '#8B0000'),
  circle25: generateCircleStyles(2500, '#FF4500'),
  circle24: generateCircleStyles(2400, '#FF6347'),
  circle23: generateCircleStyles(2300, '#FF7F50'),
  circle22: generateCircleStyles(2200, '#FFA07A'),
  circle21: generateCircleStyles(2100, '#FFD700'),
  circle20: generateCircleStyles(2000, '#FFFF00'),
  circle19: generateCircleStyles(1900, '#ADFF2F'),
  circle18: generateCircleStyles(1800, '#32CD32'),
  circle17: generateCircleStyles(1700, '#00FF00'),
  circle16: generateCircleStyles(1600, '#AEC6CF'),
  circle15: generateCircleStyles(1500, '#87CEEB'),
  circle14: generateCircleStyles(1400, '#683475'),
  circle13: generateCircleStyles(1300, '#DB7093'),
  circle12: generateCircleStyles(1200, '#A65E2E'),
  circle11: generateCircleStyles(1100, '#FF6961'),
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
