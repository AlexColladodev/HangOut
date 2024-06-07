import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({ onHangoutPress, onAddPress, onProfilePress, showAddButton }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={onHangoutPress} style={styles.footerButton}>
        <Image source={require('../assets/hangout_icon.png')} style={styles.iconImage} />
      </TouchableOpacity>
      {showAddButton && (
        <TouchableOpacity onPress={onAddPress} style={styles.footerButton}>
          <Icon name="plus-circle" size={40} color="#000" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onProfilePress} style={styles.footerButton}>
        <Icon name="user-circle" size={40} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly', // Evenly distribute buttons
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    padding: 10,
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Footer;
