import { useEffect } from "react";
import Swal from "sweetalert2"


export default function Errormessage({ icon, message, position, status }) {
  useEffect(() => {
    // Create the SweetAlert2 toast when the component mounts
    const ErrorToast = Swal.mixin({
      toast: true,
      position: position || 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    ErrorToast.fire({
      icon: icon,
      title: message
    });
  }, [icon, message, position]);


  return null;
}

export const toast =  (icon, message, position, status) => {
  const ErrorToast =  Swal.mixin({
    toast: true,
    position: position || 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  ErrorToast.fire({
    icon: icon,
    title: message
  });
}
