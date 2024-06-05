import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 15,
      textAlign: 'center',
    },
    sectionContainer: {
      marginBottom: 20,
      width: '100%',
    },
    sectionLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    lista: {
      paddingVertical: 10,
    },
    horizontalListContainer: {
      flexDirection: 'row',
    },
    tagWrapper: {
      alignItems: 'center',
      marginHorizontal: 5,
    },
    tag: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    tagSelected: {
      backgroundColor: '#d3d3d3',
    },
    tagImage: {
      width: 50,
      height: 50,
    },
    tagText: {
      marginTop: 5,
      fontSize: 12,
      textAlign: 'center',
    },
  });

  export default styles;