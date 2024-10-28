import React, {FC} from "react";
import {useRouter} from "expo-router";
import {Modal, StyleSheet, TouchableOpacity, View, Text, Pressable} from "react-native";

type RegistrationSuccessModalProps = {
    onConfirm: () => void;
}

const RegistrationSuccessModal: FC<RegistrationSuccessModalProps> = ({onConfirm}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{fontSize:25}}>
                        Registration Successful!
                    </Text>
                    <TouchableOpacity style={styles.buttonStyle}
                                      onPress={()=>onConfirm()}
                    >
                        <Text style={{fontSize:20, color:'black'}}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap:20
    },
    buttonStyle:{
        backgroundColor: "#eae0d5",
        padding: 10,
        borderRadius: 5,
        marginTop: 'auto',
        marginBottom:20,
        marginRight: 20,
        width: 150,
        alignItems: "center"
    }
})

export default RegistrationSuccessModal;
