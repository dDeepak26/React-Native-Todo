import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { loginInitialValues } from "@/utils/initialsValues";
import { loginValidation } from "@/utils/Validations";
import { handleLoginSubmit } from "@/utils/handleSubmits";
import LoginForm from "@/components/LoginForm";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            source={require("../../assets/images/login.png")}
            style={styles.image}
          />
        </View>
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidation}
          onSubmit={async (values, { setFieldValue, setSubmitting }) => {
            await handleLoginSubmit({
              values,
              setFieldValue,
              setSubmitting,
              dispatch,
            });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <LoginForm
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleSubmit={handleSubmit}
              values={values}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
            />
          )}
        </Formik>
        <Text style={styles.text}>
          Don't have an account{" "}
          <Link href={"/register"} style={styles.linkText}>
            Register
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: height * 0.1,
  },
  image: {
    width: width * 0.4,
    height: height * 0.2,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 30,
  },
  text: {
    color: "gray",
    textAlign: "center",
  },
  linkText: {
    color: "black",
    textDecorationLine: "underline",
  },
});
