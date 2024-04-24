import React, { useRef, useState, useEffect, LegacyRef } from "react"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export default function Register() {
	const userRef = useRef<HTMLInputElement>(null)
	const errRef = useRef()

	const [user, setUser] = useState<string>("")
	const [validName, setValidName] = useState<boolean>(false)
	const [userFocus, setUserFocus] = useState<boolean>(false)

	const [pwd, setPwd] = useState<string>("")
	const [validPwd, setValidPwd] = useState<boolean>(false)
	const [pwdFocus, setPwdFocus] = useState<boolean>(false)

	const [matchPwd, setMatchPwd] = useState<string>("")
	const [validMatch, setValidMatch] = useState<boolean>(false)
	const [matchFocus, setMatchFocus] = useState<boolean>(false)

	const [errMsg, setErrMsg] = useState<string>("")
	const [success, setSuccess] = useState<boolean>(false)

	useEffect(() => {
		if (userRef.current === null) return
		userRef.current.focus()
	}, [])

	useEffect(() => {
		const result = USER_REGEX.test(user)
		console.log(result)
		console.log(user)
		setValidName(result)
	}, [user])

	useEffect(() => {
		const result = PWD_REGEX.test(pwd)
		console.log(result)
		console.log(pwd)
		setValidPwd(result)
		const match = pwd === matchPwd
		setValidMatch(match)
	}, [pwd, matchPwd])

	useEffect(() => {
		setErrMsg("")
	}, [user, pwd, matchPwd])

	return (
		<div className='bg-neutral-900 flex flex-row w-screen h-screen'>
			<div className='bg-neutral-800 flex flex-col w-1/3 container mx-auto items-center justify-center'>
				<p className='text-neutral-50 text-4xl font-bold mb-2'>Welcome Back</p>
				<p className='text-neutral-400 mb-4'>
					To keep connected with us please login with your personal info.
				</p>
				<div className='flex flex-col items-center'>
					<button className='bg-secondary-600/10 border-secondary-500 border-2 mt-2 p-3 rounded text-secondary-500 w-60 hover:bg-secondary-500 hover:text-neutral-100'>
						SIGN IN
					</button>
				</div>
			</div>
			<div className=' w-2/3'>
				<div className='container h-full w-full mx-auto flex flex-col items-center justify-center'>
					<div className='flex flex-col items-center'>
						<p className='p-15 mb-2 text-neutral-50 text-4xl font-bold'>
							Create Account
						</p>
						<p className='text-gray-400 mb-4'>
							use your email for registration
						</p>
					</div>
					<form className='flex flex-col w-1/3'>
						<input
							className='my-2 p-3 rounded bg-neutral-800 placeholder:text-neutral-500 text-neutral-100 focus:bg-neutral-600 focus:outline-none'
							type='text'
							placeholder='first name'
							ref={userRef}
							required
							autoComplete='off'
							aria-invalid={validName ? "false" : "true"}
							aria-describedby='uidnote'
							onChange={(e) => setUser(e.target.value)}
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<input
							className='my-2 p-3 rounded bg-neutral-800 placeholder:text-neutral-500 text-neutral-100 focus:bg-neutral-600 focus:outline-none'
							type='text'
							placeholder='last name'
							ref={userRef}
							required
							autoComplete='off'
							aria-invalid={validName ? "false" : "true"}
							aria-describedby='uidnote'
							onChange={(e) => setUser(e.target.value)}
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<input
							className='my-2 p-3 rounded bg-neutral-800 placeholder:text-neutral-500 text-neutral-100 focus:bg-neutral-600 focus:outline-none'
							type='email'
							placeholder='email'
						/>
						<input
							className='my-2 p-3 rounded bg-neutral-800 placeholder:text-neutral-500 text-neutral-100 focus:bg-neutral-600 focus:outline-none'
							type='password'
							placeholder='password'
						/>
						<input
							className='my-2 p-3 rounded bg-neutral-800 placeholder:text-neutral-500 text-neutral-100 focus:bg-neutral-600 focus:outline-none'
							type='password'
							placeholder='confirm password'
						/>
						<div className='flex flex-col items-center placeholder:text-neutral-500'>
							<button className='bg-primary-500 mt-2 p-3 rounded text-primary-100 w-60 hover:bg-primary-400'>
								SIGN UP
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
