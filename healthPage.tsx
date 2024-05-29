import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import EKGChart from './EKG/EKGChart';
import { BASE_URL } from './routes/routes';
import { getAccessToken } from './storage/storageService';
import { endpoints } from './routes/routes';
interface ConsultData {
  tensiune: number;
  glicemie: number;
}

interface SensorData {
  valoare_puls: number;
}

interface HealthData {
  consult: ConsultData;
  sensor_data: SensorData[];
}

export default function HealthPage() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    const accesToken =  await getAccessToken(); 
    try {
     
      const userResponse = await fetch(`${BASE_URL}${endpoints.GetUserData}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accesToken}`
        }
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      const userId = userData.user.user_id;

      const profileResponse = await fetch(`${BASE_URL}${endpoints.GetPacientData}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accesToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pacientID: userId })
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch pacient profile');
      }

      const profileData = await profileResponse.json();
      setHealthData(profileData.pacient);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Reîmprospătare la fiecare 5 secunde
    return () => clearInterval(interval); // Curățare interval la demontarea componentului
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!healthData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load health data</Text>
      </View>
    );
  }

  const latestSensorData = healthData.sensor_data[healthData.sensor_data.length - 1];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informatii sanatate</Text>
        <View style={styles.infoBox}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tensiune arteriala</Text>
            <Text style={styles.infoValueGreen}>{healthData.consult.tensiune}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Glicemie</Text>
            <Text style={styles.infoValueRed}>{healthData.consult.glicemie}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Batai pe minut</Text>
            <Text style={styles.infoValueRed}>{latestSensorData.valoare_puls}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informatii EKG</Text>
        {/* <EKGChart /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
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
    color: '#333',
    fontWeight: 'bold',
  },
  infoValueGreen: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  infoValueRed: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
  },
  ekgImagePlaceholder: {
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
});


