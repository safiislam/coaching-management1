'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog, DialogPanel } from '@headlessui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecoded } from '../../utils/decoded';
import { FiUser, FiLogIn, FiLogOut } from 'react-icons/fi';
import { logOut } from '../../Redux/features/Auth/auth.slice';
import { baseApi } from '../../Redux/Api/baseApi';

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const pathname = usePathname();
	const [role, setRole] = useState('');
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		const decodeToken = async () => {
			if (token) {
				const decoded = await jwtDecoded(token);
				setRole(decoded.role);
			} else {
				setRole('');
			}
		};
		decodeToken();
	}, [token]);

	const navigation = [
		{ name: 'Home', href: '/', isTrue: true },
		{ name: 'Courses', href: '/courses', isTrue: true },
		{ name: 'Dashboard', href: `/dashboard/${role?.toLowerCase()}`, isTrue: false },
		{ name: 'Login', href: '/login', isTrue: false },
		{ name: 'About', href: '/about', isTrue: true },
	];
	const dropdownRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setUserMenuOpen(false);
			}
		};

		// Only add event listener on the client side
		if (typeof window !== 'undefined') {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, []);
	const dispatch = useDispatch();

	return (
		<header className={`${pathname.includes('dashboard') ? 'hidden' : 'block'} bg-white shadow-sm sticky top-0 z-50`}>
			<div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<div className='flex-shrink-0'>
						<Link href='/' className='flex items-center'>
							<img
								alt='Company Logo'
								src='https://img.freepik.com/free-vector/keep-childrens-happiness_1020-486.jpg'
								className='rounded-full w-auto h-12'
							/>
							<span className='sm:block hidden ml-2 font-bold text-gray-900 text-xl'>EduLearn</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className='md:flex hidden'>
						<div className='flex items-center gap-4 ml-10'>
							{navigation.map(
								(item) =>
									item.isTrue && (
										<Link
											key={item.name}
											href={item.href}
											className={`px-1 py-2 text-sm font-medium ${
												pathname === item.href
													? 'text-blue-600 border-b-2 border-blue-600'
													: 'text-gray-700 hover:text-gray-900'
											}`}>
											{item.name}
										</Link>
									)
							)}
						</div>
					</div>

					{/* User Avatar / Login */}
					<div ref={dropdownRef} className='md:flex hidden'>
						<div className='flex items-center ml-4 md:ml-6'>
							{token ? (
								<div className='relative ml-3'>
									<button
										onClick={() => setUserMenuOpen(!userMenuOpen)}
										className='flex items-center bg-gray-100 p-1 rounded-full max-w-xs text-sm focus:outline-none'>
										<span className='sr-only'>Open user menu</span>
										<FiUser className='w-6 h-6 text-gray-700' />
									</button>

									{userMenuOpen && (
										<div className='right-0 absolute bg-white ring-opacity-5 shadow-lg mt-2 py-1 rounded-md w-48 origin-top-right ring-1 ring-black focus:outline-none'>
											<Link
												href={`/dashboard/${role?.toLowerCase()}`}
												className='block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm'>
												Dashboard
											</Link>
											<span
												onClick={() => {
													dispatch(logOut());
													dispatch(
														baseApi.util.invalidateTags([
															'course',
															'class',
															'user',
															'student',
															'event',
															'batch',
															'subject',
															'schedule',
															'payment',
															'enroll',
															'agreement',
															'quiz',
															'exam',
															'submission',
														])
													);
												}}
												className='block flex items-center hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm cursor-pointer'>
												<FiLogOut className='mr-2' /> Sign out
											</span>
										</div>
									)}
								</div>
							) : (
								<Link
									href='/login'
									className='inline-flex items-center bg-blue-600 hover:bg-blue-700 shadow-sm ml-4 px-3 py-2 rounded-md font-medium text-sm text-white'>
									<FiLogIn className='mr-2' /> Login
								</Link>
							)}
						</div>
					</div>

					{/* Mobile menu button */}
					<div className='flex md:hidden'>
						<button
							type='button'
							onClick={() => setMobileMenuOpen(true)}
							className='inline-flex justify-center items-center hover:bg-gray-100 p-2 rounded-md text-gray-700 focus:outline-none'>
							<span className='sr-only'>Open main menu</span>
							<Bars3Icon className='w-6 h-6' aria-hidden='true' />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<Dialog as='div' className='md:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
				<div className='z-50 fixed inset-0' />
				<DialogPanel className='right-0 z-50 fixed inset-y-0 bg-white px-6 py-6 w-full sm:max-w-sm overflow-y-auto sm:ring-1 sm:ring-gray-900/10'>
					<div className='flex justify-between items-center'>
						<Link href='/' className='-m-1.5 p-1.5'>
							<img
								alt='Company Logo'
								src='https://img.freepik.com/free-vector/keep-childrens-happiness_1020-486.jpg'
								className='rounded-full w-auto h-8'
							/>
						</Link>
						<button type='button' onClick={() => setMobileMenuOpen(false)} className='-m-2.5 p-2.5 rounded-md text-gray-700'>
							<span className='sr-only'>Close menu</span>
							<XMarkIcon className='w-6 h-6' aria-hidden='true' />
						</button>
					</div>
					<div className='mt-6 flow-root'>
						<div className='-my-6 divide-y divide-gray-500/10'>
							<div className='space-y-2 py-6'>
								{navigation.map(
									(item) =>
										item.isTrue && (
											<Link
												key={item.name}
												href={item.href}
												onClick={() => setMobileMenuOpen(false)}
												className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium ${
													pathname === item.href ? 'bg-gray-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'
												}`}>
												{item.name}
											</Link>
										)
								)}
							</div>
							<div className='py-6'>
								{token ? (
									<>
										<Link
											href={`/dashboard/${role?.toLowerCase()}`}
											onClick={() => setMobileMenuOpen(false)}
											className='block hover:bg-gray-50 -mx-3 px-3 py-2.5 rounded-lg font-medium text-base text-gray-900'>
											Dashboard
										</Link>
										<span
											onClick={() => {
												setMobileMenuOpen(false);
												dispatch(logOut());
												dispatch(
													baseApi.util.invalidateTags([
														'course',
														'class',
														'user',
														'student',
														'event',
														'batch',
														'subject',
														'schedule',
														'payment',
														'enroll',
														'agreement',
														'quiz',
														'exam',
														'submission',
													])
												);
											}}
											className='block flex items-center hover:bg-gray-50 -mx-3 px-3 py-2.5 rounded-lg font-medium text-base text-gray-900 cursor-pointer'>
											<FiLogOut className='mr-2' /> Sign out
										</span>
									</>
								) : (
									<Link
										href='/login'
										onClick={() => setMobileMenuOpen(false)}
										className='block flex items-center hover:bg-gray-50 -mx-3 px-3 py-2.5 rounded-lg font-medium text-base text-gray-900'>
										<FiLogIn className='mr-2' /> Login
									</Link>
								)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
};

export default Navbar;
