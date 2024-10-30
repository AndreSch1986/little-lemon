import {FC, useCallback, useContext, useState} from "react";
import {SafeAreaView, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, TextInput} from "react-native";
import {LoginDataContext, LoginDataContextType} from "@/hooks/LoginDataContext";
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import {useRouter} from "expo-router";


const Profile: FC = () => {
    const router = useRouter();
    const {userInfo, setUserInfo} = useContext(LoginDataContext) as LoginDataContextType;
    const [firstName, setFirstName] = useState<string>(userInfo.firstName);
    const [lastName, setLastName] = useState<string>(userInfo.lastName);
    const [email, setEmail] = useState<string>(userInfo.email);
    const [phoneNumber, setPhoneNumber] = useState<string>(userInfo.phoneNumber);
    const [imgUri, setImgUri] = useState<string>(userInfo.imgUri);
    const [orderStatus, setOrderStatus] = useState<boolean>(userInfo.orderStatus);
    const [passwordChange, setPasswordChange] = useState<boolean>(userInfo.passwordChange);
    const [specialOffers, setSpecialOffers] = useState<boolean>(userInfo.specialOffers);
    const [newsletters, setNewsletters] = useState<boolean>(userInfo.newsletters);


    const logOut = useCallback  (() => {
        setUserInfo({
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            imgUri: "",
            orderStatus: false,
            passwordChange: false,
            specialOffers: true,
            newsletters: true,
            onBoardingDone: false,
            profileOk: false,
        })
    }, []);

    const saveChanges = useCallback(() => {
        setUserInfo({
            ...userInfo,
            email,
            firstName,
            lastName,
            phoneNumber,
            imgUri,
            orderStatus,
            passwordChange,
            specialOffers,
            newsletters,
            profileOk:true
        })
        router.replace("/HomeScreen");
    }, [email, firstName, lastName, phoneNumber, imgUri, orderStatus, passwordChange, specialOffers, newsletters]);


    const changeAvatar = useCallback(async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                console.log(result);
                setImgUri(result.assets[0].uri);
            }
        } catch (err) {
            console.log(err);
            setImgUri("")
        }
    }, [imgUri]);


    return (
        <SafeAreaView style={{flex: 1, marginBottom: 30}}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headingText}>
                    Personal Information
                </Text>
                <View style={styles.lineContainer}>
                    <Text>
                        Avatar
                    </Text>
                    <View style={styles.avatarLine}>
                        {imgUri ?
                            <Image
                                source={{uri: imgUri}}
                                style={styles.imageStyle}
                            /> :
                           <Text style={styles.textPlaceholder}>{firstName?.at(0)} {lastName?.at(0)} </Text>
                        }
                        <TouchableOpacity
                            onPress={() => changeAvatar()}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Change
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setImgUri("")}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.lineContainer}>
                    <Text style={styles.descriptionText}>
                        First Name
                    </Text>
                    <TextInput style={styles.textInputStyle}
                               value={firstName}
                               onChangeText={setFirstName}/>
                </View>
                <View style={styles.lineContainer}>
                    <Text style={styles.descriptionText}>
                        Last Name
                    </Text>
                    <TextInput style={styles.textInputStyle}
                               value={lastName}
                               onChangeText={setLastName}/>
                </View>
                <View style={styles.lineContainer}>
                    <Text style={styles.descriptionText}>
                        Email
                    </Text>
                    <TextInput style={styles.textInputStyle}
                               value={email}
                               onChangeText={setEmail}/>
                </View>
                <View style={styles.lineContainer}>
                    <Text style={styles.descriptionText}>
                        Phone number
                    </Text>
                    <TextInput style={styles.textInputStyle}
                               value={phoneNumber}
                               onChangeText={setPhoneNumber}/>
                </View>
                <Text style={styles.headingText}>
                    Email notifications
                </Text>
                <View style={styles.avatarLine}>
                    <Checkbox style={{margin: 10}} value={orderStatus} onValueChange={setOrderStatus}/>
                    <Text>
                        Order statuses
                    </Text>
                </View>
                <View style={styles.avatarLine}>
                    <Checkbox style={{margin: 10}} value={passwordChange} onValueChange={setPasswordChange}/>
                    <Text>
                        Password changes
                    </Text>
                </View>
                <View style={styles.avatarLine}>
                    <Checkbox style={{margin: 10}} value={specialOffers} onValueChange={setSpecialOffers}/>
                    <Text>
                        Special offers
                    </Text>
                </View>
                <View style={styles.avatarLine}>
                    <Checkbox style={{margin: 10}} value={newsletters} onValueChange={setNewsletters}/>
                    <Text>
                        Newsletter
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => logOut()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>
                        Log out
                    </Text>
                </TouchableOpacity>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>
                            Discard changes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => saveChanges()}
                        style={styles.buttonStyle}
                    >
                        <Text style={styles.buttonTextStyle}>
                            Save changes
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 10,
        marginBottom: 30
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    headingText: {
        fontSize: 22
    },
    descriptionText: {
        fontSize: 16
    },
    lineContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 5,
        width: '100%',
    },
    avatarLine: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    buttonStyle: {
        backgroundColor: '#c6ac8f',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        fontSize: 18,
        color: 'white',
    },
    textInputStyle: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%'
    },
    textPlaceholder:{
        fontSize: 40,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        width:100,
        height:100,
        borderRadius: 50,
        backgroundColor: '#c6ac8f',
    }
})

export default Profile;
