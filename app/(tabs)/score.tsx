import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ScoreScreen() {
  const router = useRouter();
  const { score } = useLocalSearchParams<{ score?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over 🎉</Text>
      <Text style={styles.score}>Your Score: {score ?? 0}</Text>

      <Button
        title="Play Again"
        onPress={() => router.replace("/(tabs)")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  score: { fontSize: 24, marginBottom: 30 },
});
