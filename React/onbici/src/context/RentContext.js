import React, { useState } from 'react'

const Context = React.createContext({})

export function RentContextProvider ({children}) {
    const [rent, setRent] = useState([])

    return  <Context.Provider value = {{rent, setRent}}>
                {children}
            </Context.Provider>
}

export default Context