import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ClothesCard = ({ clothe, navigation }) => {
  const openDetails = () => {
    navigation.navigate('DetailClothesPage', { clothe });
  };

  return (
    <View style={{
      backgroundColor: '#FFF', borderRadius: 8, marginBottom: 16, shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, margin: 5
    }}>

      <TouchableOpacity onPress={openDetails}>
        <View style={{}}>
          <Image
            style={{ width: '100%', height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            source={{ uri: clothe?.image }}
            resizeMode="cover" />

          <View style={{
            position: 'absolute', top: 8, left: 8, backgroundColor: '#D46363', paddingVertical: 4,
            paddingHorizontal: 8, borderRadius: 4, color: 'white'
          }}>
            <Text style={{ color: '#f5f5f5' }}>{clothe.category}</Text>
          </View>
        </View>

        <View style={{ padding: 10, }}>
          <View style={{ justifyContent: "space-between" }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8, color: 'grey' }}>
              {clothe?.title}
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 8, color: 'grey' }}>
              {clothe?.price.toFixed(2)}€
            </Text>
          </View>

          <View style={{ backgroundColor: '#D46363', alignItems: 'center', borderRadius: 10, padding: 10 }}>
            <Text style={{ color: '#f5f5f5', fontWeight: 500 }}>
              Voir plus
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ClothesCard;
