import store from "@/store/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import AuthListener from "./onAuthStateChanged";

export default function RootLayout() {
  const user = true;
  return (
    <Provider store={store}>
      <AuthListener />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="menu"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="login/index" options={{ title: "Login" }} />
        <Stack.Screen name="register/index" options={{ title: "Register" }} />
        <Stack.Screen
          name="(todo)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
