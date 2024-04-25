const API_URL = "https://fakestoreapi.com/products/";

export const fetchClothesAPI = async (search) => {
  try {
    const products = [];
    let page = 1;

    while (true) {

      const response = await fetch(API_URL + page + search);
      if (!response.ok) {
        break;
      }

      const text = await response.text();
      if (!text.trim()) {
        break;
      }

      const data = JSON.parse(text);
      if (Object.keys(data).length === 0) {
        break;
      }

      console.log(typeof data)
      products.push(data);
      page++;
    }

    return products;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    return [];
  }
};

export const fetchClotheAPI = async (search) => {
  try {
    const response = await fetch(API_URL + search);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    return [];
  }
};
