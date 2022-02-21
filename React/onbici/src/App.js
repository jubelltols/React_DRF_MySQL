import React, { Suspense } from 'react';
import  'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { StationsContextProvider } from "./context/StationsContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import { AuthContextProvider } from "./context/AuthContext";
import { RentContextProvider } from "./context/RentContext";
import Header from "./components/Header/Header"
import SpinnerLoading from "./components/Spinner/SpinnerLoading"
import AuthGuard from "./services/guards/AuthGuard"
import AdminGuard from "./services/guards/AdminGuard"

function App() {
  const Home = React.lazy(() => import(  "./pages/Home/Home"))
  const Signin = React.lazy(() => import(  "./pages/User/Signin"))
  const Signup = React.lazy(() => import(  "./pages/User/Signup"))
  const Rent = React.lazy(() => import(  "./pages/Rent/Rent"))
  const Dashboard = React.lazy(() => import(  "./pages/Dashboard/Dashboard"))
  const Bikes = React.lazy(() => import(  "./pages/Bikes/Bikes"))
  const BikesCreate = React.lazy(() => import(  "./pages/Bikes/BikesCreate"))
  const BikesUpdate = React.lazy(() => import(  './pages/Bikes/BikesUpdate'))
  const Stations = React.lazy(() => import(  "./pages/Station/Stations"))
  const StationsCreate = React.lazy(() => import(  "./pages/Station/StationCreate"))
  const StationsUpdate = React.lazy(() => import(  './pages/Station/StationsUpdate'))
  const Slot = React.lazy(() => import(  "./pages/Slot/Slot"))
  const SlotCreate = React.lazy(() => import(  "./pages/Slot/SlotCreate"))
  const SlotUpdate = React.lazy(() => import(  './pages/Slot/SlotUpdate'))
  const Incidences = React.lazy(() => import(  "./pages/Incidence/Incidences"))
  const IncidencesCreate = React.lazy(() => import(  './pages/Incidence/IncidencesCreate'))
  const IncidencesUpdate = React.lazy(() => import(  './pages/Incidence/IncidencesUpdate'))
  const Notification = React.lazy(() => import(  './pages/User/Notification'))
  const Profile = React.lazy(() => import(  './pages/User/Profile'))
  
  return (    
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationContextProvider>
          <Header />
          <RentContextProvider>
            <StationsContextProvider>
              <Routes>
                <Route path="/" element={<Suspense fallback={<SpinnerLoading/>}><Home/></Suspense>} />
                <Route path="/signin" element={<Suspense fallback={<SpinnerLoading/>}><Signin/></Suspense>} />
                <Route path="/signup" element={<Suspense fallback={<SpinnerLoading/>}><Signup/></Suspense>} />

                <Route path="/rent" element={<Suspense fallback={<SpinnerLoading/>}><><Rent/></></Suspense>} />
                <Route path="/profile" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><Profile/></AuthGuard></Suspense>} />

                <Route path="/dashboard" element={<Suspense fallback={<SpinnerLoading/>}><Dashboard/></Suspense>} />
                <Route path="/stations" element={<Suspense fallback={<SpinnerLoading/>}><AdminGuard><Stations/></AdminGuard></Suspense>} />
                <Route path="/station/create" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><StationsCreate/></AuthGuard></Suspense>} />
                <Route path="/station/edit/:id" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><StationsUpdate/></AuthGuard></Suspense>} />
                <Route path="/slot" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><Slot/></AuthGuard></Suspense>} />
                <Route path="/slot/create" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><SlotCreate/></AuthGuard></Suspense>} />
                <Route path="/slot/edit/:id" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><SlotUpdate/></AuthGuard></Suspense>} />
                <Route path="/bikes" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><Bikes/></AuthGuard></Suspense>} />
                <Route path="/bike/create" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><BikesCreate/></AuthGuard></Suspense>} />
                <Route path="/bike/edit/:id" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><BikesUpdate/></AuthGuard></Suspense>} />
                <Route path="/incidences" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><Incidences/></AuthGuard></Suspense>} />
                <Route path="/incidences/create/:id" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><IncidencesCreate/></AuthGuard></Suspense>} />
                <Route path="/incidences/edit/:id" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><IncidencesUpdate/></AuthGuard></Suspense>} />
                <Route path="/notification" element={<Suspense fallback={<SpinnerLoading/>}><AuthGuard><Notification/></AuthGuard></Suspense>} />
                <Route path="*" element={<Suspense fallback={<SpinnerLoading/>}><><Home/></></Suspense>} />
              </Routes>
            </StationsContextProvider>
          </RentContextProvider>
        </NotificationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
