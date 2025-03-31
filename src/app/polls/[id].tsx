import { Stack, useLocalSearchParams } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

const poll = {
  question: "React Native vs Flutter?",
  options: ["React Native FTW", "Flutter", "SwiftUI"],
};

export default function PollDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selected, setSelected] = useState("React Native FTW");

  const vote = () => {
    console.warn("Vote: ", selected);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:'Poll Voting'}} />

      <Text style={styles.question}>{poll.question}</Text>

      <View style={{ gap: 5 }}>
        {poll.options.map((option) => (
          <Pressable
            onPress={() => setSelected(option)}
            key={option}
            style={styles.optionContainer}
          >
            <Feather
              name={option === selected ? "check-circle" : "circle"}
              size={18}
              color={option === selected ? "green" : "grey"}
            />
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>

      <Button onPress={vote} title="Vote" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
  },
  optionContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
