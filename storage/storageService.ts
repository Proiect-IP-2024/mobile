import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN = "access_token";

// set access token
export const setAccessToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, value);
    console.log("Access token was set successfully: " + value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

// get access token
export const getAccessToken = async () => {
  try {
    const value = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (value !== null) {
      // value previously stored
      console.log("Access token was retrieved successfully: " + value);
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
