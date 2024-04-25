import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchClotheAPI } from "../utils/api";
import ClothesCard from '../components/ClothesCard';

const Home = ({ navigation }) => {
  const [clothe_r, setclothe_r] = useState([]);
  const [search_clothe, setSearch_clothe] = useState('');
  const [showClothe, setShowClothe] = useState(false);

  useEffect(() => {
    getClothe();
  }, [search_clothe]);

  const getClothe = async () => {
    try {
      setShowClothe(true);
      const data = await fetchClotheAPI(search_clothe);
      setclothe_r(data || []);
      setShowClothe(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
      setShowClothe(false);
    }
  };

  const refreshFunction = () => {
    getClothe();
  };

  const goToCartPage = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={{ backgroundColor: '#F5F5F5', flex: 1 }}>

      <Text style={{ color: '#F5F5F5', backgroundColor: 'grey', fontWeight: '500', fontSize: 32, textAlign: 'center', padding: 15, marginBottom: 10 }}>
        Bouticos
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 30 }}>
        <TouchableOpacity onPress={goToCartPage} style={{ backgroundColor: '#D46363', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: '#F5F5F5', fontSize: 16, fontWeight: '500' }}>Panier</Text>
        </TouchableOpacity>
      </View>

      {showClothe ? (
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text>Chargement en cours...</Text>
          <ActivityIndicator size="large" color="#D46363" />
        </View>
      ) : (
        <ScrollView style={{ marginHorizontal: 10, marginTop: 20 }} refreshControl={<RefreshControl refreshing={showClothe} onRefresh={refreshFunction} />}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {clothe_r?.map((clothe, index) => (
              <View key={clothe.id} style={{ width: '50%' }}>
                <ClothesCard clothe={clothe} navigation={navigation} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}

    </View>
  );
};

export default Home;
