import { TouchableOpacity, View, Text, StyleSheet, Linking } from "react-native";
import { useState } from "react";
import { useAuthorization, Account } from "../../utils/useAuthorization";
import { useMobileWallet } from "../../utils/useMobileWallet";
import { useNavigation } from "@react-navigation/native";
import { ellipsify } from "../../utils/ellipsify";
import * as Clipboard from "expo-clipboard";
import { useCluster } from "../cluster/cluster-data-access";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function TopBarWalletButton({
  selectedAccount,
  openMenu,
}: {
  selectedAccount: Account | null;
  openMenu: () => void;
}) {
  const { connect } = useMobileWallet();
  return (
    <TouchableOpacity
      style={styles.walletButton}
      onPress={selectedAccount ? openMenu : connect}
    >
      <MaterialCommunityIcons name="wallet" size={20} color="white" />
      <Text style={styles.walletButtonText}>
        {selectedAccount ? ellipsify(selectedAccount.publicKey.toBase58()) : "Connect"}
      </Text>
    </TouchableOpacity>
  );
}

export function TopBarSettingsButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => {
        navigation.navigate("Settings");
      }}
    >
      <MaterialCommunityIcons name="cog" size={24} color="black" />
    </TouchableOpacity>
  );
}

export function TopBarWalletMenu() {
  const { selectedAccount } = useAuthorization();
  const { getExplorerUrl } = useCluster();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { disconnect } = useMobileWallet();

  const copyAddressToClipboard = async () => {
    if (selectedAccount) {
      await Clipboard.setStringAsync(selectedAccount.publicKey.toBase58());
    }
    closeMenu();
  };

  const viewExplorer = () => {
    if (selectedAccount) {
      const explorerUrl = getExplorerUrl(
        `account/${selectedAccount.publicKey.toBase58()}`
      );
      Linking.openURL(explorerUrl);
    }
    closeMenu();
  };

  return (
    <View>
      <TopBarWalletButton selectedAccount={selectedAccount} openMenu={openMenu} />
      {visible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={copyAddressToClipboard}>
            <MaterialCommunityIcons name="content-copy" size={20} color="black" />
            <Text>Copy address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={viewExplorer}>
            <MaterialCommunityIcons name="open-in-new" size={20} color="black" />
            <Text>View Explorer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              await disconnect();
              closeMenu();
            }}
          >
            <MaterialCommunityIcons name="link-off" size={20} color="black" />
            <Text>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  walletButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 8,
  },
  walletButtonText: {
    color: "white",
    marginLeft: 8,
  },
  settingsButton: {
    padding: 10,
  },
  menu: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
});
