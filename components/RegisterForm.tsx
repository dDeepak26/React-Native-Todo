import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FormikProps } from "formik";
import { registerType } from "@/types/types";

const { width } = Dimensions.get("window");

const RegisterForm = ({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  errors,
  touched,
  isSubmitting,
  isValidating,
  submitCount,
}: FormikProps<registerType>) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.labelText}>Full Name</Text>
      <TextInput
        placeholder="John Deo"
        style={styles.input}
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        value={values.name}
      />
      {errors.name && touched.name && (
        <Text style={styles.error}>{errors.name}</Text>
      )}
      <Text style={styles.labelText}>Email</Text>
      <TextInput
        placeholder="example@gmail.com"
        style={styles.input}
        inputMode="email"
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Text style={styles.loadingText}>Registering...</Text>
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;

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
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
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
