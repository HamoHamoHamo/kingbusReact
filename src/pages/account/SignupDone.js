import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SignupDone.module.css";

export function SignupDone() {
    const { pathname } = useLocation();
    console.log("PATHNAME", pathname);
    let str = '';
    let type = '';
    if (pathname === '/signupdone/user') {
        str = '승객';
        type = 'user';
    }
    else if (pathname === '/signupdone/driver') {
        str = '기사';
        type = 'driver';
    }
    else if (pathname === '/signupdone/company') {
        str = '회사';
        type = 'company';
    }
    return (
        <div className={styles.signupForm}>
            <div className={styles.signupHeader}>
                <div className={styles.signupHeaderTitle}>{str} 회원가입</div>
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

            <a href={`/login/${type}`}>
                <div className={styles.signupBtn}>
                    로그인하기
                </div>
            </a>

        </div>
    )
}

