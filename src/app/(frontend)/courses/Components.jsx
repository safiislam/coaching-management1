'use client';
import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi';

const ProgramDropdown = ({ routine }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		// Only add the event listener on the client side
		if (typeof window !== 'undefined') {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, []);

	return (
		<div className='relative w-full max-w-xs' ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center justify-between w-full h-9 px-3 bg-white border rounded-md shadow-sm text-left text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${
					isOpen ? 'border-blue-500' : 'border-gray-300'
				}`}>
				<div className='flex items-center gap-2'>
					<FiDownload className='w-4 h-4 text-blue-600' />
					<span className='truncate'>Download Routine</span>
				</div>
				<div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
					<FiChevronDown className='w-4 h-4' />
				</div>
			</button>

			<div
				className={` w-full bg-white shadow-lg rounded-md overflow-hidden transition-all duration-700 ${
					isOpen ? 'max-h-[200px] opacity-100 border border-gray-200' : 'max-h-0 opacity-0 border-0'
				}`}>
				<div className='py-1'>
					{routine ? (
						<a
							href={routine}
							download
							target='_blank'
							className='flex items-center gap-2 hover:bg-gray-100 px-3 py-2 w-full text-gray-700 text-left text-sm'
							onClick={() => setIsOpen(false)}>
							<FiDownload className='w-4 h-4' />
							Download Routine File
						</a>
					) : (
						<p className='px-3 py-2 text-gray-500 text-sm'>Coming soon</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProgramDropdown;
