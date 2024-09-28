import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native"; // Use native Text
import { Cluster } from "./cluster-data-access";

export function ClusterPickerRadioButtonGroupRow({
  cluster,
  selectedClusterName,
  onSelect,
}: {
  cluster: Cluster;
  selectedClusterName: string;
  onSelect: (clusterName: string) => void;
}) {
  const isSelected = selectedClusterName === cluster.name;

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onSelect(cluster.name)} // Call the onSelect function when pressed
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{cluster.name}</Text>
          <Text style={styles.description}>{cluster.endpoint}</Text>
        </View>
        <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  listItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    color: "#666", // Slightly gray color for description
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6200ea",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#6200ea",
  },
});
