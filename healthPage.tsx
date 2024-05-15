import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HealthPage() {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informatii sanatate</Text>
            <View style={styles.infoBox}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Tensiune arteriala</Text>
                <Text style={styles.infoValueGreen}>140/90</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Glicemie</Text>
                <Text style={styles.infoValueRed}>89</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Batai pe minut</Text>
                <Text style={styles.infoValueRed}>120</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informatii EKG</Text>
            {/* EKG information can be represented here */}
            <View style={styles.ekgImagePlaceholder}></View>
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
      navItemActive: {
        fontSize: 16,
        color: '#4CAF50',
      },
    });
