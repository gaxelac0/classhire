import { useState } from "react";
import { Link as LinkRoute, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

import styles from './Signup.module.css'

const Signup = props => {

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
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <p>{message}</p>
		<form
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
				onChange={handleChange}
			/>
			</div>
			<div className={styles.inputContainer}>
			<label htmlFor="email" className={styles.label}>Email</label>
			<input
				type="text"
				autoComplete="off"
				id="email"
				value={email}
				name="email"
				onChange={handleChange}
			/>
			</div>
			<div className={styles.inputContainer}>
			<label htmlFor="password" className={styles.label}>Password</label>
			<input
				type="password"
				autoComplete="off"
				id="password"
				value={password}
				name="password"
				onChange={handleChange}
			/>
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
				onChange={handleChange}
			/>
			</div>
			<div className={styles.inputContainer}>
			<label htmlFor="photo-upload" className={styles.label}>
				Upload Photo
			</label>
			<input
				type="file"
				id="photo-upload"
				name="photo"
				onChange={handleChangePhoto}
			/>
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
    </main>
  )
}

export default Signup