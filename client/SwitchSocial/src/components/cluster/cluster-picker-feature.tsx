import { ClusterNetwork, useCluster } from "./cluster-data-access";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ClusterPickerRadioButtonGroupRow } from "./cluster-ui";

function clusternetworkToIndex(clusterName: string): number {
  switch (clusterName) {
    case ClusterNetwork.Devnet:
      return 0;
    case ClusterNetwork.Testnet:
      return 1;
    default:
      throw Error("Invalid cluster selected");
  }
}

export default function ClusterPickerFeature() {
  const { selectedCluster, clusters, setSelectedCluster } = useCluster();
  const [devNetCluster, testNetCluster] = clusters;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cluster:</Text>
      <View>
        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedCluster(devNetCluster)}
        >
          <View style={styles.radioButton}>
            {selectedCluster.network === ClusterNetwork.Devnet && (
              <View style={styles.radioButtonSelected} />
            )}
          </View>
          <Text style={styles.radioButtonText}>Devnet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedCluster(testNetCluster)}
        >
          <View style={styles.radioButton}>
            {selectedCluster.network === ClusterNetwork.Testnet && (
              <View style={styles.radioButtonSelected} />
            )}
          </View>
          <Text style={styles.radioButtonText}>Testnet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6200ea",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#6200ea",
  },
  radioButtonText: {
    fontSize: 16,
  },
});
