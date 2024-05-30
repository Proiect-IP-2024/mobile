import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
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

interface Tratament {
  tratament: string;
  data_emitere: string;
  alte_detalii: string;
  bifat_supraveghetor: number;
  data_ora_bifare: string;
  observatii_ingrijitor: string;
}

interface Medicament {
  nume_medicament: string;
  frecventa: string;
}

interface Recomandare {
  tip_recomandare: string;
  durata_zilnica: number;
  alte_indicatii: string;
  tratamente: string;
}

interface Diagnostic {
  diagnostic: string;
  data_emitere: string;
  alte_detalii: string;
}

interface HealthData {
  consult: ConsultData;
  sensor_data: SensorData[];
  tratamente: Tratament[];
  medicamente: Medicament[];
  recomandare: Recomandare[];
  diagnostic: Diagnostic[];
}

export default function HealthPage() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const accessToken = await getAccessToken();
    try {
      const userResponse = await axios.get(`${BASE_URL}${endpoints.GetUserData}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userId = userResponse.data.user.user_id;

      const profileResponse = await axios.post(
        `${BASE_URL}${endpoints.GetPacientProfile}`,
        { pacientID: userId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setHealthData(profileResponse.data.pacient);
      console.log(profileResponse.data.pacient);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
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
        <Text style={styles.errorText}>Încărcarea datelor de sănătate a eșuat</Text>
      </View>
    );
  }

  const latestSensorData = healthData.sensor_data[healthData.sensor_data.length - 1];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profilul Sănătății</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informații Sănătate</Text>
        <View style={styles.infoBox}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tensiune arterială</Text>
            <Text style={styles.infoValueGreen}>{healthData.consult.tensiune}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Glicemie</Text>
            <Text style={styles.infoValueRed}>{healthData.consult.glicemie}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Bătăi pe minut</Text>
            <Text style={styles.infoValueRed}>{latestSensorData.valoare_puls}</Text>
          </View>
        </View>
      </View>

     <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medicamente prescrise</Text>
        {healthData.medicamente && healthData.medicamente.length > 0 ? (
          healthData.medicamente.map((medicament, index) => (
            <View key={index} style={styles.infoBox}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Nume Medicament</Text>
                <Text style={styles.infoValue}>{medicament.nume_medicament}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Frecvență</Text>
                <Text style={styles.infoValue}>{medicament.frecventa}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.infoValue}>Nu există medicamente prescrise.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recomandări</Text>
        {healthData.recomandare.map((recomandare, index) => (
          <View key={index} style={styles.infoBox}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tip Recomandare</Text>
              <Text style={styles.infoValue}>{recomandare.tip_recomandare}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Durată Zilnică</Text>
              <Text style={styles.infoValue}>{recomandare.durata_zilnica} ore</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Alte Indicații</Text>
              <Text style={styles.infoValue}>{recomandare.alte_indicatii}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tratamente</Text>
              <Text style={styles.infoValue}>{recomandare.tratamente}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tratamente</Text>
        {healthData.tratamente.map((tratament, index) => (
          <View key={index} style={styles.infoBox}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tratament</Text>
              <Text style={styles.infoValue}>{tratament.tratament}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Data Emitere</Text>
              <Text style={styles.infoValue}>{new Date(tratament.data_emitere).toLocaleDateString()}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Alte Detalii</Text>
              <Text style={styles.infoValue}>{tratament.alte_detalii}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Bifat Supraveghetor</Text>
              <Text style={styles.infoValue}>{tratament.bifat_supraveghetor ? 'Da' : 'Nu'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Data Ora Bifare</Text>
              <Text style={styles.infoValue}>{tratament.data_ora_bifare}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Observații Îngrijitor</Text>
              <Text style={styles.infoValue}>{tratament.observatii_ingrijitor}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diagnostic</Text>
        {healthData.diagnostic.map((diagnostic, index) => (
          <View key={index} style={styles.infoBox}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Diagnostic</Text>
              <Text style={styles.infoValue}>{diagnostic.diagnostic}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Data Emitere</Text>
              <Text style={styles.infoValue}>{new Date(diagnostic.data_emitere).toLocaleDateString()}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Detalii</Text>
              <Text style={styles.infoValue}>{diagnostic.alte_detalii}</Text>
            </View>
          </View>
        ))}
      </View>
        
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informații EKG</Text>
        <View style={styles.ekgImagePlaceholder}>
          {/* Placeholder for EKG information or image */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 40, 
  },
  header: {
    padding: 20,
   
    alignItems: 'center',
  },
  headerTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    color: '#333',
  },
  infoValueGreen: {
    color: 'green',
  },
  infoValueRed: {
    color: 'red',
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
    color: 'red',
    fontSize: 18,
  },
  ekgImagePlaceholder: {
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


