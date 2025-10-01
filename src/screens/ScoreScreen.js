import { Button, StyleSheet, Text, View } from "react-native";

export default function ScoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final Score 🎉</Text>
      <Button
        title="Play Again"
        onPress={() => navigation.navigate("Category")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, marginBottom: 20, fontWeight: "bold" },
});
