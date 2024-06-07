import { StyleSheet } from 'react-native';

const stylesDatosEvento = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  imagenContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldValue: {
    fontSize: 16,
  },
  box: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 5,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default stylesDatosEvento;
