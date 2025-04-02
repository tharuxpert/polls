import { Stack } from "expo-router";
import AuthProvider from "../providers/AuthProvider";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#17153B" },
          headerTitleStyle: { color: "#fff" },
          headerTintColor: "#C8ACD6",
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="(protected)"
          options={{
            title: "Profile",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
