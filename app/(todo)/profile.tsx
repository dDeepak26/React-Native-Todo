import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { handleSignOut } from "@/utils/handleSubmits";
import { auth } from "@/utils/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";

const profile = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTxt}>Profile</Text>
      </View>
      <View style={styles.profileInfo}>
        <Ionicons name="person" size={100} color={"black"} />
        <Text style={styles.profileText}>
          Name: {auth.currentUser?.displayName}
        </Text>
        <Text style={styles.profileText}>Email: {auth.currentUser?.email}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleSignOut(dispatch)}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    marginBottom: 30,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileText: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "black",
    marginHorizontal: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
