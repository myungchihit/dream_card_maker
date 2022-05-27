import React, { useCallback, useEffect, useState } from 'react';
import styles from './maker.module.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput, authService , cardRepository }) => {

    const location = useLocation();
    // 배열이 아니라 Object로 데이터를 저장
    // id가 key값으로 저장시킬것 --> 배열로 map을 쓰는경우 배열이 늘어날때마다 성능이 저하된다.
    // Object.keys로 배열 만들고 arr[id] 이런식으로 검색하려고
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(location && location.id);

    const navigate = useNavigate();

    // onLogout은 Maker의 지역변수이기 때문에 Maker가 변경이 될때마다
    // header가 계속 랜더링된다. 때문에 useCallback을 사용함.
    // [authService]를 지정하지 않으면 예전의 authService가 남아있기 때문에
    // onLogout 안에서 authService를 사용하기때문에 authService가 변경될때마다 업데이트 되게끔 만들어준다.
    const onLogout = useCallback(() => {
        authService.logout();
    }, [authService]);
    
    // useEffect는 사용별로 여러개 만들 수 있음.
    // firebase에서 데이터 조회
    // syncCards 콜백함수를 받는다.
    useEffect(() => {
        if(!userId){
            return;
        }
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCards(cards);
        });
        return () => stopSync();
    }, [userId , cardRepository]);

    // 로그인 관련 useEffect
    // logout이 자동으로 되게끔
    useEffect(() => {
        authService.onAuthChange(user => {
            if(user){
               setUserId(user.uid); 
            }
            else{
                navigate("/");
            }
        });
    }, [authService, navigate]);

    const createOrUpdateCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
        // DB에 추가
        cardRepository.saveCard(userId, card);
    };
    
    const deleteCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId, card);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards} FileInput={FileInput}
                    addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    )
};

export default Maker;