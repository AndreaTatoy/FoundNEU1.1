import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from './Header';

const Upload = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // Keep picker open on iOS
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>  
      <Header />
      <ScrollView style={styles.main}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>ITEM NAME</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter item name" 
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>CATEGORY</Text>
            <TouchableOpacity style={styles.select}>
              <Text style={styles.selectText}>Select category</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>FOUND AT</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter location where item was found"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>DATE FOUND</Text>
            <TouchableOpacity style={styles.select} onPress={() => setShowPicker(true)}>
              <MaterialIcons name="calendar-today" size={20} color="gray" />
              <Text style={styles.selectText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View style={styles.formGroup}>
            <Text style={styles.label}>DETAILED DESCRIPTION</Text>
            <TextInput 
              style={[styles.input, styles.textarea]}
              placeholder="Enter details that might not be obvious in the picture, such as any markings, what time it was found, or other distinguishing features."
              placeholderTextColor="#666"
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.button, styles.outlineButton]}>
              <Text style={styles.outlineButtonText}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.outlineButton]}>
              <MaterialIcons name="camera-alt" size={20} color="black" />
              <Text style={styles.outlineButtonText}>Open Camera</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, styles.primaryButton]}>
            <Text style={styles.primaryButtonText}>Post Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
  },
  form: {
    padding: 16,
    gap: 24,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 50,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
  },
  selectText: {
    fontSize: 16,
    color: '#666',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  outlineButtonText: {
    fontSize: 16,
    color: '#000',
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default Upload;
