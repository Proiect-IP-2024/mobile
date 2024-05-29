import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust the offset as needed
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: 20,
            }}
          >
            <FontAwesome
              name="user"
              size={80}
              color={"gray"}
              style={{
                alignSelf: "center",
              }}
            />
            <View
              style={{
                gap: 7,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "600",
                }}
              >
                Nume Prenume
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "gray",
                }}
              >
                Pacient
              </Text>
            </View>
            {/* CNP */}
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text>CNP</Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                value="123456789"
              />
            </View>
            {/* Varsta */}
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text>Varsta</Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                value="50"
              />
            </View>
            {/* Adresa */}
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text>Adresa</Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                value="Adresa 12345"
              />
            </View>
            {/* Telefon */}
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text>Telefon</Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                value="123456789"
              />
            </View>
            {/* Profesie */}
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text>Profesie</Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                value="Sofer pe tir"
              />
            </View>
            {/* Loc de munca */}
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text>Loc de munca</Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                value="Loc de munca"
              />
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>
                Salveaza date
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>
                Descarca fisa medicala
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
  },
  downloadButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
