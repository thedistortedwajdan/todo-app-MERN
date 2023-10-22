import { useState, createContext } from "react";

export const UserContext = createContext({ user: {}, setUser: () => {} }); // we are creating a context with an empty user object and an empty setUser function // we will update the user object and the setUser function in the UserContextProvider component // what does context do? it lets you pass data through the component tree without having to pass props down manually at every level // we will use the user context to pass the user object and the setUser function to the App component and all its child components

export const UserContextProvider = ({ children }) => {
  // we are creating a component called UserContextProvider // we will wrap this component around the App component in index.js // we will pass the App component as a child to the UserContextProvider component // we will pass the children prop to the UserContextProvider component // the children prop will be the App component // we are doing this because we want to wrap the App component with the UserContextProvider component so that the App component and all its child components can access the user context
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
