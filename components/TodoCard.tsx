import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { todoArrayType } from "@/types/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  handleDelete,
  handleMarkCompleteIncomplete,
} from "@/utils/handleSubmits";

const TodoCard = ({
  item,
  fetchData,
  openModal,
  setModalActionUpdate,
  setCurrentTodoData,
}: {
  item: todoArrayType;
  fetchData: () => void;
  openModal: () => void;
  setModalActionUpdate: () => void;
  setCurrentTodoData: (data: todoArrayType) => void;
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <Text
            style={[
              styles.todoNameTxt,
              { textDecorationLine: item.isComplete ? "line-through" : "none" },
            ]}
          >
            {item.todoName}
          </Text>
          {item.todoDescription && (
            <Text
              style={[
                {
                  textDecorationLine: item.isComplete ? "line-through" : "none",
                },
              ]}
            >
              {item.todoDescription}
            </Text>
          )}
          {item.todoDeadLine && (
            <Text
              style={[
                {
                  textDecorationLine: item.isComplete ? "line-through" : "none",
                },
              ]}
            >
              Deadline: {item.todoDeadLine}
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {!item.isComplete && (
            <TouchableOpacity
              onPress={() => {
                openModal();
                setModalActionUpdate();
                setCurrentTodoData(item);
              }}
            >
              <Ionicons name="create" size={24} style={styles.button} />
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Ionicons
              name="trash-bin"
              size={24}
              style={styles.button}
              onPress={async () => await handleDelete({ item, fetchData })}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.markContainer,
            {
              backgroundColor: item.isComplete ? "white" : "black",
            },
          ]}
          onPress={async () =>
            await handleMarkCompleteIncomplete({ item, fetchData })
          }
        >
          <Text style={{ color: item.isComplete ? "black" : "white" }}>
            {item.isComplete ? "Mark Incomplete" : "Mark Complete"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
    margin: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  todoNameTxt: {
    fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: "space-between",
  },
  button: {
    margin: 5,
  },
  markContainer: {
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
});
