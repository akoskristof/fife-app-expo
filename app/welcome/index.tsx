import Comments from "@/components/comments/Comments";
import styles from "@/components/mapView/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { useWindowDimensions, View, Linking, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Image, ImageContentFit } from "expo-image";

const About = () => {
  const small = useWindowDimensions().width <= 900;
  const db = getDatabase();
  const navigation = router;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (email) {
      const newPostRef = push(ref(db, "about/emails"));
      set(newPostRef, {
        email,
      })
        .then((res) => {
          console.log(res);
          setEmail("");
          setSent(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const next = () => {
    console.log("next");
    navigation.push("/");
    AsyncStorage.setItem("login", true);
  };

  return (
    <>
      <ScrollView style={{ padding: 0, paddingHorizontal: 0 }}>
        <View style={{ marginHorizontal: small ? 0 : 100 }}>
          <View style={[styles.container, { backgroundColor: "#fcf9ef" }]}>
            <View style={{ alignItems: "center", textAlign: "center" }}>
              <View style={{ flex: 1 }}>
                <Text>FiFe app</Text>
                <Text style={{ marginTop: -8 }}>Szerető közösség</Text>
              </View>
            </View>
            <Text style={{ textAlign: "left", fontSize: 17 }}>
              {"\n"}A mai elszigetelt világban szükség van egy olyan rendszerre,
              amely összehozza a jóérzésű embereket egy biztonságos közösségbe.
              {"\n"}Ez a gondolat ihlette a{" "}
              <Text>Fiatal Felnőttek applikációt</Text>, amely sokrétű online
              felületet nyújt a nagyvárosban élőknek.
            </Text>
          </View>
          <View
            style={{
              flex: undefined,
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Text
              contained
              style={[{ flexGrow: 1, marginBottom: 20 }, small && { order: 3 }]}
            >
              <Text>Cserebere</Text>
              {"\n"}
              Egy egyszerű adok-veszek oldal, ahol keresgélhetsz illetve
              hirdethetsz eladó tárgyak, munkák, kiadó lakások közt. Ezeket a
              cikkeket le tudod foglalni, és chatelni a hirdetővel.
              {"\n"}
              <View
                style={{ width: "100%", alignItems: "center", display: "none" }}
              >
                <Button title="Megyek csereberélni!" color="#fdcf99" />
              </View>
            </Text>
            <Image
              source={require("../../assets/images/img-prof.jpg")}
              resizeMode="contain"
              style={{
                height: 200,
                width: 200,
                margin: 20,
                borderRadius: 16,
                alignSelf: "center",
              }}
            />
          </View>
          <View style={[styles.container, { alignItems: "center" }]}>
            <Text>Bizniszelj!</Text>
            <View style={[{ flex: undefined, marginTop: 10 }]}>
              <View
                style={[
                  {
                    margin: 4,
                    padding: 12,
                    backgroundColor: "#fcf9ef",
                    flex: small ? undefined : 1,
                  },
                ]}
              >
                <Text size={17} bold>
                  1. Mihez értesz?
                </Text>
                <Text size={17}>
                  Oszd meg másokkal, hogy miben vagy tehetséges! Akár kézműves
                  termékeket készítesz, korrepetálsz vagy tanácsot adsz, itt
                  hirdetheted magad.
                </Text>
              </View>
              <View
                style={[
                  {
                    margin: 4,
                    padding: 12,
                    backgroundColor: "#fcf9ef",
                    flex: small ? undefined : 1,
                  },
                ]}
              >
                <Text size={17} bold>
                  2. Lépj kapcsolatba!
                </Text>
                <Text size={17}>
                  Keress a szakemberek, művészek, alkotók közt! Fedezd fel a
                  többiek bizniszeit!
                </Text>
              </View>
              <View
                style={[
                  {
                    margin: 4,
                    padding: 12,
                    backgroundColor: "#fcf9ef",
                    flex: small ? undefined : 1,
                  },
                ]}
              >
                <Text size={17} bold>
                  3. Köss biznisz kapcsolatot!
                </Text>
                <Text size={17}>
                  Keressétek meg egymásban a kereslet és kínálatot
                </Text>
              </View>
              <View
                style={[
                  {
                    margin: 4,
                    padding: 12,
                    backgroundColor: "#fcf9ef",
                    flex: small ? undefined : 1,
                  },
                ]}
              >
                <Text size={17} bold>
                  4. Ajánlj be másokat!
                </Text>
                <Text size={17}>
                  Jelezz vissza, kik azok akik valódi segitséget tudnak
                  nyújtani.
                </Text>
              </View>
            </View>
            <Button style={{ display: "none" }} title="Irány Bizniszelni!" />
          </View>
          <View style={{ flex: undefined }}>
            <Image
              source={require("../../assets/images/logo.png")}
              resizeMode="contain"
              style={{
                height: 200,
                width: 200,
                margin: 20,
                borderRadius: 16,
                flexOrder: 0,
                alignSelf: "center",
              }}
            />

            <Text contained style={small && { order: 3 }}>
              <Text title>Pajtások</Text>
              {"\n"}Az oldal biztonságát az úgynevezett pajtásrendszerrel
              biztosítjuk. Pajtásodnak akkor jelölhetsz valakit, ha megbízol az
              illetőben. Bizonyos funkciókat pedig csak akkor használhatsz, ha
              megfelelő mennyiségű ember már megbízhatónak jelölt téged.
            </Text>
          </View>

          <View style={{}}>
            <Text contained style={{ textAlign: "center" }}>
              <Text title>Csatlakozz a FiFék közösségéhez!</Text>
              {"\n"}
              <Text>Fifék így nyilatkoztak...</Text>
              <Comments
                style={{ marginLeft: small ? 0 : 50 }}
                path="aboutComments"
                limit={9}
                justComments
                commentStyle={{
                  backgroundColor: "#fcf9ef",
                  padding: 10,
                  textAlign: "left",
                  fontSize: 13,
                  borderRadius: 8,
                }}
              />
            </Text>
          </View>
          <View style={{ flex: "none" }}>
            <Text contained>
              <Text title>Rólam</Text>
              {"\n"}
              Kristóf Ákos vagyok, én találtam ki és fejlesztem egyedül a fife
              appot. Ez egy olyan projekt, amibe szívemet-lelkemet bele tudom
              rakni, értetek, és egy jobb világért dolgozom rajta. Az oldal
              fenntartásához, fejlesztéséhez sok idő és pénz is kell, éppen
              ezért kérem a támogatásotokat. Ha neked is fontos a projekt célja,
              és szívesen használnád az appot, kérlek egy pár száz forinttal
              segítsd az elindulásunkat:){"\n"}
              <Button
                onPress={() => {
                  Linking.openURL("https://patreon.com/fifeapp");
                }}
                color="#fdcf99"
                title="Itt tudsz adományozni!"
                style={{ alignSelf: small ? "center" : "flex-end" }}
              />
            </Text>
            <Image
              source={require("../../assets/images/en.jpeg")}
              resizeMode="cover"
              style={{
                height: 200,
                width: 200,
                margin: 20,
                borderRadius: 16,
                alignSelf: "center",
              }}
            />
          </View>
          <Text style={{ fontSize: 28, textAlign: "center", marginTop: 30 }}>
            Csatlakozz a fifékhez!
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 12,
            }}
          >
            <Text>Jelenleg még nem tudsz regisztrálni!</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default About;
