import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { loginType } from "@/types/types";
import { FormikProps } from "formik";

const { width } = Dimensions.get("window");

const LoginForm = ({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  errors,
  touched,
  isSubmitting,
}: FormikProps<loginType>) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.labelText}>Email</Text>
      <TextInput
        placeholder="example@gmail.com"
        inputMode="email"
        style={styles.input}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        value={values.email}
      />
      {errors.email && touched.email && (
        <Text style={styles.error}>{errors.email}</Text>
      )}
      <Text style={styles.labelText}>Password</Text>
      <TextInput
        placeholder="********"
        style={styles.input}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        value={values.password}
        secureTextEntry
      />
      {errors.password && touched.password && (
        <Text style={styles.error}>{errors.password}</Text>
      )}
      {values.isFirebaseError && (
        <Text style={styles.error}>Invalid Email or Password</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Text style={styles.loadingText}>Logging in...</Text>
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  labelText: {
    paddingLeft: width * 0.05,
  },
  input: {
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "gray",
    width: "90%",
    marginTop: 5,
    marginBottom: 20,
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    maxWidth: 375,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: 30,
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingText: {
    color: "gray",
  },
});
