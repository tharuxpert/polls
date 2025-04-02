import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";
import { Stack } from "expo-router";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "#17153B" }}>
      <Text style={{ color: "#FFCCEA", textAlign: "center" }}>
        <Text style={{ color: "#FFCCEA", fontWeight: "bold" }}>User ID:</Text>
        <Text style={{ color: "#AACCFF", textAlign: "center" }}>
          {" "}
          {user?.id}
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => supabase.auth.signOut()}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    backgroundColor: "#C8ACD6",
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#2E236C",
    fontWeight: "500",
  },
});
