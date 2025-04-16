'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
	useGetAllBatchByCourseIdQuery,
	useGetAllCourseQuery,
	useGetSingleCourseQuery,
	useGetAllStudentsQuery,
} from '../../../../Redux/features/Admin/admin.api';

const CreateEnrollment = ({ handleCreate, closeModal }) => {
	const [enrollmentData, setEnrollmentData] = useState({
		batchId: '',
		studentId: '',
		paymentWay: '',
		payment: '',
	});
	const [courseId, setCourseId] = useState('');
	const [courseAmount, setCourseAmount] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
	const studentDropdownRef = useRef(null); // Ref for the dropdown container

	const { data: courses } = useGetAllCourseQuery();
	const { data: batches } = useGetAllBatchByCourseIdQuery(courseId, {
		skip: !courseId,
	});
	const { data: selectedCourse } = useGetSingleCourseQuery(courseId, {
		skip: !courseId,
	});
	const {
		data: studentData,
		isLoading: isStudentsLoading,
		isError: isStudentsError,
	} = useGetAllStudentsQuery([
		{ name: 'page', value: 1 },
		{ name: 'limit', value: 10 },
		{ name: 'searchTerm', value: searchQuery },
	]);

	// Handle clicks outside the dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (studentDropdownRef.current && !studentDropdownRef.current.contains(event.target)) {
				setIsStudentDropdownOpen(false); // Close the dropdown
			}
		};

		// Add event listener when the dropdown is open - only on client side
		if (isStudentDropdownOpen && typeof window !== 'undefined') {
			document.addEventListener('mousedown', handleClickOutside);

			// Cleanup the event listener
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [isStudentDropdownOpen]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		console.log(value);
		setEnrollmentData({
			...enrollmentData,
			[name]: value,
		});
	};

	const handleStudentSearch = (e) => {
		setSearchQuery(e.target.value);
		setIsStudentDropdownOpen(true); // Open dropdown when typing
	};

	const handleStudentSelect = (studentId) => {
		setEnrollmentData({
			...enrollmentData,
			studentId,
		});
		setIsStudentDropdownOpen(false); // Close dropdown after selection
	};
	const handleCourseChange = (e) => {
		const selectedValue = JSON.parse(e.target.value); // Parse the selected value
		setCourseId(selectedValue.id); // Set courseId
		setCourseAmount(selectedValue.amount); // Set courseAmount
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleCreate(enrollmentData);
			}}>
			<div className='space-y-4'>
				{/* Student ID Search and Select */}
				<div className='mb-6' ref={studentDropdownRef}>
					<label className='block mb-1 font-bold text-gray-700 text-sm'>Student ID</label>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search by Student ID...'
							value={searchQuery}
							onChange={handleStudentSearch}
							onFocus={() => setIsStudentDropdownOpen(true)} // Open dropdown on focus
							className='px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
						/>
						{isStudentDropdownOpen && (
							<div className='z-10 absolute bg-white shadow-lg mt-2 border border-gray-300 rounded-md w-full max-h-60 overflow-y-auto'>
								{isStudentsLoading ? (
									<div className='px-4 py-2 text-gray-500'>Loading...</div>
								) : isStudentsError ? (
									<div className='px-4 py-2 text-red-500'>Error loading students</div>
								) : studentData?.data?.length === 0 ? (
									<div className='px-4 py-2 text-gray-500'>No students found</div>
								) : (
									studentData?.data?.map((student) => (
										<div
											key={student._id}
											onClick={() => handleStudentSelect(student.studentId)}
											className='hover:bg-gray-100 px-4 py-2 cursor-pointer'>
											{student.studentId} - {student.email}
										</div>
									))
								)}
							</div>
						)}
					</div>
					{enrollmentData.studentId && <div className='mt-2 text-gray-700 text-sm'>Selected Student ID: {enrollmentData.studentId}</div>}
				</div>

				{/* Course Dropdown */}
				<div className='mb-6'>
					<label className='block mb-1 font-bold text-gray-700 text-sm'>Course</label>
					<select
						name='courseId'
						value={JSON.stringify({ id: courseId, amount: courseAmount })} // Convert to string for comparison
						onChange={handleCourseChange}
						className='px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
						required>
						<option value=''>Select a Course</option>
						{courses?.data?.result?.map((course, i) => (
							<option
								key={i}
								value={JSON.stringify({ id: course._id, amount: course.price })} // Convert object to string
							>
								{course.title} - ${course.price}
							</option>
						))}
					</select>
				</div>

				{/* Batch Dropdown */}
				<div className='mb-6'>
					<label className='block mb-1 font-bold text-gray-700 text-sm'>Batch</label>
					<select
						name='batchId'
						value={enrollmentData.batchId}
						onChange={handleInputChange}
						className='px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
						required>
						<option value=''>Select a batch</option>
						{batches?.data?.map((batch, index) => (
							<option key={index} value={batch._id}>
								{batch.name} - {batch.class_time} - Seats left {batch.availableSeats}
							</option>
						))}
					</select>
				</div>

				{/* Payment Way Dropdown */}
				<div className='mb-6'>
					<label className='block mb-1 font-bold text-gray-700 text-sm'>Payment Way</label>
					<select
						name='paymentWay'
						value={enrollmentData.paymentWay}
						onChange={handleInputChange}
						className='px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
					// required
					>
						<option value=''>Select a Payment Type</option>
						{selectedCourse?.data?.paymentType?.map((paymentType, index) => (
							<option key={index} value={paymentType}>
								{paymentType}
							</option>
						))}
					</select>
				</div>
				<div className='mb-6'>
					<label className='block mb-1 font-bold text-gray-700 text-sm'>Payment :{courseAmount}</label>
					<input
						type='text'
						name='payment'
						id='payment'
						placeholder='Amount'
						onChange={handleInputChange} // Open dropdown on focus
						className='px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
					/>
				</div>
			</div>

			{/* Form Actions */}
			<div className='flex justify-end gap-4 mt-6'>
				<button type='button' onClick={closeModal} className='bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white'>
					Cancel
				</button>
				<button type='submit' className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white'>
					Create
				</button>
			</div>
		</form>
	);
};

export default CreateEnrollment;
