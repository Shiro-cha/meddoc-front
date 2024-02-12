import { useRef, useState, useContext } from "react"
import Cookies from 'js-cookie';
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../security/context/AuthProvider";

import jwt_decode from "jwt-decode";
import { useUserType } from "../Context/UserTypeContext";



const OTP_URL = "/validateOtp"


export default function DigitOTP() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);


  // =================OTP input==================
  const inputRef = useRef({})


  // =================ERRORs input==================
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');


  const [otp, setOtp] = useState({
    digit_1: "",
    digit_2: "",
    digit_3: "",
    digit_4: "",
    digit_5: "",
    digit_6: "",

  });
  const handleBackSpace = (event, index) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }

  }
  const handlechange = (event, index) => {
    const { name, value } = event.target;

    setOtp((prev) => ({
      ...prev,
      [name]: value,

    }))
    // event.target.nextSibling.focus(); 
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  }
  const renderInput = () => {
    return Object.keys(otp).map((key, index) => (
      <input
        ref={element => inputRef.current[index] = element}
        key={key} // Use the key as a unique identifier
        type="text"
        maxLength="1"
        name={key} // Use the key here
        value={otp[key]} // Bind the value of the input to the corresponding key in the OTP state
        className="w-16 h-12 rounded mr-3 text-center text-2xl font-bold"
        onChange={(event) => handlechange(event, index)}
        onKeyUp={(event) => handleBackSpace(event, index)}
      />
    ));
  };
  const { userType, setuserType } = useUserType();

  const onSubmit = async (event) => {

    event.preventDefault();
    setErrMsg("")

    const accessTokenOTP = Cookies.get('jwtTokenOTP')

    console.log(accessTokenOTP)

    const concatenatedOtp = Object.values(otp).join('');

    console.log("Submitted OTP:", concatenatedOtp);

    try {
      setLoading(true)
      const response = await axios.post(OTP_URL, concatenatedOtp, {
        headers: {
          'Authorization': `Bearer ${accessTokenOTP}`,
          'Content-Type': 'application/json',
        }
      })

      const accessToken2 = response?.data
      var decodedaccessToken2 = jwt_decode(accessToken2)


      Cookies.remove('jwtTokenOTP')

      if (response.status === 200) {

        setAuth({ roles: [decodedaccessToken2.role], accessToken: [accessToken2] });

        var decoded = jwt_decode(accessToken2);

        Cookies.set('role', decoded.role);  
        Cookies.set('jwtToken',accessToken2);
        setuserType(decoded.role);
        navigate('/user')

      }


    } catch (err) {

      setLoading(false)
      setErrMsg("Une erreur s'est produite !")
      // =====================TEST=================
      console.log(err)


    }


  }

  return (
    <>

      <form onSubmit={onSubmit}
        noValidate
        autoComplete="off"
        className="flex flex-col items-center justify-center px-0 py-8 mx-auto lg:py-0">

        <div className="flex flex-col items-center">

          <h3 className="p-5">Veuillez entrer le code de validation</h3>
          <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block m-4 p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>

          <div>{renderInput()}</div>

        </div>

        <button type="submit" class="w-auto text-white m-10 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Valider
          {loading && (
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 ml-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
            </svg>
          )}
        </button>
      </form>

    </>
  )
}