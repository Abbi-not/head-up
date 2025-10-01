import { useLocalSearchParams, useRouter } from "expo-router";
import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { categories } from "../../src/data/words";

export default function GameScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const router = useRouter();

  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer

  // Load words from selected category and shuffle
  useEffect(() => {
    if (category && categories[category]) {
      setWordList(shuffleArray([...categories[category]]));
    }
  }, [category]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      router.push(`/(tabs)/score?score=${score}`);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Accelerometer tilt detection
  useEffect(() => {
    const subscription = Accelerometer.addListener((data) => {
      const { y } = data; // forward/backward tilt

      if (y > 0.7) handleCorrect(); // tilt down = correct
      if (y < -0.7) handleSkip();   // tilt up = skip
    });

    Accelerometer.setUpdateInterval(100);

    return () => subscription && subscription.remove();
  }, [currentWordIndex, wordList]);

  const handleCorrect = () => {
    if (currentWordIndex >= wordList.length) return;
    setScore((s) => s + 1);
    nextWord();
  };

  const handleSkip = () => {
    if (currentWordIndex >= wordList.length) return;
    nextWord();
  };

  const nextWord = () => {
    if (currentWordIndex + 1 >= wordList.length) {
      router.push(`/(tabs)/score?score=${score}`);
    } else {
      setCurrentWordIndex((i) => i + 1);
    }
  };

  if (!wordList.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading words...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      <Text style={styles.word}>{wordList[currentWordIndex]}</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.tip}>Tilt down = Correct ✅ | Tilt up = Skip ❌</Text>
    </View>
  );
}

// Utility function to shuffle an array
function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  timer: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  word: { fontSize: 32, fontWeight: "700", marginVertical: 20, textAlign: "center" },
  score: { fontSize: 22, marginBottom: 20 },
  tip: { fontSize: 16, color: "gray", textAlign: "center" },
});
