import {createContext} from 'react';

const AppContext = createContext(null);
export const Provider = AppContext.Provider;

export default AppContext;