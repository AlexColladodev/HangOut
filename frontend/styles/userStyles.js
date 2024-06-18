import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const establecimientoUserStyles = StyleSheet.create({
    nombreEstablecimiento: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
    },
    tabButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 20,
      borderWidth: 1,
      marginHorizontal: 10,
    },
    tabText: {
      marginLeft: 10,
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    icon: {
      marginRight: 10,
    },
    moneyImage: {
      width: 60,
      height: 60,
      position: 'absolute',
    },
    priceContainer: {
      position: 'absolute',
      bottom: 25,
      right: 10,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    priceText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      position: 'absolute',
      bottom: 10
    },
  });

  export default establecimientoUserStyles;