import React, { useRef, useState, useEffect, LegacyRef } from "react"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "@/Context/useAuth"

type LoginFormInputs = {
	username: string
	password: string
}

const validation = Yup.object().shape({
	username: Yup.string().required("Username is required"),
	password: Yup.string().required("Password is required"),
})

export default function Login() {
	const navigate = useNavigate()
	const { loginUser } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({ resolver: yupResolver(validation) })

	const handleLogin = (form: LoginFormInputs) => {
		loginUser(form.username, form.password)
	}

	return (
		<div className='bg-neutral-900 flex flex-row w-screen h-screen'>
			<div className='bg-neutral-800 flex flex-col w-1/3 container mx-auto items-center justify-center'>
				<p className='text-neutral-50 text-4xl font-bold mb-2'>Welcome</p>
				<p className='text-neutral-400 mb-4'>
					To keep connected with us please create an account.
				</p>
				<div className='flex flex-col items-center'>
					<button
						className='bg-secondary-600/10 border-secondary-500 border-2 mt-2 p-3 rounded text-secondary-500 w-60 hover:bg-secondary-500 hover:text-neutral-100'
						onClick={() => {
							navigate("/register")
						}}
					>
						SIGN UP
					</button>
				</div>
			</div>
			<div className=' w-2/3'>
				<div className='container h-full w-full mx-auto flex flex-col items-center justify-center'>
					<div className='flex flex-col items-center'>
						<p className='p-15 mb-2 text-neutral-50 text-4xl font-bold'>
							Login
						</p>
						<p className='text-gray-400 mb-4'>
							use your username and password to log in
						</p>
					</div>
					<form
						className='flex flex-col w-1/3'
						onSubmit={handleSubmit(handleLogin)}
					>
						<input
							className='my-2 p-3 rounded bg-neutral-800 placeholder:text-neutral-500 text-neutral-100 focus:bg-neutral-600 focus:outline-none'
							type='text'
							placeholder='username'
							required
							autoComplete='off'
							{...register("username")}
						/>
						{errors.username ? (
							<p className='text-rose-700'>{errors.username.message}</p>
						) : (
							""
						)}
						<input
							className='my-2 p-3 rounded bg-neutral-800 placeholder:text-neutral-500 text-neutral-100 focus:bg-neutral-600 focus:outline-none'
							type='password'
							placeholder='password'
							required
							autoComplete='off'
							{...register("password")}
						/>
						{errors.password ? (
							<p className='text-rose-700'>{errors.password.message}</p>
						) : (
							""
						)}
						<div className='flex flex-col items-center placeholder:text-neutral-500'>
							<button className='bg-primary-500 mt-2 p-3 rounded text-primary-100 w-60 hover:bg-primary-400'>
								LOGIN
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
