import { StyleSheet, View, Text } from "react-native";

export default function BlankScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>This is a blank tab!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    padding: 16,
  },
  title: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: "bold", // Bold title
  },
});
