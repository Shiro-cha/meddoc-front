import React, { createContext, useContext,useState } from 'react';

const NotificationContext = createContext({
    icon: '',
    message: '',
    position: 'top-end',
    status: '',
})

export const NotificationType = () => {
    return useContext(NotificationContext);
  };
export const  NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
      icon: '',
      message: '',
      position: 'top-end',
      status: '',
    });

    return (
      <NotificationProvider.Provider value={[notification, setNotification]}>
        {children}
      </NotificationProvider.Provider>
    );
  };
  export default NotificationContext;