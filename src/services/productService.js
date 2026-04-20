const normalizeProduct = (apiData, source) => {
  if (source === 'fakestore') {
    return {
      id: `fs-${apiData.id}`,
      title: apiData.title,
      price: apiData.price,
      description: apiData.description,
      image: apiData.image, // FakeStore usa 'image'
      category: apiData.category,
      rating: apiData.rating
    };
  }

  if (source === 'sportsdb') {
    return {
      id: `sdb-${apiData.idTeam}`,
      title: `${apiData.strTeam} Official Jersey`,
      price: 79.99, 
      description: `Official gear for ${apiData.strTeam}. Professional quality technical fabric.`,
      // IMPORTANTE: SportsDB usa 'strTeamBadge' para el logo o 'strTeamJersey' para la camiseta
      image: apiData.strTeamBadge || apiData.strTeamJersey, 
      category: 'Football',
      rating: { rate: 4.8, count: 45 }
    };
  }
};

export const fetchAllSources = async () => {
  try {
    const [fakeRes, sportsRes] = await Promise.all([
      fetch('https://fakestoreapi.com/products'),
      // Buscamos equipos de la liga española como ejemplo
      fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain')
    ]);

    const fakeData = await fakeRes.json();
    const sportsData = await sportsRes.json();

    const normalizedFake = fakeData.map(p => normalizeProduct(p, 'fakestore'));
    // SportsDB devuelve un objeto con una lista llamada 'teams'
    const normalizedSports = (sportsData.teams || []).slice(0, 10).map(p => normalizeProduct(p, 'sportsdb'));

    return [...normalizedFake, ...normalizedSports];
  } catch (error) {
    console.error("Error fetching APIs:", error);
    return [];
  }
};