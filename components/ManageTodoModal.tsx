import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import { todoArrayType } from "@/types/types";
import { handleCreate, handleUpdate } from "@/utils/handleSubmits";
import { modalValidation } from "@/utils/Validations";
import { createInitialValues } from "@/utils/initialsValues";

const ManageTodoModal = ({
  modalVisible,
  closeModal,
  fetchData,
  modalAction,
  data,
}: {
  modalVisible: boolean;
  closeModal: () => void;
  fetchData: () => void;
  modalAction: string;
  data?: todoArrayType;
}) => {
  console.log("modal data: ", data);
  const initialValues =
    modalAction === "create"
      ? createInitialValues
      : {
          id: data?.id || "",
          todoName: data?.todoName || "",
          todoDescription: data?.todoDescription || "",
          todoDeadLine: data?.todoDeadLine || "",
        };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerView}>
            <Text style={styles.modalText}>
              {modalAction === "update" ? "Edit a Todo" : "Create a Todo"}
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Formik
              initialValues={initialValues}
              validationSchema={modalValidation}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                modalAction === "create"
                  ? await handleCreate({
                      values: { ...values, isComplete: false },
                      setSubmitting,
                      resetForm,
                      closeModal,
                      fetchData,
                    })
                  : await handleUpdate({
                      values: { ...values, isComplete: false },
                      setSubmitting,
                      resetForm,
                      closeModal,
                      fetchData,
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
                <View>
                  <Text>
                    Todo Name <Text style={styles.requiredText}>*</Text>
                  </Text>
                  <TextInput
                    placeholder="Enter todo name"
                    style={styles.input}
                    onChangeText={handleChange("todoName")}
                    onBlur={handleBlur("todoName")}
                    value={values.todoName}
                    inputMode="text"
                  />
                  {touched.todoName && errors.todoName && (
                    <Text style={styles.error}>{errors.todoName}</Text>
                  )}
                  <Text>Todo Description</Text>
                  <TextInput
                    placeholder="Enter todo description"
                    style={styles.input}
                    onChangeText={handleChange("todoDescription")}
                    onBlur={handleBlur("todoDescription")}
                    value={values.todoDescription}
                    inputMode="text"
                    multiline
                  />
                  <Text>Todo Deadline</Text>
                  <TextInput
                    placeholder="Select todo deadline"
                    style={styles.input}
                    onChangeText={handleChange("todoDeadLine")}
                    onBlur={handleBlur("todoDeadLine")}
                    value={values.todoDeadLine}
                    inputMode="text"
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Text style={styles.loadingText}>
                        {modalAction === "update"
                          ? "Editing Todo..."
                          : "Creating Todo..."}
                      </Text>
                    ) : (
                      <Text style={styles.buttonText}>
                        {modalAction === "update" ? "Edit Todo" : "Create Todo"}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ManageTodoModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    width: 375,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerView: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeText: {
    alignItems: "flex-end",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  requiredText: {
    fontSize: 16,
    lineHeight: 18,
    textAlignVertical: "top",
    color: "red",
  },
  input: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 5,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
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
