import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import Usuario from '../../components/Usuario';
import Preferencia from '../../components/Preferencia';
import ReviewUsuario from '../../components/ReviewUsuario';
import Actividad from '../../components/Actividad';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatosUsuario = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userId, token } = useContext(UserContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Perfil',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ModificarUsuario', { data })}>
          <Icon name="edit" size={25} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/usuario_generico/${userId}`);
      setData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', fetchData);
    return () => {
      navigation.removeListener('focus', fetchData);
    };
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={commonStyles.centered} />;
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={commonStyles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={fetchData} />
      </View>
    );
  }

  const { usuario, seguidos, actividades, reviews } = data;
  const formattedFechaNac = new Date(usuario.fecha_nac.$date).toLocaleDateString();

  const handleActividadPress = (actividad) => {
    navigation.navigate('DatosActividad', { actividad });
  };

  const handleUsuarioPress = (usuario) => {
    navigation.navigate('DatosAmigos', { usuario });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={commonStyles.profileImageContainer}>
            <Image source={{ uri: `${BASE_URL}${usuario.imagen_url}` }} style={commonStyles.profileImage} />
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
            <Text style={commonStyles.fieldLabel}>Correo Electrónico:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{usuario.email}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Teléfono:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{usuario.telefono}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Fecha de Nacimiento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{formattedFechaNac}</Text>
            </View>
          </View>
          <View style={commonStyles.sectionContainer}>
            <View style={commonStyles.sectionHeaderRow}>
              <Text style={commonStyles.sectionLabel}>Seguidos:</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SeguirUsuario', { userId })} style={commonStyles.addFriendIcon}>
                <Icon name="user-plus" size={35} color="black" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={seguidos}
              keyExtractor={(item) => item._id.$oid}
              renderItem={({ item }) => <Usuario data={item} onPress={() => handleUsuarioPress(item)} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.lista}
            />
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
          <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.sectionLabel}>Actividades Creadas:</Text>
            <FlatList
              data={actividades}
              keyExtractor={(item) => item._id.$oid}
              renderItem={({ item }) => <Actividad actividad={item} onPress={() => handleActividadPress(item)} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.lista}
            />
          </View>
          <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.sectionLabel}>Reviews:</Text>
            <FlatList
              data={reviews}
              keyExtractor={(item) => item._id.$oid}
              renderItem={({ item }) => <ReviewUsuario review={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.lista}
            />
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

export default DatosUsuario;
