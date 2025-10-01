import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../../src/data/words";

export default function CategoryScreen() {
  const router = useRouter();

  const handleSelectCategory = (category: string) => {
    router.push(`/(tabs)/game?category=${category}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Category</Text>
      <FlatList
        data={Object.keys(categories)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelectCategory(item)}>
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#2c3e50", marginBottom: 20 },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 15,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  cardText: { fontSize: 22, fontWeight: "bold", color: "#fff" },
});
