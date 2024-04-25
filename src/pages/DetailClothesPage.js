import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from './Cart';

const DetailClothesPage = ({ route, navigation }) => {

  const { addToCart, removeFromCart, cart, getById } = useCart();
  const [clothe, setClothe] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const { clothe } = route.params;
    setClothe(clothe);
  }, []);

  const handleAddToCart = () => {
    addToCart(clothe);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(clothe);
  };

  if (!clothe) {
    return (
      <View>
        <Text>L'objet choisi n'existe plus</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{
      backgroundColor: '#FFF', borderRadius: 8, overflow: 'hidden', marginBottom: 16, shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
    }}>

      <View style={{}}>
        <Image style={{ width: '100%', height: 300, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          source={{ uri: clothe.image }} resizeMode="cover" />

        <View style={{
          position: 'absolute', top: 8, left: 8, backgroundColor: '#D46363', paddingVertical: 4,
          paddingHorizontal: 8, borderRadius: 4, color: 'white',
        }}>
          <Text style={{ color: '#f5f5f5' }}>{clothe.category}</Text>
        </View>
      </View>


      <View style={{ marginHorizontal: 20 }}>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: 500, color: '#D46363' }}>{clothe.title}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 30 }}>
          <View style={{}}>
            <Text style={{ fontSize: 32, color: 'grey' }}>{clothe.price}€</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleRemoveFromCart} style={{ backgroundColor: 'gray', padding: 10, marginHorizontal: 5, borderRadius: 5 }}>
              <Text style={{ color: '#f5f5f5', fontSize: 20 }}>-</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 24, marginHorizontal: 10, color: '#D46363', fontWeight: 500 }}>{getById(clothe.id)?.quantity || 0}</Text>

            <TouchableOpacity onPress={handleAddToCart} style={{ backgroundColor: 'gray', padding: 10, marginHorizontal: 5, borderRadius: 5 }}>
              <Text style={{ color: '#f5f5f5', fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 24, color: '#D46363' }}>{clothe.rating.rate} </Text>
              <Image style={{ height:30, width:25 }} source={require('../../assets/star.png')} resizeMode="contain" />
            <Text style={{ fontSize: 12, color: 'grey' }}>  ({clothe.rating.count} avis)</Text>
          </View>

          <Text style={{ fontSize: 16, color: 'grey' }}>{clothe.description}</Text>
        </View>

      </View>

    </ScrollView>
  );
};

export default DetailClothesPage;
