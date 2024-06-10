import MapSelector from "@/components/map/MapSelector";
import { MapCircleType } from "@/components/map/MapSelector.types";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [circle, setCircle] = useState<MapCircleType|undefined>(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title:'Helyzet választó' });
  }, [navigation]);
  
  return (
    <View
    style={{flex:1}}
    >
      <MapSelector data={circle} setData={setCircle} searchEnabled/>
      <Text>pozicio:{circle?.position.latitude},{circle?.position.longitude}{'\n'} tav: {circle?.radius}</Text>
    </View>
  );
}
