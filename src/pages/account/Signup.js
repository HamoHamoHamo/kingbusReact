import React, { useRef, useState } from "react";
import styles from './Signup.module.css';
import { Api, IP } from "../../utils/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignupUser() {
    const name = useRef();
    const email = useRef();
    const com = useRef();
    

    
    function Middle() {
        
        return (
            <>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>이름</div>
                    <div className={styles.dataInputCell + " " + styles.fit}>
                        <input required ref={name} name="name" type="text" className={styles.dataInput} placeholder="이름을 입력해 주세요." />
                    </div>
                </div>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>이메일</div>
                    <div className={styles.dataInputCell + " " + styles.fit}>
                        <input required ref={email} name="email" type="text" className={styles.dataInputEmail} placeholder="이메일을 입력해 주세요." />
                        <span>@ </span>
                        <select ref={com} name="com" id="" className={styles.dataInputSelect}>
                            <option name="com" value="naver.com">naver.com</option>
                            <option name="com" value="daum.com">daum.com</option>
                            <option name="com" value="nate.com">nate.com</option>
                            <option name="com" value="gmail.com">gmail.com</option>
                            <option name="com" value="kakao.com">kakao.com</option>
                        </select>
                    </div>
                </div>
            </>
        )
    }
    return (
        <Signup 
            Middle={Middle} 
            type={'user'} 
            str={'승객'} 
            name={name}
            email={email}
            com={com}
        ></Signup>
    )
}

export function SignupDriver() {
    const name = useRef();
    const email = useRef();
    const com = useRef();
    const company = useRef();
    const file = useRef();
    const fileName = useRef();

    function Middle() {
        const onChangeFile = () => {
            console.log("FILE", file.current.files[0])
            console.log("FILENAME", file.current.files[0].name)
            fileName.current.value = file.current.files[0].name;
        }
        return (
            <>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>이름</div>
                    <div className={styles.dataInputCell + " " + styles.fit}>
                        <input ref={name} name="name" type="text" className={styles.dataInput} placeholder="이름을 입력해 주세요." />
                    </div>
                </div>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>이메일</div>
                    <div className={styles.dataInputCell + " " + styles.fit}>
                        <input required ref={email} name="email" type="text" className={styles.dataInputEmail} placeholder="이메일을 입력해 주세요." />
                        <span>@ </span>
                        <select ref={com} name="com" id="" className={styles.dataInputSelect}>
                            <option name="com" value="naver.com">naver.com</option>
                            <option name="com" value="daum.com">daum.com</option>
                            <option name="com" value="nate.com">nate.com</option>
                            <option name="com" value="gmail.com">gmail.com</option>
                            <option name="com" value="kakao.com">kakao.com</option>
                        </select>
                    </div>
                </div>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>회사명</div>
                    <div className={styles.dataInputCell + " " + styles.fit}>
                        <input ref={company} name="driver_com_name" type="text" className={styles.dataInput} placeholder="회사명을 입력해 주세요." />
                    </div>
                </div>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>버스운전 자격증</div>
                    <div className={styles.dataInputCell}>
                        <input ref={fileName} type="text" className={styles.dataInput + " " + styles.dataInputFileText} placeholder="첨부파일" readOnly />
                        <input onChange={onChangeFile} name="driver_car_driverlicense" ref={file} type="file" className={styles.dataInput + " " + styles.dataInputFile} id="dataInputFile" />
                    </div>
                    <div className={styles.dataInputBtnCell}>
                        <label for="dataInputFile" className={styles.dataInputBtn + " " + styles.dataInputBtnGrey}>파일선택</label>
                    </div>
                </div>
            </>
        )
    }
    return (
        <Signup Middle={Middle}
        type={'driver'}
        str={'기사'}
        name={name}
        email={email}
        com={com}
        company={company}
        file={file}
        >
        </Signup>
    )
}

export function SignupCompany() {
    const name = useRef();
    const email = useRef();
    const com = useRef();
    const company = useRef();
    const file = useRef();
    const fileName = useRef();

    const middleDatas = {
        name: name.current != undefined ? name.current.value : '',
        email: email.current != undefined ? `${email.current.value}@${com.current.value}` : '',
        driver_com_name: company.current != undefined ? company.current.value : '',
        driver_car_driverlicense: file.current != undefined ? file.current.value : '',
    }

    function Middle() {
        const onChangeFile = () => {
            console.log("FILE", file.current.files[0])
            console.log("FILENAME", file.current.files[0].name)
            fileName.current.value = file.current.files[0].name;
        }
        return (
            <>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>회사명</div>
                    <div className={styles.dataInputCell + " " + styles.fit}>
                        <input ref={company} name="company_com_name" type="text" className={styles.dataInput} placeholder="회사명을 입력해 주세요." />
                    </div>
                </div>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>담당자 이름</div>
                    <div className={styles.dataInputCell + " " + styles.fit}>
                        <input ref={name} name="name" type="text" className={styles.dataInput} placeholder="담당자 이름을 입력해 주세요." />
                    </div>
                </div>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>담당자 이메일</div>
                    <div className={styles.dataInputCell + " " + styles.fit}>
                        <input required ref={email} name="email" type="text" className={styles.dataInputEmail} placeholder="이메일을 입력해 주세요." />
                        <span>@ </span>
                        <select ref={com} name="com" id="" className={styles.dataInputSelect}>
                            <option name="com" value="naver.com">naver.com</option>
                            <option name="com" value="daum.com">daum.com</option>
                            <option name="com" value="nate.com">nate.com</option>
                            <option name="com" value="gmail.com">gmail.com</option>
                            <option name="com" value="kakao.com">kakao.com</option>
                        </select>
                    </div>
                </div>
                <div className={styles.dataInputBox}>
                    <div className={styles.dataInputName}>사업자 등록증</div>
                    <div className={styles.dataInputCell}>
                        <input ref={fileName} type="text" className={styles.dataInput + " " + styles.dataInputFileText} placeholder="첨부파일" readOnly />
                        <input onChange={onChangeFile} name="driver_car_driverlicense" ref={file} type="file" className={styles.dataInput + " " + styles.dataInputFile} id="dataInputFile" />
                    </div>
                    <div className={styles.dataInputBtnCell}>
                        <label for="dataInputFile" className={styles.dataInputBtn + " " + styles.dataInputBtnGrey}>파일선택</label>
                    </div>
                </div>
            </>
        )
    }
    return (
        <Signup Middle={Middle}
        type={'company'}
        str={'회사'}
        name={name}
        email={email}
        com={com}
        company={company}
        file={file}
        >
        </Signup>
    )
}

