import { Button, Text } from "react-native";
import { View } from "react-native";
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";
import { Redirect } from "expo-router";

export default function ProfileScreen() {
  const { user } = useAuth();
  
  return (
    <View style={{ padding: 10 }}>
      <Text>User ID: {user?.id}</Text>

      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}
