import { Stack } from "expo-router";
import AuthProvider from "../providers/AuthProvider";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack />
    </AuthProvider>
  );
}
