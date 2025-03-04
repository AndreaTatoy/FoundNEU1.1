import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from './Header';

const notifications = [
  { id: '1', text: 'A user has requested to claim your found item. Review now!', unread: true },
  { id: '2', text: 'A user has requested to claim your found item. Review now!', unread: true },
  { id: '3', text: 'Your claim request has been approved! Contact the finder to arrange pickup.', unread: false },
  { id: '4', text: 'You have a pending claim request. Don\'t forget to verify!', unread: true },
  { id: '5', text: 'You have a pending claim request. Don\'t forget to verify!', unread: false },
];

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Header />
    <Text style={styles.notificationsTitle}>Notifications</Text>
      {/* Notification List */}
      <FlatList
      
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.notificationText}>{item.text}</Text>
            {item.unread && <View style={styles.unreadDot} />}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
    headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  notificationsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default Notification;
