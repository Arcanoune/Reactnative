import React from 'react';
import HomePage from './src/pages/HomePage';
import DetailClothesPage from './src/pages/DetailClothesPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider, Cart } from './src/pages/Cart';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Accueil' }} />
          <Stack.Screen name="DetailClothesPage" component={DetailClothesPage} options={{ title: 'Page produit' }} />
          <Stack.Screen name="Cart" component={Cart} options={{ title: 'Panier' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
