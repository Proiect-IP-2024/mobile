import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomePage() {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mihai Dragomir</Text>
            <Text style={styles.headerSubtitle}>Male</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informatii generale</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}><Text style={styles.label}>Data nașterii:</Text> 4 Oct 2002 (21 ani)</Text>
              <Text style={styles.infoText}><Text style={styles.label}>Adresa:</Text> Timisoara, Romania</Text>
              <Text style={styles.infoText}><Text style={styles.label}>CNP:</Text> 1234567890123</Text>
              <Text style={styles.infoText}><Text style={styles.label}>Profesie:</Text> Programator</Text>
              <Text style={styles.infoText}><Text style={styles.label}>Adresa de email:</Text> elample@example.com</Text>
              <Text style={styles.infoText}><Text style={styles.label}>Loc de munca:</Text> SC EXEMPLU SRL</Text>
              <Text style={styles.infoText}><Text style={styles.label}>Numar de telefon:</Text> +40 722 222 222</Text>
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
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f0f0f5',
        padding: 20,
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
      headerSubtitle: {
        fontSize: 18,
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
      infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
      },
      label: {
        fontWeight: 'bold',
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
      navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      },
      navItem: {
        fontSize: 16,
        color: '#333',
      },
    });
