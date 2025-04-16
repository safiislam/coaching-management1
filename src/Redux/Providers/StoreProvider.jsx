'use client';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../../Redux/store';

const StoreProvider = ({ children }) => {
	// Use the toast setup hook instead of direct iziToast calls
	// useToastSetup();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default StoreProvider;
