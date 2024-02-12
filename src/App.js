// import logo from './logo.svg';
import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout/layout';

import { Section } from './components/sections';
import Mailform from './components/Form/Mail_form';
import Login from './components/Form/Login_form';
import Signupform from './components/Form/Sign_up_form';
import DigitOTP from './components/Form/Digit_OTP';
import Faq from "./components/LandingPageContent/FAQ"
import TimeLine from './components/LandingPageContent/TimeLine';
import Forgot from './components/Form/Forgot_password';
import Errorpage from './components/Erropage';
import { AuthProvider } from './security/context/AuthProvider';
import RequireAuth from './security/RequireAuth';
import NosService from './components/LandingPageContent/NosServices';
import Unauthorizedpage from './components/Unauthorized';
import PersistLogin from './security/PersistLoging';

// Provider for userType context
import { UserTypeProvider } from './components/Context/UserTypeContext';

// USER COMPONENTS
import Layoutconnected from './components/Layout/layout_connected_user';
import UserHero from './components/User/User_hero';
import Appointments from './components/User/AppointmentList';
import Dashboard from './components/User/Dashboard';
import UserSetting from './components/User/User_Setting';
import ShowHealthcare from './components/User/ShowHealthcare';



// HEALTHCARE COMPONENTS
import HealthcareHero from './components/Healthcare/Healthcare_hero';
import SignUpHealthCare from './components/Form/Sign_up_Healthcare_form';

import HealthcareDashboard from './components/Healthcare/Healthcare_dashboard';
import HealthcareSetting from './components/Healthcare/Healthcare_setting';
import HealthcareAppointments from './components/Healthcare/Healthcare_Appointment';
import HealthcareCalendar from './components/Healthcare/Healthcare_Calendar';
import HealthcarePatientEnabled from './components/Healthcare/Healthcare_Patient_enabled';
import BookHealth from './components/User/BookHistoryLogHealth';
import VisitsBookHealth from './components/User/VisitsLogsHealth';
import AdminDashboard from './components/Admin/AdminDashboard';
import HealthcareAppointmentsSetting from './components/Healthcare/Healthcare_Appointment Setting';
import HealthCareProfile from './components/Healthcare/Profile_Information/HealthCareProfil';
import Searchhealthcare from './components/User/SearchHealthcare';
import SearchLayout from './components/Layout/searchlayout';
import HealthcareManager from './components/Healthcare/HealthcareManager/HealthcareManager';
import HealthcareList from './components/Healthcare/HealthcareManager/HealthcareList';
import AddHealthcareForm from './components/Healthcare/HealthcareManager/AddHealthcareForm';
import TakeAppointment from './components/User/Appointment/TakeAppointment';
import { ValidateAppointment } from './components/Healthcare/StepValidationAppointment/ValidationAppointment';
import ConsultationsListByPatient from './components/Healthcare/ConsultationPerPatient/ConsultationsList';
import ActivateCount from './components/Admin/ActivedCount/ActivedCount';
import DisableCount from './components/Admin/DescativedCount/DesactivedCountHealthCare';
import DisableCountCompany from './components/Admin/DescativedCount/DesactivedCountCompany';
import OneConsultationsListByPatient from './components/Healthcare/ConsultationPerPatient/OneConsultationList';
import OneConsultationsList from './components/User/Appointment/OneConsultation';
import DisableCountPatient from './components/Admin/DescativedCount/CountPatient';
import AdministratorDashboard from './components/Admin/AdministratorDashboard';
import ViewProfil from './components/Admin/ViewProfil';

// ADMIN COMPONENTS


// ROLES 
const ROLES = {
  'Patient': "patient",
  'Health_care': "healthpro",
  'Admin': "admin",
  'OTP': 'non-actived',
  'company': "secretary"
}



