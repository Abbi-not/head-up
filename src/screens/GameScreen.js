import { StyleSheet, Text, View } from "react-native";

export default function GameScreen({ route }) {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category: {category}</Text>
      <Text style={styles.word}>Game logic will go here 🎯</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 15, fontWeight: "bold" },
  word: { fontSize: 28, fontWeight: "600" },
});
