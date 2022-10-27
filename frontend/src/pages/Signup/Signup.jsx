import { useState } from "react";
import { Link as LinkRoute, useNavigate } from 'react-router-dom'
import BackgroundLayout from "../../components/Layout/BackgroundLayout";
import * as authService from '../../services/authService'

import styles from './Signup.module.css'

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useToast } from '@chakra-ui/react'


{/*const SignupComponent = props => {

	const navigate = useNavigate()
	const [message, setMessage] = useState([''])
	const [formData, setFormData] = useState({
	  name: '',
	  email: '',
	  password: '',
	  passwordConf: '',
	})
	const [photoData, setPhotoData] = useState({})
  
	const updateMessage = msg => {
	  setMessage(msg)
	}
  
	const handleChange = e => {
	  updateMessage('')
	  setFormData({
		...formData,
		[e.target.name]: e.target.value,
	  })
	}
  
	const handleChangePhoto = (evt) => {
	  setPhotoData({ photo: evt.target.files[0] })
	}
  
	const handleSubmit = async e => {
	  e.preventDefault()
	  try {
		await authService.signup(formData, photoData.photo)
		props.handleSignupOrLogin()
		navigate('/')
	  } catch (err) {
		updateMessage(err.message)
	  }
	}
  
	const { name, email, password, passwordConf } = formData
  
	const isFormInvalid = () => {
	  return !(name && email && password && password === passwordConf)
	}

	return (

		<>
		<h1>Sign Up</h1><p>{message}</p><form
			autoComplete="off"
			onSubmit={handleSubmit}
			className={styles.container}
		>
			<div className={styles.inputContainer}>
				<label htmlFor="name" className={styles.label}>Name</label>
				<input
					type="text"
					autoComplete="off"
					id="name"
					value={name}
					name="name"
					onChange={handleChange} />
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="email" className={styles.label}>Email</label>
				<input
					type="text"
					autoComplete="off"
					id="email"
					value={email}
					name="email"
					onChange={handleChange} />
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="password" className={styles.label}>Password</label>
				<input
					type="password"
					autoComplete="off"
					id="password"
					value={password}
					name="password"
					onChange={handleChange} />
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="confirm" className={styles.label}>
					Confirm Password
				</label>
				<input
					type="password"
					autoComplete="off"
					id="confirm"
					value={passwordConf}
					name="passwordConf"
					onChange={handleChange} />
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="photo-upload" className={styles.label}>
					Upload Photo
				</label>
				<input
					type="file"
					id="photo-upload"
					name="photo"
					onChange={handleChangePhoto} />
			</div>
			<div className={styles.inputContainer}>
				<button disabled={isFormInvalid()} className={styles.button}>
					Sign Up
				</button>
				<LinkRoute to="/">
					<button>Cancel</button>
				</LinkRoute>
			</div>
		</form>
		</>
  )
}*/}



const SignupCard = (props) => {
	const [showPassword, setShowPassword] = useState(false);

	const toast = useToast()

	const navigate = useNavigate()
	const [message, setMessage] = useState([''])
	const [formData, setFormData] = useState({
	  firstName: '',
	  lastName: '',
	  email: '',
	  password: '',
	})
	//const [photoData, setPhotoData] = useState({})
  
	const updateMessage = msg => {
		setMessage(msg)
		if(msg && (msg !== '' || msg[0]!== '')) {
		  toast({
			title: 'Error!',
			description: msg,
			status: 'error',
			position: 'top-right',
			duration: 6000,
			isClosable: true,
		  })
		}  
	}
  
	const handleChange = e => {
	  console.log(e)
	  setFormData({
		...formData,
		[e.target.id]: e.target.value,
	  })
	}


	const handleSubmit = async evt => {
		evt.preventDefault()
		try {
			await authService.signup(formData)
			props.handleSignupOrLogin()
			navigate('/onboard')
		} catch (err) {
			updateMessage(err.message)
		}
	}

	return (
		<Flex
			align={'center'}
			justify={'center'}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
						Sign up
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>


				<form
					onSubmit={handleSubmit}
				>



				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id="firstName" isRequired>
									<FormLabel>First Name</FormLabel>
									<Input type="text" 
										value={formData.firstName}
										onChange={handleChange}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="lastName">
									<FormLabel>Last Name</FormLabel>
									<Input type="text" 
										value={formData.lastName}
										onChange={handleChange}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input type="email" 
								value={formData.email} 
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input type={showPassword ? 'text' : 'password'} 
									value={formData.password}
									onChange={handleChange}
								/>
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								type="submit"
								loadingText="Submitting"
								size="lg"
								bg={'teal.400'}
								color={'white'}
								_hover={{
									bg: 'teal.700',
								}}>
									Sign Up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								Already a user? <Link color={'teal.400'} href="/login">Login</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>

				</form>
			</Stack>
		</Flex>
	);
}

const Signup = props => {

	return (
		<BackgroundLayout
			component={
				<SignupCard
					handleSignupOrLogin={props.handleSignupOrLogin}
				/>}
		/>
	)
}

export default Signup