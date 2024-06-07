// FondoComun.js
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Fondo from './Fondo';

const FondoComun = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fondoContainer}>
        <Fondo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'visible',
  },

  fondoContainer: {
    position: 'absolute',
    top: 105,
    width: '100%',
  },

  logoContainer: {
    alignItems: 'center',
    top: 15
  },

  logo: {
    width: 275,
    height: 160,
    resizeMode: 'contain',
  },
});

export default FondoComun;
