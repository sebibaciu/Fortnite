// FortniteShopScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const FortniteShopScreen = () => {
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fortnite-api.com/v2/shop/br?language=en");
        const data = await response.json();

        if (data.status === 200) {
          const shopData = data.data.featured.entries;
          setShopData(shopData);
        } else {
          console.error("Error fetching Fortnite shop:", data.status);
        }
      } catch (error) {
        console.error("Error fetching Fortnite shop:", error);
      }
    };

    fetchData();
  }, []);

  const getprice = (nombreSkin) => {
    // Implement your logic to get the price for a given skin
    // You may need to modify this based on the actual structure of the data
    return "Price not found";
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {shopData.map((entry) => {
        if (entry.bundle === null) {
          return null;
        }

        return (
          <View key={entry.layout && entry.layout.name} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{entry.layout && entry.layout.name}</Text>
            <View style={styles.tileContainer}>
              {entry.items.map((item) => (
                <View key={item.name} style={styles.tile}>
                  <Image source={{ uri: item.images.icon }} style={styles.tileImage} />
                  <Text style={styles.tileName}>{item.name}</Text>
                  <Text style={styles.tileDescription}>{item.description}</Text>
                  <Text style={styles.tilePrice}>
                    <Image
                      source={{ uri: 'https://fortnite-api.com/images/vbuck.png' }}
                      style={styles.vBuckIcon}
                    />
                    {getprice(item.name)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: windowWidth / 3 - 20, // Three tiles per row with some spacing
    marginBottom: 10,
  },
  tileImage: {
    width: '100%',
    height: 100,
  },
  tileName: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  tileDescription: {
    color: 'gray',
  },
  tilePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  vBuckIcon: {
    width: 20,
    height: 'auto',
    marginRight: 5,
  },
});

export default FortniteShopScreen;
