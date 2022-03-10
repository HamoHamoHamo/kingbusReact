import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SignupDone.module.css";

export function SignupDone() {
    const { pathname } = useLocation();
    console.log("PATHNAME", pathname);
    let type = '';
    if (pathname === '/signupdone/user') {
        type = '승객';
    }
    else if (pathname === '/signupdone/driver') {
        type = '기사';
    }
    else if (pathname === '/signupdone/company') {
        type = '회사';
    }
    return (
        <div className={styles.signupForm}>
            <div className={styles.signupHeader}>
                <div className={styles.signupHeaderTitle}>{type} 회원가입</div>
                <div className={styles.signupHeaderLocateBox}>
                    <span className={styles.locateTitle}>가입완료</span>
                    <div className={styles.signupHeaderNavBox}>
                        <div className={styles.signupHeaderNavCell}>
                            <span>약관동의</span>
                            <img src="/assets/arrow.png" alt="오른쪽 화살표 아이콘" />
                        </div>
                        <div className={styles.signupHeaderNavCell}>
                            <span>정보입력</span>
                            <img src="/assets/arrow.png" alt="오른쪽 화살표 아이콘" />
                        </div>
                        <span>가입완료</span>
                    </div>
                </div>
            </div>

            <div className={styles.signupcontents + " " + styles.signupcontentsDone}>
                <span>가입이 완료되었습니다.</span>
            </div>

            <a href="../login/passenger.html">
                <div className={styles.signupBtn}>
                    로그인하기
                </div>
            </a>

        </div>
    )
}

