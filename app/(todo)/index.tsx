import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ManageTodoModal from "../../components/ManageTodoModal";
import { auth, db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import TodoCard from "@/components/TodoCard";
import { todoArrayType, todoData } from "@/types/types";

const index = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<string>("update");
  const [todoData, setTodoData] = useState<todoArrayType>();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const setModalActionCreate = () => setModalAction("create");
  const setModalActionUpdate = () => setModalAction("update");
  const setCurrentTodoData = (data: todoArrayType) => setTodoData(data);

  const [data, setData] = useState<todoArrayType[]>([]);

  const fetchData = async () => {
    try {
      const userId = auth.currentUser?.email;
      if (!userId) throw new Error("User not logged in");
      const userTodosRef = collection(db, "todos", userId, "userTodos");
      const querySnapshot = await getDocs(userTodosRef);
      const fetchedTodos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        todoName: doc.data().todoName,
        todoDescription: doc.data().todoDescription || "",
        todoDeadLine: doc.data().todoDeadLine || "",
        isComplete: doc.data().isComplete,
      }));
      setData(fetchedTodos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("Firebase Data: ", data);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTxt}>Todos</Text>
      </View>
      <ManageTodoModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        fetchData={fetchData}
        modalAction={modalAction}
        data={todoData}
      />
      {(!data || data.length === 0) && (
        <Text style={styles.noTodoText}>no todos</Text>
      )}
      {data && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TodoCard
              item={item}
              fetchData={fetchData}
              openModal={openModal}
              setModalActionUpdate={setModalActionUpdate}
              setCurrentTodoData={setCurrentTodoData}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        />
      )}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          setModalActionCreate();
          openModal();
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noTodoText: {
    margin: 30,
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
