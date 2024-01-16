// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
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

      const newUser = {
        id: (data.record.users.length + 1).toString(),
        username,
        password,
      };

      data.record.users.push(newUser);

      const postResponse = await fetch(
        'https://api.jsonbin.io/v3/b/65a661b3dc7465401893e538',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-key':
              '$2a$10$9rQkPYBy2edEkvps.0L2pOH3eO0Uu0/aPxxZZs8It8Yp5C5de91RS',
            'X-Access-key':
              '$2a$10$oaMFBosEf7XRTiQkVkp6xuRbdewHDVdN/S5eu9oONL.1xj8AHLxia',
          },
          body: JSON.stringify(data.record),
        }
      );

      if (postResponse.ok) {
        console.log('Registration successful!');
        navigation.navigate('Login');
      } else {
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default RegisterScreen;
