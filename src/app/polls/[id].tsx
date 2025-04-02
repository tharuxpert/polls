import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { Poll, Vote } from "../../types/db";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

export default function PollDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [userVote, setUserVote] = useState<Vote | null>(null);

  const [selected, setSelected] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", Number.parseInt(id))
        .single();
      if (error) {
        Alert.alert("Error fetching data");
      }
      setPoll(data);
    };

    const fetchUserVotes = async () => {
      if (!user) {
        return;
      }
      let { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", Number.parseInt(id))
        .eq("user_id", user.id)
        .limit(1)
        .single();

      setUserVote(data);
      if (data) {
        setSelected(data.option);
      }
    };

    fetchPolls();
    fetchUserVotes();
  }, []);

  const vote = async () => {
    if (!user) {
      return;
    }

    if (!poll?.id) {
      Alert.alert("Error", "Poll ID is missing.");
      return;
    }

    const newVote: {
      id?: number;
      option: string;
      poll_id: number;
      user_id: string;
    } = {
      option: selected,
      poll_id: poll.id,
      user_id: user?.id,
    };
    if (userVote) {
      newVote.id = userVote.id;
    }

    const { data, error } = await supabase
      .from("votes")
      .upsert([newVote])
      .select()
      .single();

    if (error) {
      console.log(error);
      Alert.alert("Failed to vote");
    } else {
      setUserVote(data);
      Alert.alert("Great!", "Thank you for your vote", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  if (!poll) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Poll Voting",
        }}
      />

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
              color={option === selected ? "green" : "#C8ACD6"}
            />
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </View>

      <TouchableOpacity style={styles.voteButton} onPress={vote}>
        <Text style={styles.voteButtonText}>Vote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    flex: 1,
    backgroundColor: "#17153B",
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFE1FF",
  },
  optionContainer: {
    backgroundColor: "#433D8B",
    padding: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionText: { color: "#FFCCEA" },
  voteButton: {
    padding: 5,
    margin: 10,
    backgroundColor: "#C8ACD6",
    borderRadius: 10,
    // borderColor: "#198fc2",
    // borderWidth: 5,
  },
  voteButtonText: {
    fontSize: 26,
    textAlign: "center",
    color: "#2E236C",
    fontWeight: "600",
  },
});
