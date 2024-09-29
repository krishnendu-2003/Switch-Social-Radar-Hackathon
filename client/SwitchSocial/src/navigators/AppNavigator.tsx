/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 */
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import * as Screens from "../screens";
import { HomeNavigator } from "./HomeNavigator";
import { StatusBar } from "expo-status-bar";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  MainPage: undefined;
  SignUp: undefined;
  // 🔥 Your screens go here
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={"MainPage"}>
      <Stack.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MainPage" component={Screens.MainPage}  options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={Screens.SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Screens.SettingsScreen} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  );
};


export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  // Using react-navigation's default and dark themes without react-native-paper
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
