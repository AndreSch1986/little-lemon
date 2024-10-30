import React, {FC, useEffect, useState} from "react";
import {View, StyleSheet, Text, ScrollView} from "react-native";


type CategoryProps = {
    categorys: string[];
    setCategorys: (categorys: string[]) => void;
}

const Categorys: FC<CategoryProps> = ({categorys, setCategorys}) => {
    const [activeCategorys, setActiveCategorys] = useState<string[]>([]);

    const changeActiveCategorys = (category: string) => {
        if (activeCategorys.includes(category)) {
            setActiveCategorys(activeCategorys.filter((item) => item !== category));
        } else {
            setActiveCategorys([...activeCategorys, category]);
        }
    }

    useEffect(() => {
        setCategorys(activeCategorys);
    }, [activeCategorys]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                ORDER FOR DELIVERY!
            </Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{gap: 20}}
            >
                {categorys.map((category, index) => {
                    return (
                        <View
                            key={index}
                            style={[styles.categoryItem, {backgroundColor: activeCategorys.includes(category) ? 'grey' : 'white'}]}
                        >
                            <Text
                                onPress={() => changeActiveCategorys(category)}
                            >
                                {category.toUpperCase()}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    categoryItem: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
    }
})


export default Categorys
