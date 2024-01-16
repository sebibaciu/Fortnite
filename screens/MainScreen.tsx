import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

    const navigateToFortniteShop = () => {
    navigation.navigate('FortniteShop');
  };

  const goToXPCalculator = () => {
    navigation.navigate('XPCalculator');
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://fortnite-api.com/v2/news');
        const data = await response.json();

        if (response.ok) {
          setNews(data.data.br.motds);
        } else {
          setError('Failed to fetch news');
        }
      } catch (error) {
        setError('An error occurred while fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const navigateToNewToFortnite = () => {
    navigation.navigate('NewToFortnite');
  };

  return (
    <View style={styles.container}>
      <Button title="Go to New To Fortnite" onPress={navigateToNewToFortnite} />
      <Button title="Go to XP Calculator" onPress={goToXPCalculator} />
     <Button title="Go to Fortnite Shop" onPress={navigateToFortniteShop} />
      <Text style={styles.title}>Fortnite News</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.body}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.newsImage} />}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  newsItem: {
    marginBottom: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsDescription: {
    color: 'gray',
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 8,
  },
});

export default MainScreen;
