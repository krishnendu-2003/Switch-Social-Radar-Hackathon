import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { useState, useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { alertAndLog } from "../../utils/alertAndLog";
import { useAuthorization } from "../../utils/useAuthorization";
import { useMobileWallet } from "../../utils/useMobileWallet";

export function ConnectButton() {
  const { authorizeSession } = useAuthorization();
  const { connect } = useMobileWallet();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await connect();
    } catch (err: any) {
      alertAndLog(
        "Error during connect",
        err instanceof Error ? err.message : err
      );
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);

  return (
    <TouchableOpacity
      style={[styles.button, authorizationInProgress ? styles.disabledButton : styles.activeButton]}
      disabled={authorizationInProgress}
      onPress={handleConnectPress}
    >
      <Text style={styles.buttonText}>Connect</Text>
    </TouchableOpacity>
  );
}

export function SignInButton() {
  const { authorizeSession } = useAuthorization();
  const { signIn } = useMobileWallet();
  const [signInInProgress, setSignInInProgress] = useState(false);
  
  const handleConnectPress = useCallback(async () => {
    try {
      if (signInInProgress) {
        return;
      }
      setSignInInProgress(true);
      await signIn({
        domain: "yourdomain.com",
        statement: "Sign into Expo Template App",
        uri: "https://yourdomain.com",
      });
    } catch (err: any) {
      alertAndLog(
        "Error during sign in",
        err instanceof Error ? err.message : err
      );
    } finally {
      setSignInInProgress(false);
    }
  }, [signInInProgress, authorizeSession]);

  return (
    <TouchableOpacity
      style={[styles.button, styles.outlineButton, signInInProgress ? styles.disabledButton : styles.activeButton]}
      disabled={signInInProgress}
      onPress={handleConnectPress}
    >
      <Text style={styles.buttonText}>Sign in</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#6200ea",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#6200ea",
    marginLeft: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
