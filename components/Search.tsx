import {View, Text, StyleSheet, Image, TextInput} from "react-native";
import {FC} from "react";


type SearchProps = {
    setSearchText: (text: string) => void;
}

const Search: FC<SearchProps> = ({setSearchText}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>
                Little Lemon
            </Text>
            <View style={styles.textImgLine}>
                <View style={styles.textContainer}>
                    <Text style={styles.textDescription}>
                        Chicago
                    </Text>
                    <Text style={styles.textDescription}>
                        We are family owned...{"\n"}We are family owned...{"\n"}We are family owned...{"\n"}We are family owned...
                    </Text>
                </View>
                <Image
                    source={require("@/assets/images/Heroimage.png")}
                    style={styles.imageStyle}
                />
            </View>
            <View style={styles.searchContainer}>
                <Image
                    style={{width: 50, height: 50, backgroundColor: 'white', borderRadius: 50, resizeMode: 'center'}}
                    source={require("@/assets/images/search.png")}/>
                <TextInput
                    style={styles.textInput}
                    placeholder={"Search"}
                    onChangeText={setSearchText}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor:'#495e57',
        width: '100%',
        padding:10,
        gap:10,
    },
    textImgLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        gap:5,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    textHeader: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'yellow',
    },
    textDescription: {
        fontSize: 20,
        flexWrap: 'wrap',
        color: 'white',
    },
    imageStyle: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginLeft:'auto'
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    textInput:{
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        fontSize: 18,
    }
});

export default Search
