import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface CategorySectionProps {
  title: string;
}

const CategorySection = ({ title }: CategorySectionProps) => {
  const items = Array(6).fill({
    image: "placeholder",
  });

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.viewMore}>{">"}</Text>
      </View>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {items.map((_, index) => (
          <View key={index} style={styles.card} />
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
    width: 120,
    aspectRatio: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginRight: 16,
  },
});

export default CategorySection;