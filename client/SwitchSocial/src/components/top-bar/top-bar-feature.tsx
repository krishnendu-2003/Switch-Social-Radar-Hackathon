import { StyleSheet, View, TouchableOpacity } from "react-native";
import { TopBarWalletButton, TopBarWalletMenu } from "./top-bar-ui";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For the cog icon

export function TopBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.topBar}>
      <TopBarWalletMenu />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <MaterialCommunityIcons name="cog" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row", // To align items horizontally
    height: 56, // Similar height as Appbar.Header
    paddingHorizontal: 16,
    backgroundColor: "#fff", // You can use a theme-based background color if needed
  },
});
