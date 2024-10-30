import {FC, useContext, useEffect} from "react";
import {View, StyleSheet, Text, SafeAreaView, ScrollView, Image, TouchableOpacity} from "react-native";
import {LoginDataContext, LoginDataContextType} from "@/hooks/LoginDataContext";
import {useRouter} from "expo-router";
import {useMenuData} from "@/hooks/useMenuData";


const HomeScreen: FC = () => {
    const {userInfo} = useContext(LoginDataContext) as LoginDataContextType;
    const {menuData, loading, loadData} = useMenuData();
    const router = useRouter();

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={{flex: 1, marginBottom: 30}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Image
                        style={styles.logoStyle}
                        source={require('@/assets/images/Logo.png')}></Image>
                    <TouchableOpacity
                        style={{position: 'absolute', right: 20}}
                        onPress={()=> router.push("/Profile")}>
                        {userInfo.imgUri ?
                            <Image
                                source={{uri: userInfo.imgUri}}
                                style={styles.avatarStyle}
                            /> :
                            <Text style={styles.textPlaceholder}>{userInfo.firstName?.at(0)} {userInfo.lastName?.at(0)} </Text>
                        }
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
    headerContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logoStyle:{
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
    avatarStyle:{
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    textPlaceholder:{
        fontSize: 40,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        width:80,
        height:80,
        borderRadius: 50,
        backgroundColor: '#c6ac8f',
    }
});

export default HomeScreen;
