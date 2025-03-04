import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const RecentlyUploaded = () => {
  const items = Array(6).fill({
    title: "Title",
    category: "Category",
    date: "mm/dd/yyyy 00:00:00",
  });

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Recently Uploaded</Text>
        <Text style={styles.viewMore}>{">"}</Text>
      </View>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewMore: {
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flexDirection: 'row',
  },
  card: {
    width: 180,
    marginRight: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  details: {
    marginTop: 8,
  },
  category: {
    fontSize: 12,
    color: '#666',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});

export default RecentlyUploaded;