import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ToastAndroid } from "react-native";
import { auth, db } from "./firebase";
import { addUsers, removeUser } from "@/store/userSlice";
import { router } from "expo-router";
import { loginType, registerType, todoArrayType } from "@/types/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const handleLoginSubmit = async ({
  values,
  setFieldValue,
  setSubmitting,
  dispatch,
}: {
  values: loginType;
  setFieldValue: (field: string, value: boolean) => void;
  setSubmitting: (data: boolean) => void;
  dispatch: any;
}) => {
  try {
    setSubmitting(true);
    console.log("login data: ", values);
    await signInWithEmailAndPassword(auth, values.email, values.password);
    dispatch(addUsers());
    ToastAndroid.show("Welcome to DD Todo App", ToastAndroid.SHORT);
    router.replace("/(todo)");
  } catch (error) {
    console.error("Error in Login", error);
    if (error instanceof FirebaseError) {
      if (error.code === "auth/user-not-found") {
        ToastAndroid.show(
          "User not found. Please register.",
          ToastAndroid.SHORT
        );
      } else if (error.code === "auth/wrong-password") {
        ToastAndroid.show("Incorrect password. Try again.", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "Login failed. Please try again.",
          ToastAndroid.SHORT
        );
      }
    } else {
      ToastAndroid.show(
        "An unknown error occurred. Please try again.",
        ToastAndroid.SHORT
      );
    }
    setFieldValue("isFirebaseError", true);
  } finally {
    setSubmitting(false);
  }
};

export const handleRegisterSubmit = async ({
  values,
  setSubmitting,
  dispatch,
}: {
  values: registerType;
  setSubmitting: (data: boolean) => void;
  dispatch: any;
}) => {
  try {
    setSubmitting(true);
    console.log("register data:", values);
    await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    ).then(async (userCredentials) => {
      const user = userCredentials.user;
      await updateProfile(user, {
        displayName: values.name,
      });
    });
    dispatch(addUsers());
    await setDoc(doc(db, "todos", values.email), {
      name: values.name,
      todo: [],
    });
    ToastAndroid.show("Welcome to DD Todo App", ToastAndroid.SHORT);
    router.replace("/(todo)");
  } catch (error) {
    console.error("Error signing up:", error);
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        ToastAndroid.show(
          "Email already in use. Please log in instead.",
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show(
          "Registration failed. Please try again.",
          ToastAndroid.SHORT
        );
      }
    } else {
      ToastAndroid.show(
        "An unknown error occurred. Please try again.",
        ToastAndroid.SHORT
      );
    }
  } finally {
    setSubmitting(false);
  }
};

export const handleCreate = async ({
  values,
  setSubmitting,
  resetForm,
  closeModal,
  fetchData,
}: {
  values: todoArrayType;
  setSubmitting: (data: boolean) => void;
  resetForm: () => void;
  closeModal: () => void;
  fetchData: () => void;
}) => {
  try {
    console.log("handle create data", values);
    setSubmitting(true);

    const userId = await auth.currentUser?.email;
    if (!userId) throw new Error("User not logged in");

    const userTodosRef = collection(db, "todos", userId, "userTodos");
    await addDoc(userTodosRef, values);

    resetForm();
    closeModal();
    fetchData();
    ToastAndroid.show("Todo added successfully!", ToastAndroid.SHORT);
    setSubmitting(false);
  } catch (error) {
    console.error(error);
    ToastAndroid.show("Failed to add todo!", ToastAndroid.SHORT);
  }
};

export const handleUpdate = async ({
  values,
  setSubmitting,
  resetForm,
  closeModal,
  fetchData,
}: {
  values: todoArrayType;
  setSubmitting: (data: boolean) => void;
  resetForm: () => void;
  closeModal: () => void;
  fetchData: () => void;
}) => {
  try {
    console.log("handle update data", values);
    setSubmitting(true);

    const userId = await auth.currentUser?.email;
    if (!userId) throw new Error("User not logged in");

    if (!values.id) {
      throw new Error("Todo ID is missing to update it");
    }

    const todoDocRef = doc(db, "todos", userId, "userTodos", values.id);
    await updateDoc(todoDocRef, {
      todoName: values.todoName,
      todoDescription: values.todoDescription,
      todoDeadLine: values.todoDeadLine,
    });

    resetForm();
    closeModal();
    fetchData();
    ToastAndroid.show("Todo Updated successfully!", ToastAndroid.SHORT);
    setSubmitting(false);
  } catch (error) {
    console.error(error);
    ToastAndroid.show("Failed to edit todo!", ToastAndroid.SHORT);
  }
};

export const handleDelete = async ({
  item,
  fetchData,
}: {
  item: todoArrayType;
  fetchData: () => void;
}) => {
  try {
    const userId = auth.currentUser?.email;
    if (!userId) throw new Error("User not logged in");

    const docRef = doc(db, "todos", userId, "userTodos", item.id ?? "");
    await deleteDoc(docRef);
    fetchData();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

export const handleMarkCompleteIncomplete = async ({
  item,
  fetchData,
}: {
  item: todoArrayType;
  fetchData: () => void;
}) => {
  console.log("clicked mark complete incomplete");
  console.log("mark complete incomplete data", item);

  const userId = auth.currentUser?.email;
  if (!userId) throw new Error("User not Found");

  if (!item.id)
    throw new Error("Todo id not Found to mark as complete/incomplete");

  const todoDocRef = doc(db, "todos", userId, "userTodos", item.id);
  await updateDoc(todoDocRef, { ...item, isComplete: !item.isComplete });
  fetchData();
};

export const handleSignOut = async (dispatch: any) => {
  await signOut(auth);
  dispatch(removeUser());
};
