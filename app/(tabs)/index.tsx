import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CategoryScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
        Choose a Category 🎲
      </Text>

      <Button title="Animals" onPress={() => router.push("/(tabs)/game?category=Animals")} />
      <Button title="Movies" onPress={() => router.push("/(tabs)/game?category=Movies")} />
      <Button title="Sports" onPress={() => router.push("/(tabs)/game?category=Sports")} />
    </View>
  );
}
