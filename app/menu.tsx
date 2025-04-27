import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

const Menu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Get Started</Text>
        <Text style={styles.text}>
          Create tasks, Set remainders, Track Progress
        </Text>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/todo.jpg")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Link href={"/login"} style={styles.buttons}>
          LOGIN
        </Link>
        <Link href="/register" style={styles.buttons}>
          CREATE ACCOUNT
        </Link>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    marginTop: 40,
    alignItems: "flex-start",
    padding: 20,
  },
  heading: {
    fontSize: 0.05 * height,
    fontWeight: "bold",
  },
  text: {
    color: "gray",
    fontSize: 16,
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: width - 40,
    height: width - 40,
    resizeMode: "contain",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 40,
  },
  buttons: {
    textAlign: "center",
    width: "90%",
    maxWidth: 375,
    padding: 12,
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
