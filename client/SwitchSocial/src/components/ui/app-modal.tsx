import { ViewStyle, View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";

interface AppModalProps {
  children: React.ReactNode;
  title: string;
  hide: () => void;
  show: boolean;
  submit?: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
  contentContainerStyle?: ViewStyle;
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel = "Save", // Defaulting submitLabel to "Save" here
}: AppModalProps) {
  return (
    <Modal
      transparent={true}
      visible={show}
      animationType="slide"
      onRequestClose={hide}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {children}
          <View style={styles.action}>
            <View style={styles.buttonGroup}>
              {submit && (
                <TouchableOpacity
                  style={[styles.button, submitDisabled && styles.buttonDisabled]}
                  onPress={submit}
                  disabled={submitDisabled}
                >
                  <Text style={styles.buttonText}>{submitLabel}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.button} onPress={hide}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'white', // white background for modal
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16, // Adjust spacing as needed
  },
  action: {
    marginTop: 16, // Adjust spacing as needed
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around", // Adjust based on your design requirements
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF', // Primary button color
    borderRadius: 5,
    margin: 4, // Adjust as needed
  },
  buttonDisabled: {
    backgroundColor: 'gray', // Disabled button color
  },
  buttonText: {
    color: 'white', // Text color
    textAlign: 'center',
  },
});
