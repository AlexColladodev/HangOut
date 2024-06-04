import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      contentContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
      },
      dataContainer: {
        marginTop: 50,
        width: '100%',
      },
      imagenContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      imagen: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
      },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    fieldContainer: {
        marginBottom: 10,
        alignItems: 'flex-start',
        width: '100%',
      },
      fieldLabel: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      fieldValue: {
        fontSize: 18,
        marginLeft: 10,
      },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        marginBottom: 10,
    },
    box: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#f9f9f9',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 2,
    },
      boton: {
        backgroundColor: 'purple',
        padding: 10,
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
      },
      botonTexto: {
        color: 'white',
        fontSize: 18,
      },
      reviewList: {
        paddingVertical: 10,
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
});

export default styles;
