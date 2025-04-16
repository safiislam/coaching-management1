'use client';
import showToast from '../../utils/toast';
import { useRegisterStudentMutation } from '../../Redux/features/Auth/auth.api';
import { uploadImage } from '../../utils/cloudinary';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/features/Auth/auth.slice';
import { jwtDecoded } from '../../utils/decoded';

const RegisterPage = () => {
	const [register] = useRegisterStudentMutation();
	const router = useRouter();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		dateOfBirth: '',
		password: '',
		gender: '',
		guardianName: '',
		guardianPhone: '',
	});
	const [showPassword, setShowPassword] = useState(false);

	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value.trim(),
		}));
	};

	// const handleFileChange = (e) => {
	//   const file = e.target.files[0];
	//   if (file) {
	//     setFormData({ ...formData, image: file });
	//   }
	// };

	const validateForm = () => {
		let isValid = true;
		let newErrors = {};

		Object.keys(formData).forEach((key) => {
			if (!formData[key]) {
				newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
				isValid = false;
			}
		});

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}
		try {
			// const imageLink = await uploadImage(formData.image);
			const payload = {
				...formData,
				// image: imageLink,
			};
			// Send the payload to the backend API
			const res = await register(payload);
			if (res?.data?.data?.token) {
				const token = res.data.data.token;
				console.log('Token:', token);

				// Dispatch login action to Redux store
				dispatch(loginUser(token));

				// Decode JWT to get user role
				const decodedData = await jwtDecoded(token);

				// Show success message
				showToast('success', 'Success', 'Registration Successfully');
				router.push(`/dashboard/${decodedData?.role?.toLowerCase()}`);
			}
			if (res.error) {
				const errorMessages = res.error.data.errorSources
					.map((item) => `• ${item.message}`) // Format each message with a bullet point
					.join('\n'); // Join with a newline for better readability

				showToast('error', 'Error', errorMessages.replace(/\n/g, '<br>')); // Replace `\n` with `<br>` for HTML rendering
			}
		} catch (error) {
			console.error('Error creating course:', error);
			showToast('error', 'Error', 'Failed to register. Please try again.');
		}
	};

	return (
		<div className='flex bg-gray-100 items-center justify-center min-h-screen py-8 pt-24 '>
			<div className='w-full max-w-lg bg-white p-8 rounded-xl shadow-lg'>
				<h2 className='text-3xl font-bold text-gray-800 text-center mb-6'>Student Registration</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-gray-700'>First Name</label>
							<input
								type='text'
								name='firstName'
								placeholder='First Name'
								className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
								onChange={handleInputChange}
							/>
							{errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
						</div>

						<div>
							<label className='block text-gray-700'>Last Name</label>
							<input
								type='text'
								name='lastName'
								placeholder='Last Name'
								className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
								onChange={handleInputChange}
							/>
							{errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
						</div>
					</div>

					<div>
						<label className='block text-gray-700'>Email</label>
						<input
							type='email'
							name='email'
							placeholder='Email'
							className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
							onChange={handleInputChange}
						/>
						{errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
					</div>
					<div>
						<label className='block text-gray-700'>Password</label>
						<div className='relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='Password'
								className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
								onChange={handleInputChange}
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
								{showPassword ? '🙈' : '👁️'}
							</button>
						</div>
						{errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label htmlFor='phone' className='block text-gray-700'>
								Phone
							</label>
							<input
								type='tel'
								id='phone'
								name='phone'
								placeholder='Phone'
								minLength={10}
								className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
								onChange={handleInputChange}
							/>
							{errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
						</div>

						<div>
							<label className='block text-gray-700'>Date of Birth</label>
							<input
								type='date'
								name='dateOfBirth'
								className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
								onChange={handleInputChange}
							/>
							{errors.dateOfBirth && <p className='text-red-500 text-sm'>{errors.dateOfBirth}</p>}
						</div>
					</div>

					<div>
						<label className='block text-gray-700'>Address</label>
						<input
							type='text'
							name='address'
							placeholder='Address'
							className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
							onChange={handleInputChange}
						/>
						{errors.address && <p className='text-red-500 text-sm'>{errors.address}</p>}
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-gray-700'>Guardian Name</label>
							<input
								type='text'
								name='guardianName'
								placeholder='Guardian Name'
								className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
								onChange={handleInputChange}
							/>
							{errors.guardianName && <p className='text-red-500 text-sm'>{errors.guardianName}</p>}
						</div>

						<div>
							<label className='block text-gray-700'>Guardian Phone</label>
							<input
								type='tel'
								name='guardianPhone'
								minLength={10}
								placeholder='Guardian Phone'
								className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
								onChange={handleInputChange}
							/>
							{errors.guardianPhone && <p className='text-red-500 text-sm'>{errors.guardianPhone}</p>}
						</div>
					</div>

					<div>
						<label className='block text-gray-700'>Gender</label>
						<select name='gender' className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400' onChange={handleInputChange}>
							<option value=''>Select Gender</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
							<option value='Other'>Other</option>
						</select>
						{errors.gender && <p className='text-red-500 text-sm'>{errors.gender}</p>}
					</div>

					<button type='submit' className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300'>
						Register
					</button>
				</form>
				{/* Sign Up Link */}
				<p className='mt-6 text-center text-sm text-gray-600'>
					Have an account?
					<Link href='/login' className='text-indigo-600 hover:text-indigo-500 ml-1'>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
