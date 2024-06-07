// Preferencia.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ambientes = {
  "Chill": require("../assets/ambiente/chill.png"),
  "Monólogos": require("../assets/ambiente/monologos.png"),
  "Cine": require("../assets/ambiente/cine.png"),
  "Discoteca": require("../assets/ambiente/discoteca.png"),
  "Bar": require("../assets/ambiente/bar.png"),
  "Cervezas": require("../assets/ambiente/cervezas.png"),
  "Rock": require("../assets/ambiente/rock.png"),
  "En Vivo": require("../assets/ambiente/en_vivo.png"),
  "Reggaeton": require("../assets/ambiente/reggaeton.png"),
  "Latino": require("../assets/ambiente/latino.png"),
  "Deportes": require("../assets/ambiente/deportes.png"),
  "Karaoke": require("../assets/ambiente/karaoke.png"),
};

const Preferencia = ({ name }) => {
    const image = ambientes[name];
  
    return (
        <View style={styles.outerContainer}>
        <View style={styles.container}>
            {image ? <Image source={image} style={styles.image} /> : null}
            <Text style={styles.text}>{name}</Text>
        </View>
        </View>
    );
  };

  const styles = StyleSheet.create({
    outerContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
    image: {
      width: 50,
      height: 50,
      marginBottom: 5,
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default Preferencia;
