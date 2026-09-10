import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContactCard from '../components/ContactCard';

export default function ContactListScreen({ navigation, contacts, setContacts }) {
  const [quote, setQuote] = useState('Loading...');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setQuote(data.content))
      .catch(() => setQuote('Welcome to ContactsLite!'));
  }, []);

  function handleDeleteContact(id) {
    setContacts(contacts.filter((c) => c.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{quote}</Text>

      <Text style={styles.count}>
        {contacts.length === 1
          ? '1 contact saved'
          : `${contacts.length} contacts saved`}
      </Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard
            name={item.name}
            phone={item.phone}
            onDelete={() => handleDeleteContact(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No contacts yet.</Text>
        }
      />

      <View style={styles.addBtnContainer}>
        <Text
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddContact')}
        >
          + Add Contact
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
  },
  quote: {
    fontStyle: 'italic',
    color: '#6B7280',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 13,
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 40,
    fontSize: 16,
  },
  addBtnContainer: {
    padding: 16,
    alignItems: 'center',
  },
  addBtn: {
    backgroundColor: '#1B2A4A',
    color: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});
