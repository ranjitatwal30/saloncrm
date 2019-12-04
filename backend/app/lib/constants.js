const statusCode = {
  ok: 200,
  unauth: 401,
  notFound: 404,
  validation: 400,
  failed: 1002,
  invalidURL: 1001,
  paymentReq: 402,
  internalError: 1004,
  forbidden: 403,
  internalservererror: 500,
  alreadyExist: 409 //conflict
};
const messages = {
  commonError: "Something went wrong",
  roleAlreadyExist: "Role already exist",
  roleAddSuccess: "Role added successfully",
  roleUpdateSuccess: "Role updated successfully",
  roleNotAdded: "Role cannot be added",
  roleNameEmpty: "Role name cannot be empty",
  roleAlreadyDeleted: "Role is either deleted or not found",
  roleDeleteSuccess: "Role is successfully deleted",
  roleListing: "Roles list has been successfully fetched",
  roleDetails: "Role details has been successfully fetched",
  permissionAssigned: "Permission has been successfully assigned",
  loginSuccess: "Logged in successfully",
  signupSuccess:
    "Signup successfully, please check you email to activate your account",
  loginOut: "Logout successfully",
  Registration: "You have successfully registered",
  emailAlreadyExist: "Email already exist",
  notificationListFetchSuccess: "Notifiation List fetched successfully",
  notificationObjectUpdated: "Notifiation object updated successfully",
  requestAccepted: "Request accepted successfully",
  newAndoldPwdNotMatch: "Password not match",
  forgotPasswordSuccess: "Reset link send to your email",
  createPasswordSuccess: "Password created sucessfully.",
  validUrl: "Valid Url",
  invalidUrl: "Invalid Url",
  lawyerAddedSuccess: "Lawyer added sucessfully",
  addMedicalNegligenceSuccess: "Medical negligence added sucessfully",
  addMedicalNegligenceFailure: "Unable to add medical negligence.",
  medicalNegligenceListSuccess: "Medical negligence list fetched sucessfully",
  lawyerListSuccess: "Lawyer list fetched sucessfully",
  lawyerDeleteSuccess: "Lawyer deleted sucessfully",
  patientDeleteSuccess: "Patient deleted sucessfully",
  userDetailsFetchedSuccessfully: "User details fetched sucessfully",
  profileUpdateSuccess: "Profile updated sucessfully",
  lawyerDetailsUpdatedSucess: "Lawyer details updated sucessfully",
  specialistProfileUpdatedSucess: "Profile details updated sucessfully",
  multiLocationUpdatedSuccess: "Locations updated sucessfully",
  patientDetailsAddSucess: "Patient added sucessfully",
  patientDetailsUpdatedSucess: "Patient details updated sucessfully",
  patientDeleted: "Patient is deleted.",
  lawyerDeleted: "lawyer is deleted.",
  lawyerActivatedSucess: "User activated sucessfully",
  lawyerDeActivatedSucess: "User deactivated sucessfully",
  reportActivatedSucess: "Report activated sucessfully",
  reportDeActivatedSucess: "Report deactivated sucessfully",
  clinicAddSuccess: "Clinic added sucessfully",
  caseActivatedSucess: "Case activated sucessfully",
  caseDeActivatedSucess: "Case deactivated sucessfully",
  userNotFound: "User not found",
  userDeleteSuccess: "User deleted sucessfully",
  reportDeleteSuccess: "Report deleted sucessfully",
  addSpecialistLocationSuccess: "Specialist location added successfully",
  specialistAddedSuccess: "Specialist added sucessfully",
  listSpecialistLocationsSuccess: "Specialist locations fetched successfully",
  specialistLocationDeleteLocation: "Specialist location deleted successfully",
  specialistDelete: "Specialist deleted successfully",
  countryNStateNotSame: "Entered country and state are not same as previous",
  ActivatedSucess: "Status activated successfully.",
  DeActivatedSucess: "Status de-activated successfully.",
  specialistList: "Specialist list fetched successfully.",
  specialistAvailabilityListSuccess:
    "Specialist Availability listed successfully",
  setSpecialistAvailabilitySuccess: "Availability set successfully",
  documentUploadedSucess: "Document uploaded sucessfully",
  folderCreatedSucess: "Folder created sucessfully",
  documentListFetched: "Document list fetched successfully",
  fileCreatedSucess: "File created sucessfully",

  lawyerDetailsFetched: "Lawyers details fetched successfully",
  lawfirmsList: "Lawfirms list fetched successfully",
  lawfirmDetailsFetched: "Lawfirms details fetched successfully",
  lawfirmEditSuccess: "Lawfirm updated successfully",
  lawfirmDeleteSuccess: "Lawfirm deleted successfully",
  lawfirmAddSuccess: "Lawfirm added successfully",
  registration_user: "User name is required.",
  registration_email: "Email  is required.",
  registration_password: "Password  is required.",
  registration_firm_number: "Firm number  is required.",
  registration_sign_up: "Sign up type  is required.",
  first_name: "First name is required",
  last_name: "Last name is required",
  city: "City is required",
  state: "State is required",
  zip: "Zipcode is required",
  address: "Address is required",
  phone: "Phone number is required",
  patientListFetched: "Patient list fetched successfully",
  patientDetailsFetched: "Patient details fetched successfully",
  patientStatusChangeSuccess: "Patient's status updated successfully",
  specialistEditSuccess: "Specialist Updated Successfully",
  specialistDocumentDeleteSuccess: "Specialist document deleted successfully",
  nodeIdUpdateSuccess: "Node id updated successfully",
  otpsendsuccessfully: "OTP has been sent successfully",
  failedtosendotp: "Failed to send OTP",
  fetchedcountrycodes: "country codes fetched successfully",
  userAlreadyExist: "User already exist",
  userIsVerified: "User verified successfully",
  failedToAddUser: "Failed to register user",
  userAddedSuccessfully: "User registered successfully"
};
const location_msg = {
  clinic_name: "Clinic name is required",
  address: "Address is required ",
  city: "City is required ",
  state: "State is required ",
  country: "Country is required ",
  zipcode: "Zipcode is required"
};
const skills_message = {
  skill_name: "Skill name is required",
  skill_added_successfully: "Skill added successfully.",
  skill_list_success: "Skills list fetched successfully.",
  skill_updated_successfully: "Skill updated successfully",
  status_updated: "Skill status updated successfully.",
  status_deleted: "Skill deleted successfully.",
  already_exist: "Skill already exist.please try another.",
  skillActivatedSucess: "Speciality activated sucessfully",
  skillDeActivatedSucess: "Speciality deactivated sucessfully"
};
const casetype_message = {
  casetype_name: "caseType is required",
  casetype_code: "Code is required",
  casetype_duration: "Duration is required",
  casetype_pricing: "Price is required ",
  casetype_review_report_pricing: "Review report price is required",
  casetype_added_successfully: "caseType added successfully.",
  casetype_list_success: "caseType list fetched successfully.",
  casetype_updated_successfully: "caseType updated successfully",
  casetype_status_updated: "caseType status updated successfully.",
  casetype_status_deleted: "caseType deleted successfully.",
  casetypeAlreadyExist: "caseType already exist",
  ActivatedSucess: "Status activated successfully.",
  DeActivatedSucess: "Status de-activated successfully."
};
const role_message = {
  role_name: "Role is required",
  role_added_successfully: "Role added successfully.",
  role_list_success: "Role list fetched successfully.",
  role_updated_successfully: "Role updated successfully",
  role_status_updated: "Role status updated successfully.",
  role_status_deleted: "Role deleted successfully.",
  roleAlreadyExist: "Role already exist"
};
const ic_message = {
  ic_list_success: "Role list fetched successfully."
};
const amaQua_message = {
  ama_name: "Accreditation is required",
  ama_added_successfully: "Accreditation added successfully.",
  ama_list_success: "Accreditation list fetched successfully.",
  ama_updated_successfully: "Accreditation updated successfully",
  ama_status_updated: "Accreditation status updated successfully.",
  ama_status_deleted: "Accreditation deleted successfully.",
  qualificationAlreadyExist: "Accreditation already exist",
  ActivatedSucess: "Accreditation activated successfully.",
  DeActivatedSucess: "Accreditation de-activated successfully."
};
const caseState_message = {
  caseState_name: "caseState is required",
  caseState_added_successfully: "caseState added successfully.",
  caseState_list_success: "caseState list fetched successfully.",
  caseState_updated_successfully: "caseState updated successfully",
  caseState_status_updated: "caseState status updated successfully.",
  caseState_status_deleted: "caseState deleted successfully.",
  caseStateAlreadyExist: "caseState already exist",
  ActivatedSucess: "Status activated successfully",
  DeActivatedSucess: "Deactivated successfully."
};
const resetPassword_message = {
  key_password_required: "Reset key or password is missing.",
  reset_token_expire:
    "Reset password token expires! Regenerate token to set password",
  password_reset_success: "Password reset successfully.Please try to login."
};
const validateMsg = {
  notSupportedType: "Format not supported",
  generalValidationMessage: "There are one or more validation errors.",
  emailAlreadyExist: "Email Id already exist, try with another",
  passwordDoNotUseSame: "New password should not be same as old password",
  //Account
  accountIsNotActive: "Your account is not actived",
  //User
  userIdRequired: "User Id is required",
  usernameAlreadyExist: "Username already exist, try with another",
  emailRequired: "Email is required",
  firstnameRequired: "First name is required",
  passwordRequired: "Password is required",
  deviceTypeRequired: "Device type is required",
  deviceIdRequired: "Device id is required",
  deviceTokenRequired: "Device token is required",
  invalidEmail: "Invalid Email Given",
  invalidEmailOrPassword: "Invalid email or password",
  internalError: "Internal error",
  requiredFieldsMissing: "Required fields missing",
  emailNotExist: "Email doesn't exist",
  userNotFound: "User not found",
  passwordNotMatch: "New password should not be same as old password",
  invalidDeviceType: "Invalid device type, It should be Android or iOS",
  noRecordFound: "No record found",
  noSlotFound: "No slot found",
  invalidMongoId: "Invalid Id",
  invalidProviderId: "Invalid Provider Id",
  emailNotSent: "Email not Sent",
  invalidUserNameOrPwd: "Invalid user name or password",
  notificationNotSent: "Notification not sent",
  invalidOldPassword: "Invalid old password",
  clinicDataSuccess: "Clinic list fetched sucessfully",
  clinicUpdateSuccess: "Clinic data is updated successfully"
};
const country_message = {
  country_name: "Country name is required",
  country_code: "Country code is required",
  country_added_successfully: "Country added successfully.",
  country_list_success: "Country list fetched successfully.",
  country_updated_successfully: "Country updated successfully",
  status_updated: "Country status updated successfully.",
  status_deleted: "Country deleted successfully.",
  countryDetailsSuccess: "Country details fetched succesfully",
  ActivatedSucess: "Status activated succesfully",
  DeActivatedSucess: "Status de-activated succesfully"
};
const state_message = {
  state_name: "State name is required",
  state_code: "State code is required",
  country_id: "Country is required",
  state_added_successfully: "State added successfully.",
  state_list_success: "State list fetched successfully.",
  state_updated_successfully: "State updated successfully",
  status_updated: "State status updated successfully.",
  status_deleted: "State deleted successfully.",
  stateDetailsSuccess: "State details fetched succesfully",
  ActivatedSucess: "Status activated succesfully",
  DeActivatedSucess: "Status de-activated succesfully"
};
const specialRqmt_message = {
  reqt_name: "Special requirement name is required",
  reqt_code: "code is required",
  reqt_added_successfully: "Special requirement added successfully.",
  reqt_list_success: "Special requirement list fetched successfully.",
  reqt_updated_successfully: "Special requirement updated successfully",
  status_updated: "Special requirement status updated successfully.",
  status_deleted: "Special requirement deleted successfully.",
  reqtAlreadyExist: "Special requirement already exist"
};
const case_message = {
  patient_name: "Client name is required",
  patient_id: "Patient Id name is required",
  patient_last_name: " Client last name is required",
  patient_email: "Email is required",
  gender: "Gender is required",
  phone: "Phone number is required",
  zipcode: "zip code is required",
  city: "City is required",
  state: "State is required",
  country: "Country is required",
  dob: "Date of birth is required",
  doi: "Date of injury is required",
  caseState: "Case state is required",
  selectedType: "Case type is required",
  case_officer: "Case officer is required",
  case_reference: "Case reference is required",
  lawyer_ref_no: "Lawyer reference number is required",
  address: "Address is required",
  additional_notes: "Additional notes is required",
  insurance_company: "Insurance company is required",
  ref_number: "Legal reference number is required",
  case_manager_info: "Case manager is required",
  case_details: "Case detail is required",
  case_added_successfully: "Case registered successfully",
  case_list_success: "Case list fetched successfully.",
  client_AlreadyExist:
    "Client with this email is  already exist.Please try another.",
  patientAlreadyExist:
    "Patient with this email already exist. Please try another.",
  not_found: "Case not found",
  caseActivatedSucess: "Case activated sucessfully",
  caseDeActivatedSucess: "Case deactivated sucessfully"
};
const patient_message = {
  patient_name: "Patient name is required",
  patient_id: "Patient Id name is required",
  patient_last_name: " Patient last name is required",
  patient_email: "Email is required",
  gender: "Gender is required",
  phone: "Phone number is required",
  zipcode: "zip code is required",
  city: "City is required",
  state: "State is required",
  country: "Country is required",
  dob: "Date of birth is required",
  doi: "Date of injury is required",
  state: "State is required",
  not_found: "Case not found",
  address: "Address is required"
};

