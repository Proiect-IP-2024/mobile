import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    birthDate: '',
    address: '',
    cnp: '',
    profession: '',
    email: '',
    workplace: '',
    phone: ''
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Aici poți adăuga logica de salvare a datelor (de exemplu, trimiterea datelor către un server)
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {isEditing ? (
          <TextInput
            style={styles.headerTitle}
            value={userData.name}
            onChangeText={(value) => setUserData({ ...userData, name: value })}
            placeholder="Nume complet"
          />
        ) : (
          <Text style={styles.headerTitle}>{userData.name || 'Nume complet'}</Text>
        )}
        {isEditing ? (
          <TextInput
            style={styles.headerSubtitle}
            value={userData.gender}
            onChangeText={(value) => setUserData({ ...userData, gender: value })}
            placeholder="Gen"
          />
        ) : (
          <Text style={styles.headerSubtitle}>{userData.gender || 'Gen'}</Text>
        )}
        <TouchableOpacity onPress={handleEditToggle} style={styles.editButton}>
          <Ionicons name={isEditing ? "checkmark" : "pencil"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informatii generale</Text>
        <View style={styles.infoBox}>
          <EditableInfoItem
            label="Data nașterii:"
            value={userData.birthDate}
            isEditing={isEditing}
            onChange={(value : any) => setUserData({ ...userData, birthDate: value })}
            placeholder="Data nașterii"
          />
          <EditableInfoItem
            label="Adresa:"
            value={userData.address}
            isEditing={isEditing}
            onChange={(value: any) => setUserData({ ...userData, address: value })}
            placeholder="Adresa"
          />
          <EditableInfoItem
            label="CNP:"
            value={userData.cnp}
            isEditing={isEditing}
            onChange={(value: any) => setUserData({ ...userData, cnp: value })}
            placeholder="CNP"
          />
          <EditableInfoItem
            label="Profesie:"
            value={userData.profession}
            isEditing={isEditing}
            onChange={(value: any) => setUserData({ ...userData, profession: value })}
            placeholder="Profesie"
          />
          <EditableInfoItem
            label="Adresa de email:"
            value={userData.email}
            isEditing={isEditing}
            onChange={(value: any) => setUserData({ ...userData, email: value })}
            placeholder="Adresa de email"
          />
          <EditableInfoItem
            label="Loc de munca:"
            value={userData.workplace}
            isEditing={isEditing}
            onChange={(value: any) => setUserData({ ...userData, workplace: value })}
            placeholder="Loc de munca"
          />
          <EditableInfoItem
            label="Numar de telefon:"
            value={userData.phone}
            isEditing={isEditing}
            onChange={(value: any) => setUserData({ ...userData, phone: value })}
            placeholder="Numar de telefon"
          />
        </View>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Descarca fisa medicala</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Istoric observatii</Text>
        <View style={styles.observationBox}>
          <Text style={styles.observationText}>Exemplu observatie</Text>
          <Text style={styles.observationDetails}>Nume Prenume ZZ.MM.YYYY</Text>
        </View>
        <View style={styles.observationBox}>
          <Text style={styles.observationText}>Exemplu observatie</Text>
          <Text style={styles.observationDetails}>Nume Prenume ZZ.MM.YYYY</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const EditableInfoItem = ({ label, value, isEditing, onChange, placeholder } : any ) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    {isEditing ? (
      <TextInput
        style={styles.infoValue}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    ) : (
      <Text style={styles.infoValue}>{value || placeholder}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#333',
  },
  editButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  downloadButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  observationBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  observationText: {
    fontSize: 16,
    color: '#333',
  },
  observationDetails: {
    fontSize: 14,
    color: '#777',
  },
});
