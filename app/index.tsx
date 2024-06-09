import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href='test' asChild>
      <Button title="Térkép kereső"/>
      </Link>
    </View>
  );
}
