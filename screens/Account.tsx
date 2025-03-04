import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';

type AccountProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Account: React.FC<AccountProps> = ({ setIsLoggedIn }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.accountTitle}>Account</Text>
      
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.name}>Juan Dela Cruz</Text>
        <Text style={styles.role}>STUDENT</Text>
      </View>

      {/* Information Fields */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput style={styles.input} value="juan.delacruz@neu.edu.ph" editable={false} />

        <Text style={styles.label}>STUDENT ID</Text>
        <TextInput style={styles.input} value="22-01345-678" editable={false} />

        <Text style={styles.label}>PHONE NUMBER</Text>
        <TextInput style={styles.input} value="+63 090 1234 567" editable={false} />
        <Button title="Sign Out" onPress={() => setIsLoggedIn(false)} />
      </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accountTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: 'gray',
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 25,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
});

export default Account;
