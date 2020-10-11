// AUTH
export const USER_LOADED = 'USER_LOADED';
// export const ALL_USERS_LOADED = 'ALL_USERS_LOADED';
export const SET_AUTH_USER_LOADING = 'SET_AUTH_USER_LOADING';
export const UNSET_AUTH_USER_LOADING = 'UNSET_AUTH_USER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const NAME_UPDATED = 'NAME_UPDATED';
export const PASSWORD_UPDATED = 'PASSWORD_UPDATED';
export const PROFILE_PICTURE_UPLOADED = 'PROFILE_PICTURE_UPLOADED';
export const PROFILE_PICTURE_REMOVED = 'PROFILE_PICTURE_REMOVED';

// ALERT
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

// ADMISSIONS
export const ALL_ADMISSION_SESSIONS_LOADED = 'ALL_ADMISSION_SESSIONS_LOADED';
export const ADMISSION_SESSION_CREATED = 'ADMISSION_SESSION_CREATED';
export const ADMISSION_SESSION_UPDATED = 'ADMISSION_SESSION_UPDATED';
export const ADMISSION_SESSION_ERROR = 'ADMISSION_SESSION_ERROR';
export const ADMISSION_SESSION_ENABLED = 'ADMISSION_SESSION_ENABLED';
export const ADMISSION_SESSION_DISABLED = 'ADMISSION_SESSION_DISABLED';
export const ADMISSION_SESSION_LOADING = 'ADMISSION_SESSION_LOADING';
export const ADMISSION_SESSION_LOADED = 'ADMISSION_SESSION_LOADED';
export const ADMISSION_SESSION_REMOVED = 'ADMISSION_SESSION_REMOVED';

// DEPARTMENTS
export const ALL_DEPARTMENTS_LOADED = 'ALL_DEPARTMENTS_LOADED';
export const DEPARTMENT_LOADED = 'DEPARTMENT_LOADED';
export const DEPARTMENT_CREATED = 'DEPARTMENT_CREATED';
export const DEPARTMENT_UPDATED = 'DEPARTMENT_UPDATED';
export const DEPARTMENT_ERROR = 'DEPARTMENT_ERROR';

// PROGRAMS
export const PROGRAM_LOADED = 'PROGRAM_LOADED';
export const PROGRAM_ERROR = 'PROGRAM_ERROR';
export const REMOVE_PROGRAM = 'REMOVE_PROGRAM';

// UNDERGRADUATE_PROGRAMS
export const ALL_UNDERGRADUATE_PROGRAMS_LOADED =
  'ALL_UNDERGRADUATE_PROGRAMS_LOADED';
export const UNDERGRADUATE_PROGRAM_CREATED = 'UNDERGRADUATE_PROGRAM_CREATED';
export const UNDERGRADUATE_PROGRAM_UPDATED = 'UNDERGRADUATE_PROGRAM_UPDATED';
export const SET_UNDERGRADUATE_PROGRAM_LOADING =
  'SET_UNDERGRADUATE_PROGRAM_LOADING';
export const UNDERGRADUATE_PROGRAM_ENABLED = 'UNDERGRADUATE_PROGRAM_ENABLED';
export const UNDERGRADUATE_PROGRAM_DISABLED = 'UNDERGRADUATE_PROGRAM_DISABLED';
export const ALL_UNDERGRADUATE_PROGRAMS_DISABLED =
  'ALL_UNDERGRADUATE_PROGRAMS_DISABLED';

// GRADUATE_PROGRAMS
export const ALL_GRADUATE_PROGRAMS_LOADED = 'ALL_GRADUATE_PROGRAMS_LOADED';
export const GRADUATE_PROGRAM_CREATED = 'GRADUATE_PROGRAM_CREATED';
export const GRADUATE_PROGRAM_UPDATED = 'GRADUATE_PROGRAM_UPDATED';
export const SET_GRADUATE_PROGRAM_LOADING = 'SET_GRADUATE_PROGRAM_LOADING';
export const GRADUATE_PROGRAM_ENABLED = 'GRADUATE_PROGRAM_ENABLED';
export const GRADUATE_PROGRAM_DISABLED = 'GRADUATE_PROGRAM_DISABLED';

// PROFILES

// ADMIN_PROFILE_DETAILS
export const SET_ADMIN_PROFILE_LOADING = 'SET_ADMIN_PROFILE_LOADING';
export const ADMIN_PROFILE_LOADED = 'ADMIN_PROFILE_LOADED';
export const ADMIN_PROFILES_LOADED = 'ADMIN_PROFILES_LOADED';
export const UPDATE_ADMIN_PERSONAL_DETAILS = 'UPDATE_ADMIN_PERSONAL_MY_DETAILS';
export const UPDATE_ADMIN_EXPERIENCE_DETAILS =
  'UPDATE_ADMIN_EXPERIENCE_DETAILS';
