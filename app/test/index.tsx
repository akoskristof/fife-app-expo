import MapSelector from "@/components/map/MapSelector";
import { MapCircleType } from "@/components/map/MapSelector.types";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [circle, setCircle] = useState<MapCircleType|undefined>(undefined);
  
  return (
    <View
    style={{flex:1}}
    >
      <MapSelector data={circle} setData={setCircle}/>
      <Text>pozicio:{circle?.position.latitude},{circle?.position.longitude}{'\n'} tav: {circle?.radius}</Text>
    </View>
  );
}
