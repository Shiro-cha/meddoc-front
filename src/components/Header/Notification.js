import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import SockJsClient from 'react-stomp';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import { toast } from '../Toast/Toast';
import BasicMenu from './NotificationMenu';
import { axiosPrivate } from '../../api/axios';


const Notification = () => {

    const clientRef = useRef(null);

    const [text, setText] = React.useState('');
    const [myMsg, setMyMsg] = React.useState({});
    const [topics, setTopics] = useState([]);
    const [notifications, setNotificationsData] = useState([])

    const accessToken = Cookies.get('jwtToken');
    var decoded = jwt_decode(accessToken);

    const notifications_data = async () => {
        try {
            const response = await axiosPrivate.get("/notification", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            setNotificationsData(response.data);
        } catch (error) {

        }
    }



    const onConnected = () => {
        setTopics([`/user/${decoded.id}/specific`]);
        notifications_data()
    }

    const onMessageReceived = (data) => {
        console.log(data);
        setMyMsg(data);
        toast("info", "Vous avez une notification !")
        notifications_data()

        // setNotificationsData(data);

    }

    useEffect(() => {
        notifications_data();
    }, []);


    return (
        <div className=''>
            <SockJsClient
                url='http://192.168.88.38:8080/ws'
                topics={topics}
                onConnect={onConnected}
                onMessage={data => onMessageReceived(data)}
                debug={true}
            />
            <BasicMenu messages={notifications} refreshNotifications={notifications_data} />
        </div>
    );
};

export default Notification;