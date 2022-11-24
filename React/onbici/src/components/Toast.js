import React, { useContext, useEffect} from 'react'
import ToastContext from '../context/ToastContext';
import { useTranslation } from "react-i18next";

export default function ToastComponent () {
    const { toast, removeToast } = useContext(ToastContext)
    const { t } = useTranslation("global");

    useEffect(()=>{
        setTimeout(function() {
            removeToast();
        }, 5000);
    },[])

    const handleSubmit = () => {
        removeToast();
    };

    return (
        <div>
            {toast ? (
                <div className="toast">
                    <div className={toast?.bgColor}>
                        <div>
                            <div>
                                {(() => {
                                    switch (toast.icon) {
                                        case 'info': 
                                            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        case 'success':
                                            return <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        case 'warning':
                                            return <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        case 'error':
                                            return <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        default:
                                            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    }
                                })()}
                            </div>  
                            <div>
                                <div className="text-xs">
                                    <strong className='text-dark me-auto mr-1'>ONBICI</strong>
                                    {toast.status ? (
                                        <div class="badge badge-outline badge-xs">STATUS {toast?.status}</div>
                                    ):""}
                                </div>
                                <h3 className="font-bold">
                                    <span className={toast.textColor}>{t(toast?.message)}</span>
                                </h3>  
                            </div>
                        </div>
                        <div className="flex-none">
                            <button type="button" onClick={handleSubmit} className="ml-auto -mx-1.5 -my-1.5 b rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8" data-dismiss-target="#toast-default" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ) : ""} 
        </div>
    )
}