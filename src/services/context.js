const { createContext, useContext, useState } = require("react");

const App = createContext();

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const [userData, setUserData] = useState(null);
  const [boards, setBoards] = useState(null);

  return (
    <App.Provider value={{ user, setUser, setBoards, boards }}>
      {children}
    </App.Provider>
  );
};

export const useGlobalState = () => useContext(App);