function App() {
  return (
    <UserTypeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* ================Public routes========================= */}
              <Route index element={<Section />} />
              <Route path="login" element={<Login />} />
              <Route path="sign-up" element={<Signupform />} />
              <Route path='healthcare_sign_up' element={<SignUpHealthCare />}></Route>
              <Route path="nos-services" element={<NosService />} />
              <Route path="contact_us" element={<Mailform />} />
              <Route path="foire_aux_questions" element={<Faq />} />
              <Route path="a_propos_de_nous" element={<TimeLine />} />
              <Route path="forgot_password_form" element={<Forgot />} />
              <Route path='search_healthcare/:id' element={<ShowHealthcare />} />
              <Route path='search' element={<SearchLayout />} >
                <Route index element={<Searchhealthcare />} />
              </Route>
              <Route path='*' element={<Errorpage />}></Route>
            </Route>


            <Route path='unauthorized' element={<Unauthorizedpage />}></Route>
            <Route path="/" element={<Layout />}>
              <Route path="OTP_digit" element={<DigitOTP />} />
            </Route>
            {/* </Route> */}

            {/* =================Private routes=================== */}
            <Route element={<PersistLogin />}>

              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/" element={<Layoutconnected />} />
              </Route>

              {/* USER */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Patient]} />}>
                <Route path="/user" element={<Layoutconnected />} >
                  <Route index element={<UserHero />}></Route>
                  <Route path='appointment' element={<Appointments />}></Route>
                  <Route path='medical_history_book' element={<BookHealth />}></Route>
                  <Route path='visits_logs_book' element={<VisitsBookHealth />}></Route>
                  <Route path='settings' element={<UserSetting />}></Route>
                  <Route path='search_healthcare/:id' element={<ShowHealthcare />} />
                  <Route path='take_appointment/:healthcare_id/:date/:start/:end' element={<TakeAppointment />} />
                  <Route path=':id/one_consultation' element={<OneConsultationsList />}></Route>
                  <Route path='*' element={<Errorpage />}></Route>
                </Route>
              </Route>


              {/* HEALTHCARE */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Health_care]} />}>
                <Route path="healthcare" element={<Layoutconnected />} >
                  <Route index element={<HealthcareDashboard />} ></Route>
                  <Route path='dashboard' element={<HealthcareDashboard />}></Route>
                  <Route path='settings' element={<HealthcareSetting />}></Route>
                  <Route path='calendar' element={<HealthcareCalendar />}></Route>
                  <Route path='users' element={<HealthcareDashboard />}></Route>
                  <Route path='appointment/:id_user' element={<HealthcareAppointments />}></Route>
                  <Route path='appointment' >
                    <Route path='settings' element={<HealthcareAppointmentsSetting />}>
                    </Route>
                  </Route>
                  <Route path='profile' element={<HealthCareProfile />}></Route>
                  <Route path='valid_appointment/:id_rendez_vous' element={<ValidateAppointment />}></Route>
                  <Route path='consultation/:id_rendez_vous' element={<ValidateAppointment />}></Route>
                  <Route path='patient/:id_patient_enabled/consultations_list' element={<ConsultationsListByPatient />}></Route>
                  <Route path=':id/one_consultation' element={<OneConsultationsListByPatient />}></Route>
                  <Route path='medical_history_book/:id' element={<BookHealth />}></Route>
                  <Route path='patient_enabled' element={<HealthcarePatientEnabled />}></Route>
                </Route>
              </Route>

              {/* COMPANY */}
              <Route element={<RequireAuth allowedRoles={[ROLES.company]} />}>
                <Route path="company" element={<Layoutconnected />} >
                  <Route index element={<HealthcareManager />}></Route>
                  <Route path='dashboard' element={<HealthcareManager />}></Route>
                  <Route path='healthcare_list' element={<HealthcareList />}></Route>
                  <Route path='healthcare/:id' element={<HealthCareProfile />}></Route>
                  <Route path='healthcare_calendar/:id' element={<HealthcareCalendar />}></Route>
                  <Route path='add_healthcare_user' element={<AddHealthcareForm />}></Route>
                </Route>
              </Route>


              {/* Admin */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="admin" element={<Layoutconnected />} >
                  <Route index element={<AdministratorDashboard />} ></Route>
                  <Route index path='dashboard' element={<AdministratorDashboard />} ></Route>
                  {/* <Route index element={<ActivateCount />} ></Route> */}
                  <Route path='actived_count' element={<ActivateCount />} ></Route>
                  <Route path='disable_count' element={<DisableCount />} ></Route>
                  <Route path='view_profil/:id' element={<ViewProfil />} ></Route>
                  <Route path='company_disable_count' element={<DisableCountCompany />} ></Route>
                  <Route path='patient_disable_count' element={<DisableCountPatient />} ></Route>

                  <Route path='healthcare/:id' element={<ShowHealthcare />}></Route>
                </Route>
              </Route>


            </Route>

            {/* =================Error routes=================== */}







            {/* <Route path='account' element ={
        <Layoutconnected />
        }>
      </Route> */}
          </Routes>
        </AuthProvider>

      </BrowserRouter>
    </UserTypeProvider>

  );
}

export default App;
