import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },

    formTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#11181E',
        margin: 10,
    },

    formInput: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderColor: '#11181E',
        borderWidth: 1,
        borderRadius: 12,
        fontSize: 22,
    },

    formButton: {
        backgroundColor: '#11181E',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
        width: '80%',
    },

    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },

    subButton: {
        alignItems: 'center',
        padding: 10,
    },

    subTextButton: {
        color: '#11181E',
    },

    formImage: {
        width: 250,
        height: 100,
    }

});
