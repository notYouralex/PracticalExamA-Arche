import { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactListScreen from './screens/ContactListScreen';
import AddContactScreen from './screens/AddContactScreen';

const Stack = createNativeStackNavigator();

const DEFAULT_CONTACTS = [
  { id: '1', name: 'Alice Santos', phone: '09171234567' },
  { id: '2', name: 'Bob Reyes', phone: '09181234567' },
];

export default function App() {
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const savedData = await AsyncStorage.getItem('contacts');
        if (savedData !== null) {
          setContacts(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Failed to load contacts:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadContacts();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const saveContacts = async () => {
      try {
        await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      } catch (error) {
        console.error('Failed to save contacts:', error);
      }
    };
    saveContacts();
  }, [contacts, isLoaded]);

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1B2A4A" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList">
          {(props) => (
            <ContactListScreen
              {...props}
              contacts={contacts}
              setContacts={setContacts}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddContact">
          {(props) => (
            <AddContactScreen
              {...props}
              contacts={contacts}
              setContacts={setContacts}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
