import { useFormContext } from "react-hook-form"
import { findInputError, isFormInvalid } from './utilis'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";

export const Input = ({ label, type, id, placeholder, name, validation ,defaultvalue }) => {
  const { register, formState: { errors }, } = useFormContext();
  const inputError = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputError)
  const [defaultValue,setDefaultValue] = useState(defaultvalue)

  return (
    // <div className="flex gap-2">
    <div>
      <div className="relative md:flex justify-between">
        <div className=" mr-5">
          <label for={id} className="text-justify mr-10">{label}:</label>
        </div>
        <div className="my-1 md:my-0">
          <input
            defaultValue={defaultValue}
            id={id}
            type={type}
            placeholder={placeholder}
            aria-describedby={id}
            {...register(name, validation)}
            className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-80 min-w-full focus:ring-primary-600 focus:border-primary-600 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <AnimatePresence mode="wait" initial={false}>
      {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
      </AnimatePresence>
        </div>

      </div>


    </div>

    /* <div className="flex justify-between">
        <label htmlFor={id} className="block w-20 text-center text-sm font-medium text-gray-900 dark:text-white ">
            {label}:
        </label>
    
    </div>
    <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
              <InputError
                message={inputError.error.message}
                key={inputError.error.message}
              />
            )}
        </AnimatePresence>
    <input
          id={id}
          type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          {...register(name, validation)}
        /> */

    // </div>
  )
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="text-xs text-red-600 dark:text-red-400"
      {...framer_error}
    >
      {message}
    </motion.p>
  )
}
const framer_error = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
