import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // Aici ar trebui să adaugi logica de autentificare
    navigation.navigate("HomeTabs"); // Navighează la taburi după autentificare
  };

  const handleRegister = () => {
    // Aici ar trebui să adaugi logica de înregistrare
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 60,
          alignItems: "center",
          gap: 13,
        }}
      >
        <Image
          source={require("../mobile/assets/EldersHelperIcon.png")}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "600",
          }}
        >
          Elder's Helper
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
          }}
        >
          Conectare
        </Text>
        <View
          style={{
            gap: 15,
            marginTop: 10,
          }}
        >
          {/* Email input */}
          <TextInput
            placeholderTextColor={"#858585"}
            placeholder="Introdu emailul"
            style={{
              backgroundColor: "#D9D9D9",
              fontSize: 20,
              borderRadius: 8,
              padding: 10,
            }}
          />
          <TextInput
            placeholderTextColor={"#858585"}
            secureTextEntry={true}
            placeholder="Introdu parola"
            style={{
              backgroundColor: "#D9D9D9",
              fontSize: 20,
              borderRadius: 8,
              padding: 10,
            }}
          />
        </View>

        {/* Login button */}
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#001122",
              alignItems: "center",
              padding: 13,
              borderRadius: 8,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              Conecteaza-te
            </Text>
          </View>
        </TouchableOpacity>

        {/* <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity> */}
      </View>
      {/** Footer */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image source={require("../mobile/assets/Stetoscop.png")} />
      </View>
      {/* <TouchableOpacity style={styles.registerButton} onPress={toggleModal}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity> */}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Register</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={registerEmail}
                onChangeText={setRegisterEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={registerPassword}
                onChangeText={setRegisterPassword}
                secureTextEntry
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    marginHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#2196F3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#FF3B30",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
