import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    contentContainer: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 20,
    },
    dataContainer: {
      marginTop: 50,
      width: '100%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
  },
    logo: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    preferencesTitle: {
      fontSize: 18,
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginTop: 20,
    },
    tagWrapper: {
      alignItems: 'center',
      marginVertical: 10, 
      width: '30%', 
    },
    tag: {
      width: 50,
      height: 50,
      opacity: 0.5,
    },
    tagSelected: {
      opacity: 1,
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: 10,
    },
    tagImage: {
      width: '100%',
      height: '100%',
    },
    tagText: {
      marginTop: 5,
      fontSize: 14,
      textAlign: 'center',
    },
    footer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
    },
    button: {
      backgroundColor: '#6200ee',
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
      width: '35%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  export default styles;