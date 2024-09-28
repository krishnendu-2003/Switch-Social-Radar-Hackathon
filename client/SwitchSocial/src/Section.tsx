import React, { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

export const Section: React.FC<{
  children?: ReactNode;
  description?: string;
  title?: string;
}> = ({ children, description, title }) => {
  return (
    <View style={styles.sectionContainer}>
      {title ? (
        <Text style={styles.titleText}>
          {title}
        </Text>
      ) : null}
      {description ? <Text style={styles.descriptionText}>{description}</Text> : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 24, // Adjust font size as needed
    marginBottom: 4, // Add some spacing below the title
  },
  descriptionText: {
    fontSize: 16, // Adjust font size for description
    marginBottom: 8, // Add spacing below description
  },
  sectionContainer: {
    marginTop: 18,
    padding: 16, // Optional: Add padding for better layout
  },
});
