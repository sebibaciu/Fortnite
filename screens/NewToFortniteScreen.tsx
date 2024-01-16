import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const NewToFortniteScreen = () => {
  const [cosmetics, setCosmetics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCosmetics = async () => {
      try {
        const response = await fetch('https://fortnite-api.com/v2/cosmetics/br/new');
        const data = await response.json();

        if (response.ok) {
          setCosmetics(data.data.items);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchCosmetics();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={cosmetics}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.cosmeticContainer}>
          <Image source={{ uri: item.images.icon }} style={styles.cosmeticImage} />
          <Text style={styles.cosmeticName}>{item.name}</Text>
          <Text style={styles.cosmeticDescription}>{item.description}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cosmeticContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  cosmeticName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cosmeticDescription: {
    color: 'gray',
    marginTop: 4,
  },
  cosmeticImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
});

export default NewToFortniteScreen;
