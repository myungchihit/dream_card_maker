import React, { useEffect, useState } from 'react';
import styles from './maker.module.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {

    // 배열이 아니라 Object로 데이터를 저장
    // id가 key값으로 저장시킬것 --> 배열로 map을 쓰는경우 배열이 늘어날때마다 성능이 저하된다.
    // Object.keys로 배열 만들고 arr[id] 이런식으로 검색하려고
    const [cards, setCards] = useState({
        1: {
          id: '1',
          name: 'Ellie',
          company: 'Samsung',
          theme: 'dark',
          title: 'Software Engineer',
          email: 'ellie@gmail.com',
          message: 'go for it',
          fileName: 'ellie',
          fileURL: null,
        },
        2: {
          id: '2',
          name: 'Ellie2',
          company: 'Samsung',
          theme: 'light',
          title: 'Software Engineer',
          email: 'ellie@gmail.com',
          message: 'go for it',
          fileName: 'ellie',
          fileURL: 'ellie.png',
        },
        3: {
          id: '3',
          name: 'Ellie3',
          company: 'Samsung',
          theme: 'colorful',
          title: 'Software Engineer',
          email: 'ellie@gmail.com',
          message: 'go for it',
          fileName: 'ellie',
          fileURL: null,
        },
    });

    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
    }

    // logout이 자동으로 되게끔
    useEffect(() => {
        authService.onAuthChange(user => {
            if(!user){
                navigate("/");
            }
        });
    })

    const createOrUpdateCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
    };
    
    const deleteCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    )
};

export default Maker;