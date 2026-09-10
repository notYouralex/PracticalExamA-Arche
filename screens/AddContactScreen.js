import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

export default function AddContactScreen({ navigation, contacts, setContacts }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleAddContact() {
    if (name.trim() === '' || phone.trim() === '') {
      setErrorMessage('Please fill in both name and phone.');
      return;
    }

    const newContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
    };

    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
    setErrorMessage('');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Contact</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {errorMessage !== '' && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}

      <Pressable style={styles.saveBtn} onPress={handleAddContact}>
        <Text style={styles.saveBtnText}>Save Contact</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingTop: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8DEE9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  error: {
    color: '#B23A48',
    marginBottom: 10,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: '#1E8A7A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
