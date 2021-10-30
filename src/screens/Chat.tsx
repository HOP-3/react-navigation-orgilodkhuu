import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';

type message = string;
type messages = string[];

import firestore, { firebase } from '@react-native-firebase/firestore';

const path = firestore().collection('messages');

const Chat = () => {
    const [input, setInput] = useState<message>("");
    const [messages, setMessages] = useState<messages>([]);

    const add = () => {
        console.log(input);
        path.add({
            message: input,
            sentAt: firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };

    // useEffect(() => {
    //     const sub = path.onSnapshot((snap) => {
    //         console.log(snap);
    //     });
    //     return () => sub();
    // },[])

    return (
        <View style={styles.container}>
            <View style={styles.send}>
                <TextInput autoCapitalize={"none"} autoCompleteType={"off"} autoCorrect={false} style={styles.input} value={input} onChangeText={text => setInput(text)} />
                <Pressable onPress={add} style={styles.btn}><Text style={{ color: "white" }}>Send</Text></Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
    },
    send: {
        flexDirection: "row",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 20,
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 20,
        flex: 0.9,
        padding: 7,
        height: 30,
    },
    btn: {
        borderRadius: 10,
        height: 30,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "aqua",
    },
})
export default Chat;