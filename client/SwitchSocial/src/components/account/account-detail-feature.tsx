import React from "react";
import { View, StyleSheet } from "react-native";
import { useAuthorization } from "../../utils/useAuthorization";
import {
  AccountBalance,
  AccountButtonGroup,
  AccountTokens,
} from "./account-ui";

export function AccountDetailFeature() {
  const { selectedAccount } = useAuthorization();

  if (!selectedAccount) {
    return null;
  }

  return (
    <>
      <View style={styles.balanceContainer}>
        <AccountBalance address={selectedAccount.publicKey} />
        <AccountButtonGroup address={selectedAccount.publicKey} />
      </View>
      <View style={styles.tokensContainer}>
        <AccountTokens address={selectedAccount.publicKey} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  balanceContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  tokensContainer: {
    marginTop: 48,
  },
});
