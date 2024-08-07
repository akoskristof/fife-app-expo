import AxiosDefaultHeaders from "@/components/axios/AxiosDefaultHeaders";
import FirebaseProvider from "@/lib/firebase/firebase";
import { persistor, store } from "@/lib/redux/store";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { router, Stack, useNavigation, usePathname } from "expo-router";
import { Appbar, PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AxiosDefaultHeaders />
        <FirebaseProvider>
          <PaperProvider>
            <Stack
              screenOptions={{ header: (props) => <MyAppbar {...props} /> }}
            >
              <Stack.Screen name="index" options={{ title: "FiFe app" }} />
              <Stack.Screen
                name="mapTest/index"
                options={{ title: "Helyzet választó" }}
              />
              <Stack.Screen
                name="loginTest/index"
                options={{ title: "Bejelentkezés" }}
              />
              <Stack.Screen
                name="commentsTest/index"
                options={{ title: "Kommentek" }}
              />
              <Stack.Screen
                name="biznisz/index"
                options={{ title: "Biznisz" }}
              />
            </Stack>
          </PaperProvider>
        </FirebaseProvider>
      </PersistGate>
    </Provider>
  );
}

const MyAppbar = (props: NativeStackHeaderProps) => {
  const navigation = useNavigation();
  const pathname = usePathname();

  return (
    <Appbar.Header mode="center-aligned">
      {navigation.canGoBack() ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        pathname !== "/" && (
          <Appbar.BackAction onPress={() => router.replace("/")} />
        )
      )}
      <Appbar.Content title={props.options.title} />
    </Appbar.Header>
  );
};
