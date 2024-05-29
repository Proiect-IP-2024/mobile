import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import axios from "axios";
import { BASE_URL } from "./routes/routes";
import { setAccessToken } from "./storage/storageService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onPasswordChange = (text: React.SetStateAction<string>) => {
    setPassword(text);
    setPasswordError("");
  };

  const onEmailChange = (text: React.SetStateAction<string>) => {
    setEmail(text);
    setEmailError("");
  };

  const handleLogin = async () => {
    let globalErrorFlag = false;
    if (password === "") {
      setPasswordError("Acest camp este obligatoriu");
      globalErrorFlag = true;
    }
    if (email === "") {
      setEmailError("Acest camp este obligatoriu");
      globalErrorFlag = true;
    }
    if (!globalErrorFlag) {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/user/login`, {
          userData: {
            email: email,
            password: password,
          },
        });
        setLoading(false);
        console.log(response.data.token);
        if (response.data && response.data.token) {
          // Save the token in local storage or any state management
          // localStorage.setItem('token', response.data.token);
          await setAccessToken(response.data.token);
          // Navigate to the home tab on successful login
          navigation.navigate("HomeTabs");
        } else {
          throw new Error("Invalid login response");
        }
      } catch (error) {
        setLoading(false);
        if (
          error.response &&
          (error.response.data.message.includes("User not found") ||
            error.response.data.message.includes("Invalid password"))
        ) {
          setPasswordError("Invalid email or password");
        } else {
          console.error("Login Error:", error);
        }
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <View style={{ marginTop: 60, alignItems: "center", gap: 13 }}>
          <Image
            source={require("../mobile/assets/icon_1.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text style={{ fontSize: 25, fontWeight: "600" }}>
            Elder's Helper
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: "700" }}>Conectare</Text>
          <View style={{ gap: 15, marginTop: 10 }}>
            <TextInput
              value={email}
              onChangeText={onEmailChange}
              placeholderTextColor={"#858585"}
              placeholder="Introdu emailul"
              style={{
                backgroundColor: "#D9D9D9",
                fontSize: 20,
                borderRadius: 8,
                padding: 10,
                borderColor: emailError ? "red" : "transparent",
                borderWidth: 1,
              }}
            />
            {emailError && <Text style={{ color: "red" }}>{emailError}</Text>}
            <TextInput
              value={password}
              onChangeText={onPasswordChange}
              placeholderTextColor={"#858585"}
              secureTextEntry={true}
              placeholder="Introdu parola"
              style={{
                backgroundColor: "#D9D9D9",
                fontSize: 20,
                borderRadius: 8,
                padding: 10,
                borderColor: passwordError ? "red" : "transparent",
                borderWidth: 1,
              }}
            />
            {passwordError && (
              <Text style={{ color: "red" }}>{passwordError}</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleLogin}>
            <View
              style={{
                backgroundColor: "#001122",
                alignItems: "center",
                padding: 13,
                borderRadius: 8,
                marginTop: 30,
              }}
            >
              {loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 18,
                  }}
                >
                  Conecteaza-te
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 20, flex: 1 }}>
          <Image source={require("../mobile/assets/Stetoscop.png")} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
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
