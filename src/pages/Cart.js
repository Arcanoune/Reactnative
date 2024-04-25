import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import CartCards from '../components/CartCards';
import { fetchClotheAPI } from "../utils/api";
import ClothesCard from '../components/ClothesCard';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    console.log(cart);
  }, [cart])
  const getById = (id) => {
    return cart.find((item) => id === item.id)
  }

  const addToCart = (item) => {
    if (getById(item.id)) {
      const newCart = []
      cart.map((e) => {
        if (e.id === item.id) {
          e.quantity++
        }
        newCart.push(e)
      })
      //Case when  in cart
      //Modify the quantity
      setCart(newCart)
    } else {
      //Case when not in cart
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const newCart = []
    cart.forEach((e) => {
      if (e.id === item.id) {
        if (e.quantity - 1 === 0) {
          return
        } else {
          e.quantity--
        }
      }
      newCart.push(e)
    })
    setCart(newCart)

  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getById }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export const Cart = ({ navigation }) => {
  const { cart, clearCart } = useCart();
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

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };
  const refreshFunction = () => {
    getClothe();
  };

  return (
    <ScrollView style={{ marginHorizontal: 20, marginTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={clearCart} style={{ backgroundColor: '#D46363', alignItems: 'center', borderRadius: 10, padding: 10 }}>
          <Text style={{ fontSize: 16, color: '#f5f5f5', fontWeight: 500 }}>
            Vider le panier
          </Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#D46363', alignItems: 'center', borderRadius: 10, padding: 10 }}>
          <Text style={{ fontSize: 16, color: '#f5f5f5' }}>Total: {getTotalPrice()}€</Text>
        </View>
      </View>

      {showClothe ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text>Chargement en cours...</Text>
          <ActivityIndicator size="large" color="#D46363" />
        </View>
      ) : (
        <>
          {Object.keys(cart).length > 0 ? (
            <ScrollView style={{}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',flexWrap: 'wrap' }}>
                {(cart).map((clothe, index) => (
                  <View key={index} style={{ width: '50%' }}>
                    <CartCards clothe={clothe} navigation={navigation} />
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View>
              <Text style={{ marginTop: 10, fontSize: 32, color: 'grey', textAlign: 'center' }}>Panier vide</Text>
              <Text style={{ marginTop: 30, fontSize: 16, fontWeight: 500, color: '#D46363' }}>Voir aussi :</Text>

              <ScrollView style={{ marginTop: 10 }} refreshControl={<RefreshControl refreshing={showClothe} onRefresh={refreshFunction} />}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {clothe_r?.map((clothe, index) => (
                    <View key={clothe.id} style={{ width: '50%' }}>
                      <ClothesCard clothe={clothe} navigation={navigation} />
                    </View>
                  ))}
                </View>
              </ScrollView>

            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};