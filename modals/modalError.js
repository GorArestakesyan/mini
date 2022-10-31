import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalError = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (props.alertText) {
      setModalVisible(true);
    }
  }, [props.alertText]);
  return (
    <>
      {modalVisible ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.8)",
            width: "100%",
            height: "100%",
            zIndex: 99,
          }}
        >
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text
                    style={[
                      styles.modalText,
                      // { color: props?.error ? "red" : "#000" },
                    ]}
                  >
                    {props.alertText}
                  </Text>

                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      if (props?.clear) {
                        props.clear();
                      }
                      if (props?.clickFunc) {
                        props.clickFunc();
                      }
                    }}
                  >
                    <Text style={styles.textStyle}>
                      {props?.btnText ? props.btnText : "OK"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalView: {
    borderRadius: 50,
    position: "absolute",
    margin: 20,
    backgroundColor: "white",
    paddingVertical: 50,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 30,
    paddingHorizontal: 30,
    textAlign: "center",
    color: "black",
    fontSize: 18,
  },
  buttonClose: {
    width: "70%",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#2cb9b0",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ModalError;
