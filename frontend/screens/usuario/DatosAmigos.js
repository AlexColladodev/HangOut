import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import Fondo from '../../components/Fondo';
import Preferencia from '../../components/Preferencia';
import commonStyles from '../../styles/commonStyles';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';
import BASE_URL from '../../config_ip';

const DatosAmigos = ({ navigation, route }) => {
  const { userId } = useContext(UserContext);
  const { usuario } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Usuario',
    });
  }, [navigation]);

  const formattedFechaNac = new Date(usuario.fecha_nac.$date).toLocaleDateString();
  const imageUrl = usuario.imagen_url.startsWith('http') ? usuario.imagen_url : `${BASE_URL}${usuario.imagen_url}`;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={commonStyles.profileImageContainer}>
            <Image source={{ uri: imageUrl }} style={commonStyles.profileImage} />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{usuario.nombre}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre Usuario:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{usuario.nombre_usuario}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Fecha de Nacimiento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{formattedFechaNac}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Preferencias:</Text>
            {usuario.preferencias.length > 0 ? (
              <FlatList
                data={usuario.preferencias}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Preferencia name={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={commonStyles.lista}
              />
            ) : (
              <Text style={commonStyles.fieldValue}>N/A</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Footer
        showAddButton={true}
        onHangoutPressUser={() => navigation.navigate('InicioUsuario', { userId })}
        onProfilePressUser={() => navigation.navigate('DatosUsuario', { userId })}
        onCreateActivity={() => navigation.navigate('CrearActividad', { userId })}
      />
    </View>
  );
};

export default DatosAmigos;
