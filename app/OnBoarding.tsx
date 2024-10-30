import {FC, useCallback, useContext, useState} from "react";
import {View, StyleSheet, Text, ScrollView, Image, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import {LoginDataContext, LoginDataContextType} from "@/hooks/LoginDataContext";
import RegistrationSuccessModal from "@/components/RegistrationSuccessModal";


const OnBoarding: FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const {setUserInfo} = useContext(LoginDataContext) as LoginDataContextType;


    return (
        <View style={styles.container}>
            <Image
                style={styles.imageStyle}
                source={require("@/assets/images/Logo.png")}
            />
            <Text style={styles.textHeader}>
                Let us get to know you!
            </Text>
            <View style={{alignItems:'center', marginTop:40, gap:10}}>
                <Text style={{fontSize:20}}>
                    First Name
                </Text>
                <TextInput
                    style={styles.inputStyle}
                    value={firstName}
                    onChangeText={setFirstName}/>
            </View>
            <View style={{alignItems:'center' , gap:10}}>
                <Text style={{fontSize:20}}>
                    Email
                </Text>
                <TextInput
                    style={styles.inputStyle}
                    value={email}
                    onChangeText={setEmail}/>
            </View>
            <TouchableOpacity
                style={styles.buttonStyle}
                disabled={firstName.length === 0 || email.length === 0}
                onPress={()=>setModalVisible(true)}
            >
                <Text style={{fontSize:20}}>
                    Next
                </Text>
            </TouchableOpacity>
            {modalVisible && (
                <RegistrationSuccessModal onConfirm={()=>{
                    setUserInfo({
                        email,
                        firstName,
                        lastName:"",
                        phoneNumber:"",
                        imgUri:"",
                        orderStatus:false,
                        passwordChange:false,
                        specialOffers:true,
                        newsletters:true,
                        onBoardingDone:true,
                        profileOk:false,
                    });
                    setModalVisible(false);
                }}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#c6ac8f'
    },
    imageStyle: {
        width: '100%',
        height: 100,
        objectFit: "contain",
        backgroundColor: "#eae0d5",
    },
    inputStyle:{
        backgroundColor: "#eae0d5",
        padding: 10,
        borderRadius: 5,
        width: 300,
        marginBottom: 20,
    },
    textHeader: {
        paddingTop: 100,
        fontSize: 25,
    },
    buttonStyle:{
        alignSelf: "flex-end",
        backgroundColor: "#eae0d5",
        padding: 10,
        borderRadius: 5,
        marginTop: 'auto',
        marginBottom:20,
        marginRight: 20,
        width: 150,
        alignItems: "center"
    }

});

export default OnBoarding;
