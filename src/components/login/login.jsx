import React, { useEffect } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';  // 버전 6이하

const Login = ({ authService }) => {
    const navigate = useNavigate(); // 버전 6이하에서는 useHistory()
    // 로그인 화면에서 maker로 이동하기 위함
    const goToMaker = userId => {
        navigate('/maker', {state: {id: userId}});
    }

    const onLogin = event => {
        authService
            .login(event.currentTarget.textContent)
            .then(data => goToMaker(data.user.uid));
    };

    // 컴포넌트가 마운트 되었을때 (랜더링 되었을때)
    useEffect(() => {
        authService.onAuthChange(user => {  // 파이어베이스 함수임 사용자가 있으면 사용자 정보, 없으면 null 반환
            user && goToMaker(user.uid);
        });
    });

    return (
        <section>
            <Header />
                <section className={styles.login}>
                    <h1>Login</h1>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <button className={styles.button} onClick={onLogin}>Google</button>
                        </li>
                        <li className={styles.item}>
                            <button className={styles.button} onClick={onLogin}>Github</button>
                        </li>
                    </ul>
                </section>
            <Footer />
        </section>
    );
};

export default Login;