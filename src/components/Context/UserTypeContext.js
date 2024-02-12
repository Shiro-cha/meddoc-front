
import Cookies from 'js-cookie';
import React, { createContext, useContext,useState } from 'react';

const UserTypeContext = createContext({});

export const useUserType = () => {
  return useContext(UserTypeContext);
};

export const UserTypeProvider = ({ children }) => {
  const [userType, setuserType] = useState();

  return (
    <UserTypeContext.Provider value={{userType,setuserType}}>
      {children}
    </UserTypeContext.Provider>
  );
};
export default UserTypeContext;