import { ContactList } from "@/components/buziness/ContactList";
import SupabaseImage from "@/components/SupabaseImage";
import { ThemedView } from "@/components/ThemedView";
import MyBuzinesses from "@/components/user/MyBuzinesses";
import RecommendationsModal from "@/components/user/RecommendationsModal";
import { Tables } from "@/database.types";
import elapsedTime from "@/lib/functions/elapsedTime";
import { RootState } from "@/lib/redux/store";
import { UserState } from "@/lib/redux/store.type";
import { RecommendProfileButton } from "@/lib/supabase/RecommendProfileButton";
import { supabase } from "@/lib/supabase/supabase";
import { Link, useFocusEffect, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Portal, Text, TouchableRipple } from "react-native-paper";
import { Tabs, TabScreen, TabsProvider } from "react-native-paper-tabs";

import { useSelector } from "react-redux";

type UserInfo = Tables<"profiles">;

export default function Index() {
  const { uid: paramUid } = useGlobalSearchParams();
  const uid: string = String(paramUid);
  const { uid: myUid }: UserState = useSelector(
    (state: RootState) => state.user,
  );

  const myProfile = myUid === uid;
  const [data, setData] = useState<UserInfo | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [showRecommendsModal, setShowRecommendsModal] = useState(false);
  const iRecommended = recommendations.includes(myUid || "");

  const load = () => {
    console.log("uid", uid);

    setShowRecommendsModal(false);

    supabase
      .from("profiles")
      .select(
        "*, profileRecommendations!profileRecommendations_profile_id_fkey(*)",
      )
      .eq("id", uid)
      .then(({ data, error }) => {
        if (error) {
          console.log("err", error.message);
          return;
        }
        if (data) {
          setData(data[0]);
          setRecommendations(
            data[0].profileRecommendations.map((pr) => pr.author),
          );
          console.log(data);
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      load();
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]),
  );

  if (uid)
    return (
      <>
        <ThemedView style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <SupabaseImage
              modal
              bucket="avatars"
              path={uid + "/" + data?.avatar_url}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>{data?.full_name}</Text>
              </View>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <TouchableRipple
                  style={{ flex: 1 }}
                  onPress={
                    recommendations.length
                      ? () => setShowRecommendsModal(true)
                      : undefined
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>{recommendations.length}</Text>
                    <Text>
                      Pajtás
                      {!!recommendations && recommendations.length > 1 && "ok"}
                    </Text>
                  </View>
                </TouchableRipple>
                {data?.created_at && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>
                      {elapsedTime(Date.parse(data.created_at.toString()))}
                    </Text>
                    <Text>Fife</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 4, margin: 4 }}>
            {myProfile ? (
              <Link
                asChild
                style={{ flex: 1 }}
                href={{ pathname: "/user/edit" }}
              >
                <Button mode="contained">Profilom szerkesztése</Button>
              </Link>
            ) : (
              <>
                <RecommendProfileButton
                  profileId={uid}
                  recommended={iRecommended}
                  setRecommended={(recommendedByMe) => {
                    if (myUid) {
                      if (recommendedByMe)
                        setRecommendations([...recommendations, myUid]);
                      else
                        setRecommendations(
                          recommendations.filter((uid) => uid !== myUid),
                        );
                    }
                  }}
                />
                <Button style={{ flex: 1 }} mode="contained-tonal" disabled>
                  Üzenek neki
                </Button>
              </>
            )}
          </View>
          <TabsProvider
            defaultIndex={0}
            // onChangeIndex={handleChangeIndex} optional
          >
            <Tabs
            // uppercase={false} // true/false | default=true (on material v2) | labels are uppercase
            // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
            // iconPosition // leading, top | default=leading
            // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
            // dark={false} // works the same as AppBar in react-native-paper
            // theme={} // works the same as AppBar in react-native-paper
            // mode="scrollable" // fixed, scrollable | default=fixed
            // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
            // disableSwipe={false} // (default=false) disable swipe to left/right gestures
            >
              <TabScreen label="Bizniszek" icon="briefcase">
                <MyBuzinesses uid={uid} myProfile={myProfile} />
              </TabScreen>
              <TabScreen label="Elérhetőségek" icon="email-multiple">
                <ContactList uid={uid} />
              </TabScreen>
            </Tabs>
          </TabsProvider>
        </ThemedView>
        {!!data?.full_name && (
          <Portal>
            <RecommendationsModal
              show={showRecommendsModal}
              setShow={setShowRecommendsModal}
              uid={uid}
              name={data.full_name}
            />
          </Portal>
        )}
      </>
    );
}
