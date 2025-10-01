import { Button, StyleSheet, Text, View } from "react-native";

export default function CategoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Category 🎲</Text>
      <Button
        title="Animals"
        onPress={() => navigation.navigate("Game", { category: "Animals" })}
      />
      <Button
        title="Movies"
        onPress={() => navigation.navigate("Game", { category: "Movies" })}
      />
      <Button
        title="Sports"
        onPress={() => navigation.navigate("Game", { category: "Sports" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20, fontWeight: "bold" },
});
