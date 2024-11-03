'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persist, reduxStore } from '@/redux/store';
import { ITanstackProviderProps } from './types';

export default function ReduxProvider({children}: ITanstackProviderProps){
    return(
        <Provider store={reduxStore}>
            <PersistGate loading={null} persistor={persist}>
                {children}
            </PersistGate>
        </Provider>
    )
}