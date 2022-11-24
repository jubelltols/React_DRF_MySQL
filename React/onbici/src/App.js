import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { StationsContextProvider } from "./context/StationsContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import { AuthContextProvider } from "./context/AuthContext";
import { RentContextProvider } from "./context/RentContext";
import { ToastContextProvider } from "./context/ToastContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SpinnerLoading from "./components/Spinner/SpinnerLoading";
import AuthGuard from "./services/guards/AuthGuard";
import AdminGuard from "./services/guards/AdminGuard";
import AuthSubscriptionGuard from "./services/guards/AuthSubscriptionGuard";
import ToastComponent from './components/Toast';
import Layout from './components/Layout';

function App() {
  const Home = React.lazy(() => import(  "./pages/Home/Home"))
  const Rates = React.lazy(() => import(  "./pages/Rates/Rates"))
  const CheckoutPage = React.lazy(() => import(  "./pages/Checkout/Checkout"))
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
  const Map = React.lazy(() => import(  "./pages/Map/Map"))
  const ChangeSubscription = React.lazy(() => import(  "./pages/Checkout/ChangeSubscription"))
  const NotFound = React.lazy(() => import(  "./pages/NotFound/NotFound"))

  return (    
    <BrowserRouter>
    <ToastContextProvider>
      <AuthContextProvider>
        <NotificationContextProvider>
          <Header />
          <RentContextProvider>
            <StationsContextProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  
                  <Route path="/" element={<Suspense fallback={<SpinnerLoading/>}>
                    <Home/>
                  </Suspense>} /> 
                  
                  <Route path="rates" element={<Suspense fallback={<SpinnerLoading/>}><Rates/></Suspense>} />                 
                  <Route path="map" element={<Suspense fallback={<SpinnerLoading/>}><Map/></Suspense>} />    

                  <Route path="signin" element={<Suspense fallback={<SpinnerLoading/>}><Signin/></Suspense>} />
                  <Route path="signup" element={<Suspense fallback={<SpinnerLoading/>}><Signup/></Suspense>} />

                  <Route element={<AuthGuard />}> 
                    <Route path="checkout" element={<Suspense fallback={<SpinnerLoading/>}><CheckoutPage/></Suspense>} />
                    <Route path="profile" element={<Suspense fallback={<SpinnerLoading/>}><Profile/></Suspense>} />

                    <Route element={<AuthSubscriptionGuard />}>
                      <Route path="rent" element={<Suspense fallback={<SpinnerLoading/>}><Rent/></Suspense>} /> 
                      <Route path="change-subscription" element={<Suspense fallback={<SpinnerLoading/>}><ChangeSubscription/></Suspense>} />
                      <Route path="incidences/create/:id" element={<Suspense fallback={<SpinnerLoading/>}><IncidencesCreate/></Suspense>} />
                    </Route>
                    
                    <Route element={<AdminGuard />}>
                      <Route path="dashboard" element={<Suspense fallback={<SpinnerLoading/>}><Dashboard/></Suspense>} />
                      <Route path="stations" element={<Suspense fallback={<SpinnerLoading/>}><Stations/></Suspense>} />
                      <Route path="station/create" element={<Suspense fallback={<SpinnerLoading/>}><StationsCreate/></Suspense>} />
                      <Route path="station/edit/:id" element={<Suspense fallback={<SpinnerLoading/>}><StationsUpdate/></Suspense>} />
                      <Route path="slot" element={<Suspense fallback={<SpinnerLoading/>}><Slot/></Suspense>} />
                      <Route path="slot/create" element={<Suspense fallback={<SpinnerLoading/>}><SlotCreate/></Suspense>} />
                      <Route path="slot/edit/:id" element={<Suspense fallback={<SpinnerLoading/>}><SlotUpdate/></Suspense>} />
                      <Route path="bikes" element={<Suspense fallback={<SpinnerLoading/>}><Bikes/></Suspense>} />
                      <Route path="bike/create" element={<Suspense fallback={<SpinnerLoading/>}><BikesCreate/></Suspense>} />
                      <Route path="bike/edit/:id" element={<Suspense fallback={<SpinnerLoading/>}><BikesUpdate/></Suspense>} />
                      <Route path="incidences" element={<Suspense fallback={<SpinnerLoading/>}><Incidences/></Suspense>} />
                      <Route path="incidences/edit/:id" element={<Suspense fallback={<SpinnerLoading/>}><IncidencesUpdate/></Suspense>} />
                      <Route path="notification" element={<Suspense fallback={<SpinnerLoading/>}><Notification/></Suspense>} />
                    </Route>
                  </Route>

                  <Route path="*" element={<Suspense fallback={<SpinnerLoading/>}><NotFound/></Suspense>} />
                </Route>
              </Routes>
            </StationsContextProvider>
          </RentContextProvider>
          <Footer/>
          <ToastComponent/>
        </NotificationContextProvider>
      </AuthContextProvider>
    </ToastContextProvider>
  </BrowserRouter>
  );
}

export default App;
