import store from "@/store/store";
import { useSelector } from "react-redux";
import { Redirect } from "expo-router";
import { View } from "react-native";

const index = () => {
  const user = store.getState().isUser;
  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={"/(todo)"} /> : <Redirect href={"/menu"} />}
    </View>
  );
};

export default index;
