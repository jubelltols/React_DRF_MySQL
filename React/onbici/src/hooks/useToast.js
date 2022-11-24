import { useContext } from "react";
import ToastContext from '../context/ToastContext'

export function useToast () {
    const { toast, addToast, removeToast } = useContext(ToastContext);

    return { toast, addToast, removeToast }
}