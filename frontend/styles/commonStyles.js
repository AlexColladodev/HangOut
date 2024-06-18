import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const commonStyles = StyleSheet.create({
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
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ADD8E6',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
  },
  saveButtonText: {
    textAlign: 'center',
    marginRight: 15,
    marginLeft: 15,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  imageSelected: {
    width: width * 0.9, 
    height: height * 0.2, 
    marginVertical: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  showImage: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ECECEC',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  fieldValue: {
    fontSize: 18,
    marginLeft: 10,
  },
  list: {
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#ffcccc',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
  },
  deleteButtonText: {
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  preferencesTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  horizontalListContainer: {
    flexDirection: 'row',
  },
  labelUser: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF9DFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  createReviewButtonText: {
    color: 'black',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  starContainer: {
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  addFriendIcon: {
    marginLeft: 15,
  },
});

export default commonStyles;
