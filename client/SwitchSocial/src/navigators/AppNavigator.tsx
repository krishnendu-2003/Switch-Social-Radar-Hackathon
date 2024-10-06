import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { useColorScheme, ActivityIndicator, View } from "react-native";
import * as Screens from "../screens";
import { HomeNavigator } from "./HomeNavigator";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URI } from "../constants";

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  MainPage: undefined;
  SignUp: undefined;
  WalletConnect: undefined;
  Profile: undefined;
  FeedScreen: undefined;
  CreatePost: undefined;
  SocialApp: undefined;
  SignIn: undefined;
  logoutButton: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [initRoute, setInitRoute] = useState<"FeedScreen" | "MainPage" | null>(null);
  const [loading, setLoading] = useState(true);

  // New function to call login and navigate based on success/failure
  const attemptLogin = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      const password = await AsyncStorage.getItem("password");

      if (email && password) {
        await handleRegister(email, password);
        setInitRoute("FeedScreen"); // Navigate to FeedScreen on successful login
      } else {
        setInitRoute("MainPage"); // Navigate to MainPage if no credentials
      }
    } catch (error) {
      console.error("Error during login check:", error.message);
      setInitRoute("MainPage"); // Navigate to MainPage if login fails
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  // The login function, which sends the email and password to the backend
  const handleRegister = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const data = await response.json();
      const { token } = data;
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      throw new Error(error.message || "An unexpected error occurred during login.");
    }
  };

  // Call attemptLogin when the app starts
  useEffect(() => {
    attemptLogin();
  }, []);

  if (loading) {
    // Show a loading spinner while checking login status
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initRoute || "MainPage"}>
      <Stack.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainPage"
        component={Screens.MainPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={Screens.SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={Screens.SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletConnect"
        component={Screens.WalletConnect}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Screens.Profile}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="FeedScreen"
        component={Screens.FeedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePost"
        component={Screens.CreatePost}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Screens.SettingsScreen} />
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  const CombinedDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
    },
  };

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}
      {...props}
    >
      <StatusBar />
      <AppStack />
    </NavigationContainer>
  );
};
