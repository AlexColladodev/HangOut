import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Fondo = () => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const generateCircleStyles = (size, color, zIndex) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: size / 2,
  borderWidth: 2,
  borderColor: color,
  backgroundColor: 'transparent',
  zIndex: zIndex,
  top: height / 2 - size / 2,
  left: width / 2 - size / 2,
  opacity: 0.3,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  circle10: generateCircleStyles(1000, '#8B0000', 1),
  circle9: generateCircleStyles(900, '#FF4500', 1),
  circle8: generateCircleStyles(800, '#FF6347', 1),
  circle7: generateCircleStyles(700, '#FF7F50', 1),
  circle6: generateCircleStyles(600, '#AEC6CF', 1),
  circle5: generateCircleStyles(500, '#87CEEB', 1),
  circle4: generateCircleStyles(400, '#683475', 1),
  circle3: generateCircleStyles(300, '#DB7093', 1),
  circle2: generateCircleStyles(200, '#A65E2E', 1),
  circle1: generateCircleStyles(100, '#FF6961', 1),
});

export default Fondo;
