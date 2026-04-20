const normalizeProduct = (apiData, source) => {
  const placeholder = "https://placehold.co/600x600/f4f4f5/a1a1aa?text=Sport+Item";

  if (source === 'fakestore') {
    return {
      id: `fs-${apiData.id}`,
      title: apiData.title,
      price: apiData.price,
      description: apiData.description,
      image: apiData.image || placeholder,
      category: apiData.category,
      rating: apiData.rating || { rate: 0, count: 0 }
    };
  }

  if (source === 'sportsdb') {
    return {
      id: `sdb-${apiData.idTeam}`,
      title: `${apiData.strTeam} Official Jersey`,
      price: 79.99,
      description: `Official gear for ${apiData.strTeam}. Professional quality technical fabric for high performance.`,
      // Priorizamos el Badge, si no existe, el Jersey, si no, el placeholder
      image: apiData.strTeamBadge || apiData.strTeamJersey || placeholder,
      category: 'Football',
      rating: { rate: 4.8, count: 120 }
    };
  }
};

export const fetchAllSources = async () => {
  try {
    const [fakeRes, sportsRes] = await Promise.all([
      fetch('https://fakestoreapi.com/products'),
      fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain')
    ]);

    const fakeData = await fakeRes.json();
    const sportsData = await sportsRes.json();

    const normalizedFake = fakeData.map(p => normalizeProduct(p, 'fakestore'));
    const normalizedSports = (sportsData.teams || []).map(p => normalizeProduct(p, 'sportsdb'));

    return [...normalizedFake, ...normalizedSports];
  } catch (error) {
    console.error("Error unificando APIs:", error);
    return [];
  }
};