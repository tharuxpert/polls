import { Redirect, router, Stack } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const createPoll = async () => {
    setError("");
    if (!question) {
      setError("Please provide the question");
    }
    const valiOptions = options.filter((o) => !!o);
    if (valiOptions.length < 2) {
      setError("Please provide at least 2 options");
      return;
    }

    const { data, error } = await supabase
      .from("polls")
      .insert([{ question,options: valiOptions }])
      .select();
    
    if (error) {
      Alert.alert("Failed to create the poll");
      return;
    }

    router.back();

    console.warn("Create");
  };

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Poll" }} />

      <Text style={styles.label}>Title</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Type your question here"
        style={styles.input}
      />

      <Text style={styles.label}>Options</Text>
      {options.map((option, index) => (
        <View key={index} style={{ justifyContent: "center" }}>
          <TextInput
            value={option}
            onChangeText={(text) => {
              const updated = [...options];
              updated[index] = text;
              setOptions(updated);
            }}
            placeholder={`Option ${index + 1}`}
            style={styles.input}
          />
          <Feather
            name="x"
            size={18}
            color="grey"
            onPress={() => {
              // delete option based on index
              const updated = [...options];
              updated.splice(index, 1);
              setOptions(updated);
            }}
            style={{ position: "absolute", right: 10 }}
          />
        </View>
      ))}
      <Button title="Add option" onPress={() => setOptions([...options, ""])} />

      <Button title="Create Poll" onPress={createPoll} />
      <Text style={{ color: "crimson" }}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  label: {
    fontWeight: "500",
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});
