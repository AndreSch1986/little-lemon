import {FC, useContext, useEffect} from "react";
import {View, Text, SafeAreaView, StatusBar, ScrollView} from "react-native";
import {Stack, Tabs, useRouter} from "expo-router";
import {LoginDataContext, LoginDataContextType} from "@/hooks/LoginDataContext";

const App: FC = () => {
    const {loginDataLoading, userInfo} = useContext(LoginDataContext) as LoginDataContextType;
    console.log(loginDataLoading);
    console.log(userInfo);
    const router = useRouter();

    useEffect(() => {
        if (!loginDataLoading && userInfo.profileOk) {
            router.push("/HomeScreen");
        } else if (!loginDataLoading && userInfo.onBoardingDone) {
            router.push("/Profile");
        } else if (!loginDataLoading) {
            router.push("/OnBoarding");
        }
    }, [loginDataLoading, userInfo]);

    return (
        <View>
        </View>
    );
}


export default App;
