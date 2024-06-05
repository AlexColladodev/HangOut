import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#F0F0F0',
      padding: 15,
      marginBottom: 10,
      borderRadius: 5,
      width: '100%',
    },
    checkboxContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    checkboxWrapper: {
      width: '48%',
      marginBottom: 10,
    },
    checkbox: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
    },
    checkboxText: {
      fontSize: 16,
    },
    image: {
      width: 200,
      height: 150,
      marginVertical: 10,
    },
    saveButton: {
      backgroundColor: 'purple',
      padding: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    saveButtonText: {
      color: 'white',
      fontSize: 18,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      tagWrapper: {
        alignItems: 'center',
        margin: 10,
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
      datePickerContainer: {
        marginBottom: 20,
      },
      dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      dateInput: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        marginRight: 5,
        borderRadius: 5,
        textAlign: 'center',
      },
      datePart: {
        flex: 1,
      },
      pickerLabel: {
        padding: 10,
        color: '#000',
      },
  });

export default styles;
