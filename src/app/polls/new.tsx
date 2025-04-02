import { Redirect, router, Stack } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";
import { Input } from "@rneui/themed";

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
      .insert([{ question, options: valiOptions }])
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

      {/* <Text style={styles.label}>Title</Text> */}
      {/* <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Type your question here"
        style={styles.input}
        placeholderTextColor={"#b9abba"}
      /> */}
      <Input
        label="Title"
        onChangeText={setQuestion}
        value={question}
        placeholder="Type your question here"
        autoCapitalize={"none"}
        labelStyle={{ color: "white" }}
        style={{ fontSize: 16 }}
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
            placeholderTextColor={"#b9abba"}
          />
          <Feather
            name="x"
            size={18}
            color="#C8ACD6"
            onPress={() => {
              // delete option based on index
              const updated = [...options];
              updated.splice(index, 1);
              setOptions(updated);
            }}
            style={{ position: "absolute", right: 20 }}
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => setOptions([...options, ""])}
      >
        <Text style={styles.buttonText}>Add option</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttons} onPress={createPoll}>
        <Text style={styles.buttonText}>Create Poll</Text>
      </TouchableOpacity>
      <Text style={{ color: "crimson" }}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 5,
    backgroundColor: "#17153B",
  },
  label: {
    fontWeight: "700",
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  input: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#382c7d",
    borderRadius: 5,
    padding: 10,
  },
  buttons: {
    padding: 5,
    backgroundColor: "#C8ACD6",
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#2E236C",
    fontWeight: "500",
  },
});
