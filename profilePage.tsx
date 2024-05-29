import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//@ts-expect-error ts error
import RNHTMLtoPDF from "react-native-html-to-pdf";
import FileViewer from "react-native-file-viewer";

export default function ProfilePage() {
  const [CNP, setCNP] = useState("123456789");
  const [age, setAge] = useState("50");
  const [address, setAddress] = useState("Adresa 12345");
  const [phone, setPhone] = useState("123456789");
  const [profession, setProfession] = useState("Sofer pe tir");
  const [workPlace, setWorkPlace] = useState("Loc de munca 1234");
  const createPDF = async () => {
    try {
      let htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; }
              .section { margin-bottom: 20px; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>Fișa Medicală</h1>
            <div class="section">
              <div class="label">Nume Prenume:</div>
              <div>Nume Prenume</div>
            </div>
            <div class="section">
              <div class="label">CNP:</div>
              <div>${CNP}</div>
            </div>
            <div class="section">
              <div class="label">Vârstă:</div>
              <div>${age}</div>
            </div>
            <div class="section">
              <div class="label">Adresă:</div>
              <div>${address}</div>
            </div>
            <div class="section">
              <div class="label">Telefon:</div>
              <div>${phone}</div>
            </div>
            <div class="section">
              <div class="label">Profesie:</div>
              <div>${profession}</div>
            </div>
            <div class="section">
              <div class="label">Loc de muncă:</div>
              <div>${workPlace}</div>
            </div>
          </body>
        </html>
      `;

      let PDFOptions = {
        html: htmlContent,
        fileName: "FisaMedicala",
        directory: Platform.OS === "android" ? "Documents" : "Documents",
      };

      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("Fisa medicala s-a creat!", `Un PDF cu numele FisaMedicala.pdf s-a generat cu succes!`, [
        {
          text: "Deschide PDF",
          onPress: async () => {
            try {
              await FileViewer.open(file.filePath, {
                showOpenWithDialog: true,
                showAppsSuggestions: true,
              });
            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          text: "Inchide",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };
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
                placeholder="Introdu un CNP"
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                value={CNP}
                onChangeText={(text) => setCNP(text)}
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
                placeholder="Introdu varsta"
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                value={age}
                onChangeText={(text) => setAge(text)}
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
                placeholder="Introdu o adresa"
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                onChangeText={(text) => setAddress(text)}
                value={address}
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
                placeholder="Introdu un telefon"
                onChangeText={(text) => setPhone(text)}
                value={phone}
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
                placeholder="Introdu profesia"
                style={{
                  borderColor: "gray",
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
                onChangeText={(text) => setProfession(text)}
                value={profession}
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
                placeholder="Introdu locul de munca"
                value={workPlace}
                onChangeText={(text) => setWorkPlace(text)}
              />
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>Salveaza date</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton} onPress={createPDF}>
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
