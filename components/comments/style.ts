import { StyleSheet } from "react-native";

const height = 200;

const styles = StyleSheet.create({
  fullscreen: {
    height,
    padding: 0,
  },
  fullscreenContent: {
    paddingTop: 16,
  },
  fullscreenParent: {
    width: "100%",
    zIndex: 10,
    bottom: 0,
    height,
  },
});

export default styles;
