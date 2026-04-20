// src/services/productService.js

// 1. Definimos una función que normaliza los datos. 
// No importa si la API llama al precio "cost" o "val", nosotros lo llamaremos "price".
const normalizeProduct = (apiData, source) => {
  if (source === 'fakestore') {
    return {
      id: `fs-${apiData.id}`,
      title: apiData.title,
      price: apiData.price,
      description: apiData.description,
      image: apiData.image,
      category: apiData.category,
    };
  }

  if (source === 'sportsdb') {
    return {
      id: `sdb-${apiData.idTeam}`,
      title: `${apiData.strTeam} Official Jersey`,
      price: 89.99, // Inventamos precio porque SportsDB es informativa
      description: `Official equipment for ${apiData.strTeam}`,
      image: apiData.strTeamBadge,
      category: 'Football',
    };
  }
};

export const fetchAllSources = async () => {
  try {
    // Podemos llamar a varias APIs al mismo tiempo
    const [fakeRes, sportsRes] = await Promise.all([
      fetch('https://fakestoreapi.com/products'),
      fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain')
    ]);

    const fakeData = await fakeRes.json();
    const sportsData = await sportsRes.json();

    // Traducimos todo a nuestro formato "D'Mastry"
    const normalizedFake = fakeData.map(p => normalizeProduct(p, 'fakestore'));
    const normalizedSports = (sportsData.teams || []).map(p => normalizeProduct(p, 'sportsdb'));

    return [...normalizedFake, ...normalizedSports];
  } catch (error) {
    console.error("Error fetching APIs:", error);
    return [];
  }
};