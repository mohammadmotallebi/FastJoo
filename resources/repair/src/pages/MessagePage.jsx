import React, {useEffect, useRef, useState} from 'react';
import {
    Navbar,
    Page,
    Messages,
    MessagesTitle,
    Message,
    Messagebar,
    Link,
    f7
} from 'framework7-react';
import {getMessages} from "../api/API";
import {useQuery} from "react-query";
import store from "../js/store";
import {config} from "dotenv";


const MessagePage = ({f7router}) => {
    const [messagesData, setMessagesData] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [typingMessage, setTypingMessage] = useState(null);
    const currentUser = store.getters.user;

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

    const {data: messages, isLoading} = useQuery('messages', getMessages,{
        refetchInterval: currentUser.value?.logged_in ? 6000 : false,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: false,
    });


    useEffect(() => {
        console.log(messages)
        if (messages) {
            setMessagesData(messages.messages);
        }
        console.log(messages)
    }, [isLoading,messages]);

    const sendMessage = () => {
        console.log(currentUser)
        const text = messageText.trim();
        if (text.length === 0) return;
        setAttachments([]);
        setMessageText('');
        setSheetVisible(false);
        setMessagesData([
            ...messagesData,
            {
                text: text,
                name: currentUser.value.name,
            },
        ]);
        messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        fetch(`${config.API_URL}/send-message`, {
            method: 'POST',
            headers: config.API_URL,
            body: JSON.stringify({
                user_id: currentUser.value.id,
                message: text,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };
    return (
        <Page noToolbar={true} name={"messages"}>

            <Navbar title="Messages"/>

            <Messagebar
                style={{bottom:`${f7.theme === 'ios' ? 50 : 56}px`}}
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

            <Messages ref={messagesEndRef} scrollMessagesOnEdge={true} >

                {messagesData?.map((message, index) => (
                    <Message
                        key={index}
                        type={message.user_id === currentUser.value?.id ? 'sent' : 'received'}
                        name={message.user.name}
                        tail={true}
                    >
                        <span slot="text" dangerouslySetInnerHTML={{__html: message.message}}/>
                    </Message>
                ))}
                {typingMessage && (
                    <Message
                        type="received"
                        typing={true}
                        first={true}
                        last={true}
                        tail={true}
                        header={`${typingMessage.name} is typing`}
                        avatar={typingMessage.avatar}
                    />
                )}
            </Messages>
        </Page>
    );

}

export default MessagePage;