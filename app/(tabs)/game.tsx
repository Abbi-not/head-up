import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../../src/data/words";

export default function GameScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const router = useRouter();

  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const tapTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastTap = useRef<number>(0);

  // Load words
  useEffect(() => {
    if (category && categories[category]) {
      setWordList(shuffleArray([...categories[category]]));
      setCurrentWordIndex(0);
      setScore(0);
      setTimeLeft(60);
    }
  }, [category]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(`/(tabs)/score?score=${score}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, router]);

  const nextWord = () => {
    setCurrentWordIndex((i) => (i + 1) % wordList.length);
  };

  const handleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      // Double tap → correct
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
        tapTimeout.current = null;
      }
      setScore((s) => s + 1);
      nextWord();
    } else {
      // Single tap → skip
      tapTimeout.current = setTimeout(() => nextWord(), 300);
    }
    lastTap.current = now;
  };

  if (!wordList.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading words...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{timeLeft}s</Text>
          <Text style={styles.badgeLabel}>Time</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{score}</Text>
          <Text style={styles.badgeLabel}>Score</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleTap} activeOpacity={0.8} style={styles.wordCard}>
        <Text style={styles.word}>{wordList[currentWordIndex]}</Text>
      </TouchableOpacity>

      <Text style={styles.tip}>Single tap = Skip ❌ | Double tap = Correct ✅</Text>
    </View>
  );
}

// Shuffle utility
function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f8f9fa" },
  statusContainer: { flexDirection: "row", justifyContent: "space-between", width: "80%", marginBottom: 30 },
  badge: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  badgeText: { fontSize: 24, fontWeight: "bold", color: "#2c3e50" },
  badgeLabel: { fontSize: 12, color: "#7f8c8d" },
  wordCard: {
    width: "90%",
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: "#3498db",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  word: { fontSize: 36, fontWeight: "bold", color: "#fff", textAlign: "center" },
  tip: { marginTop: 30, fontSize: 16, color: "#7f8c8d", textAlign: "center" },
  loading: { fontSize: 20, color: "#7f8c8d" },
});
