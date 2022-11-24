import React  from "react";
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

export default function Rates() {
  const { t } = useTranslation("global");

  return (
      <section className="bg-base-content">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-base-100">{t("rates_title")}</h2>
                <p className="mb-5 font-light text-base-200 sm:text-xl ">{t("rates_description")}</p>
            </div>
            <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
                
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-base-content bg-base-100 rounded-lg border border-base-content  shadow  xl:p-8">
                    <h3 className="mb-4 text-2xl font-semibold">{t("rates_basic_title")}</h3>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">5€</span>
                        <span className="text-gray-500 ">/mouth</span>
                    </div>
                    
                    <ul className="mb-8 space-y-4 text-left">
                        <li className="flex space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            <span>{t("rates_basic_description")}</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            <span>{t("rates_description_1")}</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            <span>{t("rates_description_2")}</span>
                        </li>
                    </ul>

                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <tbody>
                          <tr>
                            <td className="text-gray-900">0 - 30 min.</td>
                            <td className="text-gray-900">{t("rates_price_free")}</td>
                          </tr>
                          <tr>
                            <td className="text-gray-900">30 min.</td>
                            <td className="text-gray-900">0,50 €</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
                
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-base-content bg-base-100 rounded-lg border border-base-content  shadow  xl:p-8">
                    <h3 className="mb-4 text-2xl font-semibold">{t("rates_general_title")}</h3>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">15€</span>
                        <span className="text-gray-500 " >/year</span>
                    </div>
                    
                    <ul className="mb-8 space-y-4 text-left">
                        <li className="flex space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            <span>{t("rates_general_description")}</span>
                        </li>
                        <li className="flex space-x-3">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            <span>{t("rates_description_1")}</span>
                        </li>
                        <li className="flex space-x-3">
                          
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            <span>{t("rates_description_2")}</span>
                        </li>
                    </ul>

                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <tbody>
                          <tr>
                            <td className="text-gray-900">0 - 30 min.</td>
                            <td className="text-gray-900">{t("rates_price_free")}</td>
                          </tr>
                          <tr>
                            <td className="text-gray-900">30 min.</td>
                            <td className="text-gray-900">0,50 €</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-sm text-center mt-8">
              <div className="card flex-shrink-0 w-full">
                <Link to="/checkout" className="btn btn-primary rounded-md">
                  {t("button_register")}
                </Link>
              </div>
            </div>
            
        </div>
      </section>
  )
}