export const UPDATE_ADMIN_EDUCATION_DETAILS = 'UPDATE_ADMIN_EDUCATION_DETAILS';
export const ADMIN_PROFILE_ERROR = 'ADMIN_PROFILE_ERROR';
export const CLEAR_ADMIN_PROFILE = 'CLEAR_ADMIN_PROFILE';

// COORDINATOR_PROFILE_DETAILS
export const SET_COORDINATOR_PROFILE_LOADING =
  'SET_COORDINATOR_PROFILE_LOADING';
export const COORDINATOR_PROFILE_LOADED = 'COORDINATOR_PROFILE_LOADED';
export const COORDINATOR_PROFILES_LOADED = 'COORDINATOR_PROFILES_LOADED';
export const UPDATE_COORDINATOR_PERSONAL_DETAILS =
  'UPDATE_COORDINATOR_PERSONAL_MY_DETAILS';
export const UPDATE_COORDINATOR_EXPERIENCE_DETAILS =
  'UPDATE_COORDINATOR_EXPERIENCE_DETAILS';
export const UPDATE_COORDINATOR_EDUCATION_DETAILS =
  'UPDATE_COORDINATOR_EDUCATION_DETAILS';
export const COORDINATOR_PROFILE_ERROR = 'COORDINATOR_PROFILE_ERROR';
export const CLEAR_COORDINATOR_PROFILE = 'CLEAR_COORDINATOR_PROFILE';

// COORDINATOR
export const ALL_COORDINATORS_LOADED = 'ALL_COORDINATORS_LOADED';
export const COORDINATOR_LOADED = 'COORDINATOR_LOADED';
export const REGISTER_COORDINATOR_SUCCESS = 'REGISTER_COORDINATOR_SUCCESS';
export const REGISTER_COORDINATOR_FAILED = 'REGISTER_COORDINATOR_FAILED';
export const COORDINATORS_ERROR = 'COORDINATOR_ERROR';
export const COORDINATOR_NAME_UPDATED = 'COORDINATOR_NAME_UPDATED';
export const COORDINATOR_PASSWORD_UPDATED = 'COORDINATOR_PASSWORD_UPDATED';
export const COORDINATOR_PROFILE_PICTURE_UPDATED =
  'COORDINATOR_PROFILE_PICTURE_UPDATED';
export const COORDINATOR_PROFILE_PICTURE_REMOVED =
  'COORDINATOR_PROFILE_PICTURE_REMOVED';
export const SET_AUTH_COORDINATOR_LOADING = 'SET_AUTH_COORDINATOR_LOADING';
export const UNSET_AUTH_COORDINATOR_LOADING = 'UNSET_AUTH_COORDINATOR_LOADING';
export const DELETE_COORDINATOR_ACCOUNT = 'DELETE_COORDINATOR_ACCOUNT';

// APPLICANTS
export const APPLICANT_LOADED = 'APPLICANT_LOADED';
export const APPLICANT_ERROR = 'APPLICANT_ERROR';
export const APPLICANT_PROGRAM_APPLIED = 'APPLICANT_PROGRAM_APPLIED';
export const APPLICANT_PROGRAM_REMOVED = 'APPLICANT_PROGRAM_REMOVED';
export const APPLICANT_FORWARDED = 'APPLICANT_FORWARDED';
export const APPLICANT_FORWARDED_LOADED = 'APPLICANT_FORWARDED_LOADED';
export const SET_APPLICANT_LOADING = 'SET_APPLICANT_LOADING';
export const APPLICANT_TEST_SCORE_ADDED = 'APPLICANT_TEST_SCORE_ADDED';

// UNDERGRADUATE_APPLICANTS
export const ALL_UNDERGRADUATE_APPLICANT_LOADED =
  'ALL_UNDERGRADUATE_APPLICANT_LOADED';
export const UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED =
  'UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED';
export const UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED =
  'UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED';
export const UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED =
  'UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED';
export const UNDERGRADUATE_PROGRAM_APPLIED = 'UNDERGRADUATE_PROGRAM_APPLIED';
export const UNDERGRADUATE_AGGREGATE_CALCULATED =
  'UNDERGRADUATE_AGGREGATE_CALCULATED';
export const UNDERGRADUATE_APPLICATION_FORWARDED =
  'UNDERGRADUATE_APPLICATION_FORWARDED';

// GRADUATE_APPLICANTS
export const ALL_GRADUATE_APPLICANT_LOADED = 'ALL_GRADUATE_APPLICANT_LOADED';
export const GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED =
  'GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED';
export const GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED =
  'GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED';
export const GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED =
  'GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED';
export const GRADUATE_APPLICANT_NTS_MARKS_UPDATED =
  'GRADUATE_APPLICANT_NTS_MARKS_UPDATED';
export const GRADUATE_PROGRAM_APPLIED = 'GRADUATE_PROGRAM_APPLIED';
