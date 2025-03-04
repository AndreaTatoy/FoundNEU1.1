import React from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Define the prop types
interface HeaderProps {
  showSearch?: boolean; // Optional boolean prop
}

const Header: React.FC<HeaderProps> = ({ showSearch = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/neu-logo.png')} style={styles.logo} />
        <Text style={{ color: '#FF0000', fontSize: 18, fontWeight: 'bold'}}>Found</Text>
        <Text style={{ color: '#008000', fontSize: 18, fontWeight: 'bold'}}>NEU</Text>     
      </View>

      {showSearch && (
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 12,
    flex: 1,
    marginLeft: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
});

export default Header;
