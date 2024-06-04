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
    paddingBottom: 100,
  },
  dataContainer: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
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
  modifyButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#E0F7FA',
  },
  icon: {
    width: 50,
    height: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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
});

export default styles;
