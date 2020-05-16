import React, { createContext, useState, useContext } from 'react';

export const TopNavDataContext = createContext(null);

const initialTitle = 'Lists';

const TopNavDataProvider = (props) => {
    const [title, setTitle] = useState(initialTitle);

    return (
        <TopNavDataContext.Provider value={{ title, setTitle }} {...props} />
    );
};

export const useTopNavDataContext = () => useContext(TopNavDataContext);

export default TopNavDataProvider;
