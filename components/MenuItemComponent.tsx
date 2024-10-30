import {StyleSheet, View, Image, Text} from "react-native";
import {FC} from "react";
import {MenuItem} from "@/scripts/database";


type MenuItemProps = {
    item: MenuItem;
}

const MenuItemComponent: FC<MenuItemProps> = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>
                    {item.name}
                </Text>
                <Text>
                    {item.description}
                </Text>
                <Text>
                    ${item.price}
                </Text>
            </View>
            <Image
                source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}}
                style={styles.imageStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        width: "100%",
        gap:20
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: "60%",
    },
    imageStyle: {
        width: 100,
        height: 100,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "bold"
    },
    textDescription: {
        fontSize: 20,
    }

});

export default MenuItemComponent;
