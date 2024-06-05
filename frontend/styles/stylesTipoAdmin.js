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
  preferencesTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dniLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
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
  dataContainer: {
    marginTop: 50,
    width: '100%',
  },
  pickerContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  pickerLabel: {
    padding: 10,
    color: '#000'
  },
  errorText: {
    color: 'red',
    paddingLeft: 10,
  },
  image: {
    width: 200,
    height: 150,
    marginVertical: 10,
  },
});

export default styles;
