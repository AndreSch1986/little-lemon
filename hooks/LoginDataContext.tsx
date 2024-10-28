import React, {createContext, FC, ReactNode, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {string} from "prop-types";


type UserInfo = {
    email: string;
    firstName: string;
    lastName:"",
    phoneNumber:"",
    imgUri:string,
    orderStatus:boolean,
    passwordChange:boolean,
    specialOffers:boolean,
    newsletters:boolean,
};

export interface LoginDataContextType {
    userInfo:UserInfo;
    setUserInfo: (data: UserInfo) => void;
    loginDataLoading: boolean;
}

export const LoginDataContext = createContext<LoginDataContextType>({
    userInfo: {
        email: "",
        firstName: "",
        lastName:"",
        phoneNumber:"",
        imgUri:"",
        orderStatus:false,
        passwordChange:false,
        specialOffers:true,
        newsletters:true,
    },
    setUserInfo: () => {},
    loginDataLoading: true
});


const LoginDataProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: "",
        firstName: "",
        lastName:"",
        phoneNumber:"",
        imgUri:"",
        orderStatus:false,
        passwordChange:false,
        specialOffers:true,
        newsletters:true,
    });
    const [loginDataLoading, setLoginDatasetLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getData() {
            const data = await AsyncStorage.getItem("userInfo");
            if (data) {
                setUserInfo(JSON.parse(data));
            }
            setLoginDatasetLoading(false);
        }
        getData();
    }, []);

    const setUserInfoHandler = (data: UserInfo) => {
        setUserInfo((prevState)=>{
            return {
                ...prevState,
                ...data
            }
        });
        AsyncStorage.setItem("userInfo", JSON.stringify(data));
    };

    return (
        <LoginDataContext.Provider value={
            {
                userInfo: userInfo,
                setUserInfo: setUserInfoHandler,
                loginDataLoading: loginDataLoading
            }
        }>
            {children}
        </LoginDataContext.Provider>
    )
};


export default LoginDataProvider;