const casemanager_message = {
  casemanager_list_success: "Case manager list fetched successfully"
};
const emailKeyword = {
  registration: "registration",
  notification_to_admin_for_new_registration:
    "notification_to_admin_for_new_registration",
  reg_confirmation_user: "reg_confirmation_user",
  lawyer_casemanager_registered: "lawyer_casemanager_registered",
  forgotPassword: "forgot_password",
  forgot_password_app: "forgot_password_app",
  assignsurvey: "assignsurvey",
  confirmation: "confirmation",
  deactivation: "deactivation",
  contactus: "contactus",
  addUser: "addUser"
};

const adminDetails = {
  email: "medicolegal@yopmail.com",
  _id: "5d652a3d85cad733861602ff"
};
const notificationType = {
  registration: "registration",
  request: "request",
  payement: "payement",
  any: "any"
};
const contentNotification = {
  getNewContentNotification: `\nWelcome to MDout ! \n Thanks so much for joining our communication and information portal platform. You will now be able to get notification of newly uploaded contents by us, receive important and informative emails. Please click below link to check our newly uploaded content. You are one click away... \n\n`
};

const emailSubjects = {
  verify_email: "Welcome to the Case Management - Verify your email address ",
  forgotPassword: "Case Management - Forgot password"
};
const admin = {
  ID: "5bf2a8a328b76a524bfb0048"
};
const notify = {
  caseMgmtTitle: "Case-Mgmt",
  messageSent: "sent you a message"
};
const cryptoConfig = {
  cryptoAlgorithm: "aes-256-ctr",
  cryptoPassword: "d6F3Efeq",
  secret: "Medicolegal2019"
};
const userTypes = {
  admin: "Admin",
  lawFirm: "Law firms",
  insuranceCompany: "Insurance company",
  lawyer: "Lawyer",
  caseManager: "Case manager",
  specialist: "Specialist",
  patient: "Patient"
};
const varibleType = {
  FORGET_PASSWORD: "Forget Password",
  LAW_FIRMS: "Law firms",
  MSG_LAW_FIRM: "Lawfirm",
  INSURANCE_COMPANY: "Insurance company",
  MSG_INSURANCE_COMPANY: "Insurance company",
  LAWYER: "Lawyer",
  CASEMANAGER: "Case manager",
  SPECIALIST: "Specialist",
  PATIENT: "Patient",
  FORGET_PASSWORD: "Forget Password",
  LAW_FIRMS: "Law firms",
  MSG_LAW_FIRM: "Lawfirm",
  INSURANCE_COMPANY: "Insurance company",
  MSG_INSURANCE_COMPANY: " Insurance company",
  LAWYER: "Lawyer",
  CASEMANAGER: "Case manager",
  SPECIALIST: "Specialist",
  PATIENT: "Patient"
};
const directoryPath = {
  PROFILEIMAGE: "../backend/app/uploads/profileImages/",
  NEGLIGENCEUPLOADPATH: "../backend/app/uploads/Documents/negligence/",
  EXTENSIONS: ["docx", "doc", "pdf", "xls", "xlsx"],
  ALLOWED: "docx, doc, pdf, xls,xlsx"
};
const obj = {
  cryptoConfig: cryptoConfig,
  statusCode: statusCode,
  messages: messages,
  validateMsg: validateMsg,
  emailKeyword: emailKeyword,
  emailSubjects: emailSubjects,
  notify: notify,
  admin: admin,
  contentNotification: contentNotification,
  UserTypes: userTypes,
  skills_message: skills_message,
  casetype_message: casetype_message,
  role_message: role_message,
  amaQua_message: amaQua_message,
  caseState_message: caseState_message,
  resetPassword_message: resetPassword_message,
  adminDetails: adminDetails,
  notificationType: notificationType,
  country_message: country_message,
  state_message: state_message,
  specialRqmt_message: specialRqmt_message,
  case_message: case_message,
  ic_message: ic_message,
  casemanager_message: casemanager_message,
  varibleType: varibleType,
  directoryPath: directoryPath,
  location_msg: location_msg,
  patient_message: patient_message
};
module.exports = obj;
