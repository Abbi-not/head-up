import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function InputScreen() {
  const router = useRouter();
  const [words, setWords] = useState("");
  const [time, setTime] = useState("60");

  const handleStartGame = () => {
    const wordArray = words.split(",").map((w) => w.trim()).filter(Boolean);

    if (wordArray.length < 3) {
      Alert.alert("Error", "Please enter at least 3 words.");
      return;
    }
    const timeInt = parseInt(time, 10);
    if (isNaN(timeInt) || timeInt <= 0) {
      Alert.alert("Error", "Please enter a valid positive time in seconds.");
      return;
    }

    router.push(`/game?words=${encodeURIComponent(wordArray.join(","))}&time=${timeInt}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Custom Game Setup</Text>

      <Text style={styles.label}>Enter words (comma separated):</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="apple, banana, cat, dog"
        value={words}
        onChangeText={setWords}
      />

      <Text style={styles.label}>Set game time (seconds):</Text>
      <TextInput
        style={styles.input}
        placeholder="60"
        keyboardType="numeric"
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 28, fontWeight: "bold", color: "#2c3e50", marginBottom: 30, textAlign: "center" },
  label: { fontSize: 16, color: "#34495e", alignSelf: "flex-start", marginVertical: 10 },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
