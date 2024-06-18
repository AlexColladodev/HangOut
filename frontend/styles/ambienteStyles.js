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
    tagWrapperUser: {
      alignItems: 'center',
      marginHorizontal: 5,
    },
    tagUser: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    tagSelectedUser: {
      backgroundColor: '#d3d3d3',
    },
    tagImageUser: {
      width: 50,
      height: 50,
    },
    tagTextUser: {
      marginTop: 5,
      fontSize: 12,
      textAlign: 'center',
    },
});

export default ambienteStyles;
