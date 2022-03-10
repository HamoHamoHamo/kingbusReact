import React from "react";
import './SignupTerm.css';


export function SignupTermUser() {
    
    return (
        <SignupTerm type="user" str={'승객'} />
    )
}

export function SignupTermDriver() {
    
    return (
        <SignupTerm type="driver" str={'기사'} />
    )
}

export function SignupTermCompany() {

    return (
        <SignupTerm type="company" str={'회사'} />
    )
}


function SignupTerm({ str, type }) {
    return (
        <div class="signupForm">
            <div class="signupHeader">
                <div class="signupHeaderTitle">{str} 회원가입</div>
                <div class="signupHeaderLocateBox">
                    <span class="locateTitle">약관동의</span>
                    <div class="signupHeaderNavBox">
                        <div class="signupHeaderNavCell">
                            <span>약관동의</span>
                            <img src="/assets/arrow.png" alt="오른쪽 화살표 아이콘"/>
                        </div>
                        <div class="signupHeaderNavCell">
                            <span>정보입력</span>
                            <img src="/assets/arrow.png" alt="오른쪽 화살표 아이콘"/>
                        </div>
                        <span>가입완료</span>
                    </div>
                </div>
            </div>
            <div class="signupcontents signupcontentsTerms">
                <div class="ckeckingAllTerms">
                    <input type="checkbox" id="allTerms" class="allTerms"/>
                        <label for="allTerms">모든 약관에 동의합니다.</label>
                </div>
                <div class="termsBox">
                    <div class="TermsOfUse"></div>
                    <div class="termsCell">
                        <input type="checkbox" id="TermsOfUse" class="termsCheckbox"/>
                            <label for="TermsOfUse">이용약관에 동의합니다.</label>
                    </div>
                </div>
                <div class="termsBox">
                    <div class="TermsOfUse"></div>
                    <div class="termsCell">
                        <input type="checkbox" id="TermsOfPersonalInformationCollection" class="termsCheckbox"/>
                            <label for="TermsOfPersonalInformationCollection">개인정보 수집 및 이용 약관에 동의합니다.</label>
                    </div>
                </div>
            </div>
            <a href={`/signup/${type}`}>
                <div class="signupBtn">
                    확인
                </div>
            </a>
        </div>
    )

}