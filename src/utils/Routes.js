const HOME = '/';

// Account
const SIGNUP_USER = '/signupterm/user';
const SIGNUP_DRIVER = '/signupterm/driver';
const SIGNUP_COMPANY = '/signupterm/company';

const SIGNUPTERM_USER = '/signupterm/user';
const SIGNUPTERM_DRIVER = '/signupterm/driver';
const SIGNUPTERM_COMPANY = '/signupterm/company';

const SIGNUPDONE_USER = '/signupdone/user';
const SIGNUPDONE_DRIVER = '/signupdone/driver';
const SIGNUPDONE_COMPANY = '/signupdone/company';

const LOGIN_USER = "/login/user";
const LOGIN_DRIVER = "/login/driver";
const LOGIN_COMPANY = "/login/company";

const RECOVERY_ID = '/recovery/id';
const RECOVERY_PASSWORD = '/recovery/password';

// Estimate
const ESTIMATE_LIST = '/estimate/list';
const ESTIMATE_CREATE = '/estimate/create/:id';
const ESTIMATE_WAITING = '/estimate/waiting';
const ESTIMATE_DETAIL = '/estimate/:id'
const ESTIMATE_SELECTED = '/estimate/selected'
const ESTIMATE_CHECKOUT = '/estimate/checkout'
const ESTIMATE_DONE = '/estimate/done'




const routes = {
    home: HOME,
    signupUser: SIGNUP_USER,
    signupDriver: SIGNUP_DRIVER,
    signupCompany: SIGNUP_COMPANY,
    signupTermUser: SIGNUPTERM_USER,
    signupTermDriver: SIGNUPTERM_DRIVER,
    signupTermCompany: SIGNUPTERM_COMPANY,
    signupDoneUser: SIGNUPDONE_USER,
    signupDoneDriver: SIGNUPDONE_DRIVER,
    signupDoneCompany: SIGNUPDONE_COMPANY,

    loginUser: LOGIN_USER,
    loginDriver: LOGIN_DRIVER,
    loginCompany: LOGIN_COMPANY,

    recoveryId: RECOVERY_ID,
    recoveryPw: RECOVERY_PASSWORD,

    estimateList: ESTIMATE_LIST,
    estimateCreate: (id) => {
        // return id ? `/estimate/create/${id}` : ESTIMATE_CREATE
        if(id){
            return `/estimate/create/${id}`;
        } 
        // else 부분 없으니까 견적 리스트에서 견적 등록 눌렀을때 아무것도 안뜸, 이유는 모름
        else{
            return ESTIMATE_CREATE;
        }
    },
    estimateWaiting: ESTIMATE_WAITING,
    estimateDetail: (id) => {
        if(id){
            return `/estimate/${id}`;
        }
        else{
            return ESTIMATE_DETAIL;
        }
    },
    estimateSelected: ESTIMATE_SELECTED,
    estimateCheckout: ESTIMATE_CHECKOUT,
    estimateDone: ESTIMATE_DONE
}

export default routes;