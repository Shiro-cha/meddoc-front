import { useFormContext} from "react-hook-form"
import{findInputError, isFormInvalid} from './utilis'
import { motion, AnimatePresence} from "framer-motion"

export const Input = ({ label, type, id, placeholder,name,validation }) => {
  const { register,formState: { errors }, } = useFormContext();

  const inputError = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputError)
 
 return (
  <div className="flex flex-col w-full gap-2">
  <div className="flex justify-between">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
          {label}
      </label>
      <AnimatePresence mode="wait" initial={false}>
      {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
      </AnimatePresence>
  </div>
  <input
        id={id}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        {...register(name, validation)}
      />
      
</div>
  )
}

const InputError = ({ message }) => {
  return (
  <motion.p
      className="flex items-center gap-1 px-2 text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      {message}
  </motion.p>
  )
}
const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2},
}
