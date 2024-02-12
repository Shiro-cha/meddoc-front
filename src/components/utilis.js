export function findInputError(errors,names){
     
    const filtred= Object.keys(errors)
    .filter(key=>key.includes(names)).reduce((cur,key)=>{
    
        return Object.assign(cur,{error:errors[key]})
    },{})
       
    return filtred
}
export const isFormInvalid = err =>{
    if(Object.keys(err).length > 0) return true
    return false
}

