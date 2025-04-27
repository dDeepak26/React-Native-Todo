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
import { registerInitialValues } from "@/utils/initialsValues";
import { registerValidation } from "@/utils/Validations";
import { handleRegisterSubmit } from "@/utils/handleSubmits";
import RegisterForm from "@/components/RegisterForm";

const { width, height } = Dimensions.get("window");

const Register = () => {
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            source={require("../../assets/images/signup.png")}
            style={styles.image}
          />
        </View>
        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerValidation}
          onSubmit={async (values, { setSubmitting }) => {
            handleRegisterSubmit({ values, setSubmitting, dispatch });
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
            <RegisterForm
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
          Already have an account{" "}
          <Link href={"/login"} style={styles.linkText}>
            Login
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Register;

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
    marginBottom: 20,
  },
  text: {
    color: "gray",
  },
  linkText: {
    color: "black",
    textDecorationLine: "underline",
  },
});
