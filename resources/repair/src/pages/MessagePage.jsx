import React, {useEffect, useRef, useState} from 'react';
import {
    Navbar,
    Page,
    Messages,
    MessagesTitle,
    Message,
    Messagebar,
    Link,
    f7, f7ready, useStore
} from 'framework7-react';
import {getMessages} from "../api/API";
import {useQuery} from "react-query";
import store from "../js/store";
import config from "../config";


const MessagePage = ({f7router, user}) => {
    const [messagesData, setMessagesData] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [typingMessage, setTypingMessage] = useState(null);
    const userStored = useStore(store, 'user')

    const messagesEndRef = useRef(null);
    const images = [
        'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-3.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-5.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-6.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-8.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
        'https://cdn.framework7.io/placeholder/people-100x100-10.jpg',
    ];

    const {data, isLoading, isFetched, refetch} = useQuery('messages', getMessages, {
        refetchInterval: userStored?.logged_in ? 6000 : false,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false
    });


    const sendMessage = () => {

        const text = messageText.trim();
        if (text.length === 0) return;
        setAttachments([]);
        setMessageText('');
        setSheetVisible(false);
        fetch(`${import.meta.env.VITE_API_URL}/send-message`, {
            method: 'POST',
            headers: config.HEADER,
            body: JSON.stringify({
                sender_id: userStored.id,
                message: text,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };

    // const loadMessages =  () => {
    //     refetch().then((data) => {
    //         setMessagesData([...data.data.messages]);
    //         console.log('MessagePage: ',data.data.messages)
    //         messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    //     });
    // }
    //
    // useEffect(() => {
    //     console.log('MessagePage: ',data)
    // }, [isLoading]);

    return (
        <Page noToolbar={true} name={"messages"}>
            <Navbar title="Messages"/>

            <Messagebar
                style={{bottom: `${f7.theme === 'ios' ? 50 : 56}px`}}
                //placeholder={placeholder()}
                //attachmentsVisible={attachmentsVisible()}
                sheetVisible={true}
                value={messageText}
                onInput={(e) => setMessageText(e.target.value)}
            >
                <Link
                    iconIos="f7:arrow_up_circle_fill"
                    iconMd="material:send"
                    slot="inner-end"
                    onClick={sendMessage}
                />
            </Messagebar>

            <Messages ref={messagesEndRef} scrollMessagesOnEdge={true}>

                {!isLoading && data.messages?.map((message, index) => (
                    <Message
                        key={index}
                        type={message.sender_id === userStored.id ? 'sent' : 'received'}
                        tail={true}
                    >
                        <span slot="text" dangerouslySetInnerHTML={{__html: message.message}}/>
                    </Message>
                ))}
            </Messages>
        </Page>
    );

}

export default MessagePage;