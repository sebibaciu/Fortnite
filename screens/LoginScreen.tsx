// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, Text, ScrollView, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError('Please enter both username and password');
        return;
      }

      setLoading(true);

      const response = await fetch(
        'https://api.jsonbin.io/v3/b/65a661b3dc7465401893e538',
        {
          method: 'GET',
          headers: {
            'X-Master-key':
              '$2a$10$9rQkPYBy2edEkvps.0L2pOH3eO0Uu0/aPxxZZs8It8Yp5C5de91RS',
          },
        }
      );

      const data = await response.json();
      const authenticatedUser = data.record.users.find(
        (user) => user.username === username && user.password === password
      );

      if (authenticatedUser) {
        navigation.navigate('Main');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
      {loading && <ActivityIndicator size="large" />}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});

export default LoginScreen;
