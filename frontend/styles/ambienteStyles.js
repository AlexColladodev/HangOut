import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ambienteStyles = StyleSheet.create({
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

export default ambienteStyles;
