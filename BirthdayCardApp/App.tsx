import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function App() {
  const [cardText, setCardText] = useState('Happy Birthday!');
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <LinearGradient colors={['#ffafbd', '#ffc3a0']} style={styles.container}>
      <Text style={styles.title}>🎉 Design Your Birthday Card 🎉</Text>

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Add a Photo</Text>
        )}
      </TouchableOpacity>

      {/* Card Preview */}
      <View style={styles.cardPreview}>
        {image && <Image source={{ uri: image }} style={styles.cardImage} />}
        <View style={styles.textContainer}>
          {isEditing ? (
            <TextInput
              style={[styles.cardText, styles.editableText]}
              value={cardText}
              onChangeText={setCardText}
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.cardText}>{cardText}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.decorativeText}>🎂✨ Celebrate with Love ✨🎂</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 20,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    fontSize: 18,
    color: '#aaa',
    fontFamily: 'Poppins_400Regular',
  },
  cardPreview: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  textContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#ff6f61',
    textAlign: 'center',
  },
  editableText: {
    borderBottomWidth: 1,
    borderBottomColor: '#ff6f61',
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  decorativeText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6c757d',
    marginTop: 10,
  },
});
