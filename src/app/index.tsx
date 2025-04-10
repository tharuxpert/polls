import { Link, Stack } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Poll } from "../types/db";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log("Fetching...");

      let { data, error } = await supabase.from("polls").select("*");
      if (error) {
        Alert.alert("Error fetching dara");
      }
      setPolls(data || []);
    };
    fetchPolls();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          title: "Polls",
          headerRight: () => (
            <Link href={"polls/new"}>
              <AntDesign name="plus" size={20} color="#C8ACD6" />
            </Link>
          ),
          headerLeft: () => (
            <Link href={"/profile"}>
              <AntDesign name="user" size={20} color="#C8ACD6" />
            </Link>
          ),
          headerTitleAlign: "center",
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollTitle}>{item.question}</Text>
          </Link>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
    backgroundColor: "#17153B",
  },
  pollContainer: {
    backgroundColor: "#433D8B",
    padding: 10,
    borderRadius: 15,
    margin: 3,
  },
  pollTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
