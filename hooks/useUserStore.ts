import { useContext } from "react";
import { BASE_URL, endpoints } from "../routes/routes";
import { MyRoutes } from "../routes/routes";
import { createRequestOptions } from "../utils/utils";
import { getAccessToken, setAccessToken } from "../storage/storageService";

const getUserData = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return false;
  }

  const getUserDataResponse = await (
    await fetch(
      `${BASE_URL}${endpoints.GetUserData}`,
      createRequestOptions("GET", accessToken)
    )
  ).json();

  if (!(getUserDataResponse && getUserDataResponse.user)) {
    return false;
  }

  const getUserTypeResponse = await (
    await fetch(
      `${BASE_URL}${endpoints.GetUserType}`,
      createRequestOptions("GET", authToken)
    )
  ).json();

  if (!getUserTypeResponse) {
    return false;
  }

  if (getUserTypeResponse.isMedic) {
    const getMedicDataResponse = await (
      await fetch(
        `${BASE_URL}${endpoints.GetMedicData}`,
        createRequestOptions("GET", authToken)
      )
    ).json();

    if (getMedicDataResponse && getMedicDataResponse.medic) {
      setUser({
        ...getUserDataResponse.user,
        telefon: getMedicDataResponse.medic.telefon,
        userPower: 2,
      });
      return true;
    }
  } else if (getUserTypeResponse.isPacient) {
    const getPacientDataResponse = await (
      await fetch(
        `${BASE_URL}${endpoints.GetPacientData}`,
        createRequestOptions("GET", authToken)
      )
    ).json();
    if (getPacientDataResponse && getPacientDataResponse.pacient) {
      setUser({
        ...getUserDataResponse.user,
        ...getPacientDataResponse.pacient,
        userPower: 5,
      });
      return true;
    }
  } else if (getUserTypeResponse.isIngrijitor) {
    const getIngrijitorDataResponse = await (
      await fetch(
        `${BASE_URL}${endpoints.GetIngrijitorData}`,
        createRequestOptions("GET", authToken)
      )
    ).json();

    if (getIngrijitorDataResponse && getIngrijitorDataResponse.ingrijitor) {
      setUser({
        ...getUserDataResponse.user,
        userPower: 4,
      });
      return true;
    }
  } else if (getUserTypeResponse.isAdmin) {
    setUser({
      ...getUserDataResponse.user,
      userPower: 1,
    });
    return true;
  } else {
    console.error("Error getting data");
    return false;
  }

  console.error("Error getting data");
  return false;
};

export const login = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoints.Login}`,
      createRequestOptions("POST", undefined, {
        userData: {
          email,
          password,
        },
      })
    );
    const result = await response.json();
    if (response.ok) {
      setAccessToken(result.token);
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log("Failed to login user");
    return false;
  }
  return false;
};

//   const refreshUserToken = async () => {
//     let authTokenFromCokies = null;

//     try {
//       if (
//         cookies &&
//         process.env.COOKIE_NAME &&
//         cookies[process.env.COOKIE_NAME]
//       ) {
//         authTokenFromCokies = cookies[process.env.COOKIE_NAME];
//       } else if (cookies && cookies.ProiectIP2024) {
//         authTokenFromCokies = cookies.ProiectIP2024;
//       }

//       if (!authTokenFromCokies) return false;

//       const response = await fetch(
//         `${BASE_URL}${endpoints.RefreshToken}`,
//         createRequestOptions("GET", authTokenFromCokies)
//       );
//       const result = await response.json();
//       if (response.ok) {
//         setCookie(process.env.COOKIE_NAME || "ProiectIP2024", result.token, {
//           path: "/",
//         });

//         setAuthToken(result.token);
//         return true;
//       }
//     } catch (e) {
//       console.log(e);
//       console.log("Failed to refresh token");
//       return false;
//     }
//     return false;
//   };

export const logout = async () => {
  // setUser(null);
  await setAccessToken("");
  // removeCookie("ProiectIP2024");
  // navigate(MyRoutes.LoginPage);
};

export const GetPacientData = async (pacientID: string) => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      `${BASE_URL}${endpoints.GetPacientData}`,
      createRequestOptions("POST", accessToken ?? undefined, {
        pacientID,
      })
    );
    const result = await response.json();
    if (response.ok && result.pacient) {
      return { isOk: true, response: result.pacient };
    } else {
      return { isOk: false, response: "User is not a message" };
    }
  } catch (e) {
    console.log(e);
    console.log("Failed to get registered patients");
    return { isOk: false, response: "User is not a message" };
  }
};

export const getPacientProfile = async (pacientID: string) => {
  try {
    const authToken = await getAccessToken();
    const response = await fetch(
      `${BASE_URL}${endpoints.GetPacientProfile}`,
      createRequestOptions("POST", authToken ?? undefined, {
        pacientID,
      })
    );
    const result = await response.json();

    if (response.ok && result.pacient) {
      return { isOk: true, response: result.pacient };
    } else {
      return { isOk: false, response: "Patient not found" };
    }
  } catch (e) {
    console.log(e);
    console.log("Failed to get patient");
    return { isOk: false, response: "Failed to get patient" };
  }
};
