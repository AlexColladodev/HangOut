import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AdminContext } from '../context/AdminContext';
import { UserContext } from '../context/UserContext';

const Footer = ({ 
  onHangoutPressAdmin, 
  onHangoutPressUser, 
  onAddPress, 
  onProfilePressAdmin, 
  onProfilePressUser, 
  showAddButton,
  onCreateActivity
}) => {
  const { adminId } = useContext(AdminContext);
  const { userId } = useContext(UserContext)

  const handleHangoutPress = () => {
    if (showAddButton && onHangoutPressUser) {
      onHangoutPressUser();
    } else if (!showAddButton && onHangoutPressAdmin) {
      onHangoutPressAdmin(adminId);
    }
  };

  const handleProfilePress = () => {
    if (showAddButton && onProfilePressUser) {
      onProfilePressUser();
    } else if (!showAddButton && onProfilePressAdmin) {
      onProfilePressAdmin(adminId);
    }
  };

  const handleCreateActivity = () => {
    if(showAddButton && onCreateActivity){
      onCreateActivity(userId)
    }
  }

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={handleHangoutPress} style={styles.footerButton}>
        <Image source={require('../assets/hangout_icon.png')} style={styles.iconImage} />
      </TouchableOpacity>
      {showAddButton && (
        <TouchableOpacity onPress={handleCreateActivity} style={styles.footerButton}>
          <Icon name="plus-circle" size={40} color="#000" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleProfilePress} style={styles.footerButton}>
        <Icon name="user-circle" size={40} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
