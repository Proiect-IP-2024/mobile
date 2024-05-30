import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { getAccessToken } from './storage/storageService';
import { BASE_URL } from './routes/routes';
import { endpoints } from './routes/routes';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    cnp: '',
    id_medic: '',
    varsta: '',
    adresa: '',
    telefon: '',
    profesie: '',
    loc_munca: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const accesToken =  await getAccessToken(); 
      try {
        const userResponse = await axios.get(`${BASE_URL}${endpoints.GetUserData}`, {
          headers: {
            Authorization: `Bearer ${accesToken}` 
          }
        });
        const pacientResponse = await axios.get(`${BASE_URL}${endpoints.GetPacientData}`, {
          headers: {
            Authorization: `Bearer ${accesToken}` 
          }
        });

        const userData = userResponse.data.user;
        const pacientData = pacientResponse.data.pacient;

        setUserData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          cnp: pacientData.CNP_pacient,
          id_medic: pacientData.id_medic,
          varsta: pacientData.varsta_pacient,
          adresa: pacientData.adresa_pacient,
          telefon: pacientData.telefon_pacient,
          profesie: pacientData.profesie_pacient,
          loc_munca: pacientData.loc_munca_pacient
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{userData.first_name || 'First Name'}</Text>
            <Text style={styles.headerTitle}>{userData.last_name || 'Last Name'}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informatii generale</Text>
            <View style={styles.infoBox}>
              <InfoItem label="CNP:" value={userData.cnp} />
              <InfoItem label="Varsta:" value={userData.varsta} />
              <InfoItem label="Adresa:" value={userData.adresa} />
              <InfoItem label="Telefon:" value={userData.telefon} />
              <InfoItem label="Profesie:" value={userData.profesie} />
              <InfoItem label="Loc de munca:" value={userData.loc_munca} />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const InfoItem = ({ label, value }: any) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || 'N/A'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    padding: 20,
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
});
