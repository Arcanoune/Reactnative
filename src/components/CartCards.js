import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../pages/Cart';

const CartCards = ({ clothe, navigation }) => {
    const { addToCart, removeFromCart, cart, getById } = useCart();
    const [quantity, setQuantity] = useState(0);

    const openDetails = () => {
        navigation.navigate('DetailClothesPage', { clothe });
    };

    const handleAddToCart = () => {
        addToCart(clothe);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(clothe);
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

                        <Text style={{ fontSize: 16, marginBottom: 8, color: '#D46363' }}>
                            {clothe?.price.toFixed(2)}€
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleRemoveFromCart} style={{ backgroundColor: 'gray', padding: 10, marginHorizontal: 5, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ fontSize: 20, marginHorizontal: 10, color: '#D46363', fontWeight: 500 }}>{getById(clothe.id)?.quantity || 0}</Text>

                        <TouchableOpacity onPress={handleAddToCart} style={{ backgroundColor: 'gray', padding: 10, marginHorizontal: 5, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CartCards;
