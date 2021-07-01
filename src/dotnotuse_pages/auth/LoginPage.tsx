import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import authService from '../../services/api/authService'
import { AuthContext } from '../../services/auth'
import useUiStore from '../../services/ui/uiStore'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthenticated } = React.useContext(AuthContext)
  const setHasHeader = useUiStore((state) => state.setHasHeader)
  const history = useHistory()
  const setCount = useUiStore((state) => state.setCount)

  React.useEffect(() => {
    setHasHeader(false)
  }, [])

  const performLogin = async () => {
    const result = await authService.loginUser(email, password)
    if (result) {
      setAuthenticated(true)
      history.push('/')
    }
  }
  return (
    <div className="relative w-full h-full min-h-screen">
      <div className="flex h-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div
          className="hidden h-full bg-cover lg:block lg:w-3/4"
          style={{ backgroundImage: "url('img/login-bg.jpg')" }}
        />
        <div className="w-full px-6 py-24 md:px-8 lg:w-1/4">
          <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
            Welcome back!
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-200">
            to mixyboos
          </p>
          <button
            className="block px-3 py-1 text-xl leading-none bg-transparent border border-solid rounded outline-none cursor-pointer focus:outline-none"
            type="button"
            onClick={() => setCount(10)}
          >
            Increment Count
          </button>

          <a
            href="#"
            className="flex items-center justify-center mt-4 text-gray-600 rounded-lg shadow-md dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-3">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </a>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </a>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Email address"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forget Password?
              </a>
            </div>
            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mt-8">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              onClick={async () => {
                performLogin()
              }}
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <a
              href="#"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </a>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>

    // <React.Fragment>
    //   <section className="relative w-full h-full min-h-screen">
    //     <div
    //       className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
    //       style={{ backgroundImage: "url('img/login-bg.png')" }}
    //     ></div>
    //     <div className="flex items-center content-center justify-center h-full">
    //       <div className="w-full lg:w-4/12">
    //         <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-gray-300 border-0 rounded-lg shadow-lg">
    //           <div className="px-6 py-6 mb-0 rounded-t">
    //             <div className="mb-3 text-center">
    //               <h6 className="text-sm font-bold text-gray-600">
    //                 Sign in with
    //               </h6>
    //             </div>
    //             <div className="text-center btn-wrapper">
    //               <button
    //                 className="inline-flex items-center px-4 py-2 mb-1 mr-2 text-xs font-bold text-gray-800 uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-gray-100 focus:outline-none hover:shadow-md"
    //                 type="button"
    //               >
    //                 <img alt="..." className="w-5 mr-1" src="img/github.svg" />
    //                 Github
    //               </button>
    //               <button
    //                 className="inline-flex items-center px-4 py-2 mb-1 mr-1 text-xs font-bold text-gray-800 uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none active:bg-gray-100 focus:outline-none hover:shadow-md"
    //                 type="button"
    //               >
    //                 <img alt="..." className="w-5 mr-1" src="img/google.svg" />
    //                 Google
    //               </button>
    //             </div>
    //             <hr className="mt-6 border-gray-400 border-b-1" />
    //           </div>
    //           <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
    //             <div className="mb-3 font-bold text-center text-gray-500">
    //               <small>Or sign in with credentials</small>
    //             </div>
    //             <form>
    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block mb-2 text-xs font-bold text-gray-700 uppercase"
    //                   htmlFor="grid-password"
    //                 >
    //                   Email
    //                 </label>
    //                 <input
    //                   type="email"
    //                   className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all duration-150 ease-linear bg-white rounded shadow focus:outline-none focus:shadow-outline"
    //                   placeholder="Email"
    //                   value={email}
    //                   onChange={(event) => setEmail(event.target.value)}
    //                 />
    //               </div>

    //               <div className="relative w-full mb-3">
    //                 <label
    //                   className="block mb-2 text-xs font-bold text-gray-700 uppercase"
    //                   htmlFor="grid-password"
    //                 >
    //                   Password
    //                 </label>
    //                 <input
    //                   type="password"
    //                   className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all duration-150 ease-linear bg-white rounded shadow focus:outline-none focus:shadow-outline"
    //                   placeholder="Password"
    //                   value={password}
    //                   onChange={(event) => setPassword(event.target.value)}
    //                 />
    //               </div>
    //               <div>
    //                 <label className="inline-flex items-center cursor-pointer">
    //                   <input
    //                     id="customCheckLogin"
    //                     type="checkbox"
    //                     className="w-5 h-5 ml-1 text-gray-800 transition-all duration-150 ease-linear form-checkbox"
    //                   />
    //                   <span className="ml-2 text-sm font-semibold text-gray-700">
    //                     Remember me
    //                   </span>
    //                 </label>
    //               </div>

    //               <div className="mt-6 text-center">
    //                 <button
    //                   className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-gray-900 rounded shadow outline-none active:bg-gray-700 hover:shadow-lg focus:outline-none"
    //                   type="button"
    //                   onClick={async () => {
    //                     performLogin()
    //                   }}
    //                 >
    //                   Sign In
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //         <div className="relative flex flex-wrap mt-6">
    //           <div className="w-1/2">
    //             <Link to="/forgot" className="text-gray-300">
    //               <small>Forgot password?</small>
    //             </Link>
    //           </div>
    //           <div className="w-1/2 text-right">
    //             <Link to="/register" className="text-gray-300">
    //               <small>Create new account</small>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </React.Fragment>
  )
}

export default LoginPage