export function Signup({ Middle, type, str, name, email, com, company, file }) {
    const username = useRef();
    const password = useRef();
    const password2 = useRef();
    const num = useRef();
    const [check, setCheck] = useState(false);
    let navigate = useNavigate();

    const onClickCheck = async () => {
        setCheck(false);

        if (username.current.value.length < 4) {
            return window.alert('아이디가 너무 짧습니다.');
        }
        console.log("CLICK")
        const url = `${IP}/login?username=${username.current.value}`
        try {
            const response = await axios.get(url)
            if (response.status === 202) {
                window.alert('사용 가능한 아이디입니다');
                setCheck(true);
                password.current.focus();
            }
        }
        catch (err) {
            console.log("ERROR", err.response);
            if (err.response.status === 409) {
                window.alert('이미 사용 중인 아이디입니다.');
            }
            username.current.focus();

        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password.current.value != password2.current.value) {
            return window.alert('비밀번호가 일치하지 않습니다.');
        }
        if(check === false){
            return window.alert('아이디 중복확인을 해주세요.')
        }
        try {
            const url = `${IP}/register/${type}`;
            // var frm = new FormData();
            const inputs = {
                username: username.current.value,
                password: password.current.value,
                num: num.current.value,
            }
            let data = {};
            if(type === 'user') {
                data = {
                    ...inputs,
                    name: name.current.value,
                    email: `${email.current.value}@${com.current.value}`
                };
            }
            else if(type === 'driver') {
                data = {
                    ...inputs,
                    name: name.current.value,
                    email: `${email.current.value}@${com.current.value}`,
                    driver_com_name: company.current.value,
                    driver_car_driverlicense: file.current.files[0]
                };
            }
            else if(type === 'company') {
                data = {
                    ...inputs,
                    name: name.current.value,
                    email: `${email.current.value}@${com.current.value}`,
                    company_com_name: company.current.value,
                    company_business_registration: file.current.files[0]
                };
            }
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                console.log('value', key, value);
                formData.append(key, value);

            })
            console.log("formData", formData);
            
            const result = await axios.post(url, formData)
            console.log("RESULT", result);
            if (result.status === 201) {
                window.alert("SUCCESSSSSSSSSSSSSSSS");
                navigate(`/signupdone/${type}`, { replace: true });
            }
        }
        catch (err) {
            console.log("ERRROR", err);
        }
    };

    return (

        <div className={styles.signupForm}>
            <form method='post' onSubmit={onSubmit}>
                <div className={styles.signupHeader}>
                    <div className={styles.signupHeaderTitle}>{str} 회원가입</div>
                    <div className={styles.signupHeaderLocateBox}>
                        <span className={styles.locateTitle}>정보입력</span>
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

                <div className={styles.signupcontents}>
                    <div className={styles.dataInputBox}>
                        <div className={styles.dataInputName}>아이디</div>
                        <div className={styles.dataInputCell}>
                            <input required ref={username} name="username" type="text" className={styles.dataInput} placeholder="아이디를 입력해 주세요." />
                        </div>
                        <div className={styles.dataInputBtnCell}>
                            <div onClick={onClickCheck} className={styles.dataInputBtn + " " + styles.dataInputBtnRed}>중복확인</div>
                        </div>
                    </div>
                    <div className={styles.dataInputBox}>
                        <div className={styles.dataInputName}>비밀번호</div>
                        <div className={styles.dataInputCell + " " + styles.fit}>
                            <input required ref={password} name="password" type="password" className={styles.dataInput} placeholder="비밀번호를 입력해 주세요." />
                        </div>
                    </div>
                    <div className={styles.dataInputBox}>
                        <div className={styles.dataInputName}>비밀번호 확인</div>
                        <div className={styles.dataInputCell + " " + styles.fit}>
                            <input required ref={password2} name="password2" type="password" className={styles.dataInput} placeholder="비밀번호를 다시 입력해 주세요." />
                        </div>
                    </div>
                    <Middle />
                    <div className={styles.dataInputBoxTwice}>
                        <div className={styles.dataInputName}>연락처</div>
                        <div className={styles.dataInputCell}>
                            <input required ref={num} name="num" type="text" className={styles.dataInput} placeholder="-없이 입력해 주세요." />
                            <input name="check" type="text" className={styles.dataInput + " " + styles.notYat} placeholder="인증번호를 입력해 주세요." readonly />
                            {/* TODO 인증번호 확인되면 넘어가게 해줘야 함 */}
                        </div>
                        <div className={styles.dataInputBtnCell}>
                            <div className={styles.dataInputBtn + " " + styles.dataInputBtnRed}>인증번호 전송</div>
                            <div className={styles.dataInputBtn + " " + styles.dataInputBtnRed}>확인</div>
                        </div>
                    </div>
                </div>
                <input className={styles.signupBtn} type='submit' value='회원가입' />
            </form>


        </div>
    )
}