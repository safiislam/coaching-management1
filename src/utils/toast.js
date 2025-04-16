'use client';

import { useEffect } from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Initialize iziToast with default settings
if (typeof window !== 'undefined') {
	iziToast.settings({
		position: 'topRight',
		timeout: 3000,
		transitionIn: 'fadeInDown',
		transitionOut: 'fadeOutUp',
		progressBar: true,
	});
}

/**
 * Safe toast utility function that only runs on client-side
 * @param {string} type - Type of toast: 'success', 'error', 'warning', 'info'
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 */
export const showToast = (type, title, message) => {
	if (typeof window === 'undefined') return; // Skip during SSR

	switch (type) {
		case 'success':
			iziToast.success({
				title,
				message,
			});
			break;
		case 'error':
			iziToast.error({
				title,
				message,
			});
			break;
		case 'warning':
			iziToast.warning({
				title,
				message,
			});
			break;
		case 'info':
			iziToast.info({
				title,
				message,
			});
			break;
		default:
			iziToast.show({
				title,
				message,
			});
	}
};

/**
 * React hook to initialize iziToast settings
 */
export const useToastSetup = () => {
	useEffect(() => {
		// IziToast settings are initialized in the top-level code
		// This hook is provided for components that want to ensure iziToast is ready
	}, []);
};

export default showToast;
