import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,      
    width: width * 0.9,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    backgroundColor: 'white',
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
    color: 'black'  
  },
  datePart: {
    flex: 1,
  },
  pickerLabel: {
    padding: 10,
    color: '#000',
  },

});

export default inputStyles;
