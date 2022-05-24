import firebase from 'firebase';
import firebaseApp from './firebase';

// 로그인 / 로그아웃 관련
class AuthService {
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }

    logout() {
        firebase.auth().signOut();
    }

    // 한번 로그인이 되어있으면 /maker로 바로 이동하게끔
    // 콜백함수를 파라미터로 받음
    onAuthChange(onUserChanged) {
        firebase.auth().onAuthStateChanged(user => {
            onUserChanged(user);
        })
    }
}

export default AuthService;