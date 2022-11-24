import React, { useState } from "react";

import UpdateUser from "../../components/User/UpdateUser"
import ChangePassword from "../../components/User/ChangePassword"
import Subscription from "../../components/User/Subscription"
import { useTranslation } from "react-i18next";

export default function Profile() {
    const { t } = useTranslation("global");
    const [tab, setTab] = useState(3);

    return (
        <section className="min-h-screen bg-base-200">
            <div className="col-span-3 row-span-3 flex-shrink-0 flex-col items-center justify-center max-w-5xl mx-auto lg:py-16 px-6 py-8">
                <div className="tabs w-full flex-grow-0">
                    <button className={tab === 1 ? "tab tab-lifted tab-active tab-border-none tab-lg flex-1" : "tab tab-lifted tab-border-none tab-lg flex-1"} onClick={() => setTab(1)}>{t('profile')}</button> 
                    <button className={tab === 2 ? "tab tab-lifted tab-active tab-border-none tab-lg flex-1" : "tab tab-lifted tab-border-none tab-lg flex-1"} onClick={() => setTab(2)}>{t('change_password')}</button>
                    <button className={tab === 3 ? "tab tab-lifted tab-active tab-border-none tab-lg flex-1" : "tab tab-lifted tab-border-none tab-lg flex-1"} onClick={() => setTab(3)}>{t('subscription')}</button>
                </div>
                <div className="bg-base-100 grid w-full flex-grow gap-3 rounded-xl rounded-tl-none p-6 shadow-xl">
                    <div className="flex items-center space-x-2">
                        {(() => {
                            switch (tab) {
                            case 1:     return <UpdateUser/>;
                            case 2:     return <ChangePassword/>;
                            case 3:     return <Subscription/>;
                            default:    return <UpdateUser/>;
                            }
                        })()}
                    </div>
                </div>
            </div>
        </section>
    )
}