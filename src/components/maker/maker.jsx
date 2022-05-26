import React, { useEffect, useState } from 'react';
import styles from './maker.module.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {

    const [cards, setCards] = useState([
        {
            id: '1',
            name: 'test1',
            company: 'dream',
            theme: 'dark',
            title: 'Software Engineer',
            email: 'test@test.com',
            message: 'im so sleep',
            fileName : 'test',
            fileURL: null
        },
        {
            id: '2',
            name: 'test2',
            company: 'dream',
            theme: 'light',
            title: 'Software Engineer',
            email: 'test@test.com',
            message: 'im so sleep',
            fileName : 'test',
            fileURL: 'test.png'
        },
        {
            id: '3',
            name: 'test3',
            company: 'dream',
            theme: 'colorful',
            title: 'Software Engineer',
            email: 'test@test.com',
            message: 'im so sleep',
            fileName : 'test',
            fileURL: null
        }
    ]);

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

    // Maker에서 Card 신규추가
    const addCard = (card) => {
        const updated = [...cards , card];
        setCards(updated);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards} addCard={addCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    )
};

export default Maker;