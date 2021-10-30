import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';

type message = string;
type messages = {
    message: string,
    sentAt: string,
};

import firestore, { firebase } from '@react-native-firebase/firestore';

const path = firestore().collection('messages');

const Chat = () => {
    const [input, setInput] = useState<message>("");
    const [messages, setMessages] = useState<messages[]>();
    const flatListRef = useRef<any>(null);

    const add = () => {
        path.add({
            message: input,
            sentAt: firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };

    useEffect(() => {
        let tmp: messages[] = [];
        const sub = path.orderBy('sentAt').onSnapshot(snap => {
            tmp=[];
            snap.forEach(item => {
                tmp.push({message: item.data().message, sentAt: item.data().sentAt});
            });
            setMessages(tmp);
        });
        return () => sub();
    },[])

    const render = ({item}) => {
        return(
            <View style={styles.msgs}>
                <Text style={{color: "white"}}>{item.message}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.send}>
                <TextInput autoCapitalize={"none"} autoCompleteType={"off"} autoCorrect={false} style={styles.input} value={input} onChangeText={text => setInput(text)} />
                <Pressable onPress={add} style={styles.btn}><Text style={{ color: "white" }}>Send</Text></Pressable>
            </View>
            <FlatList ref={flatListRef} data={messages} renderItem={render} onContentSizeChange={() => flatListRef.current.scrollToEnd()}/>
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
    msgs:{
        height: 30,
        width: 300,
        backgroundColor: "aqua",
        padding: 5,
        marginBottom: 10,
        marginLeft: 20,
        borderRadius: 10,
    }
})
export default Chat;