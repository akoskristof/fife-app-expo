import { Text, View } from "react-native";
import axios from "axios";

export default function Index() {

  axios.defaults.baseURL = 'http://localhost:8888/.netlfiy/functions/index';
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
