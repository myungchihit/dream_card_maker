import { firebaseAuth, githubProvider, googleProvider } from './firebase';

// 로그인 / 로그아웃 관련
class AuthService {
    login(providerName) {
        const authProvider = this.getProvider(providerName);
        //new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseAuth.auth().signInWithPopup(authProvider);
    }

    logout() {
        firebaseAuth.signOut();
    }

    // 한번 로그인이 되어있으면 /maker로 바로 이동하게끔
    // 콜백함수를 파라미터로 받음
    onAuthChange(onUserChanged) {
        firebaseAuth.onAuthStateChanged(user => {
            onUserChanged(user);
        })
    }

    getProvider(providerName){
        switch(providerName){
            case 'Google':
                return googleProvider;
            case 'Github':
                return githubProvider;
            default:
                throw new Error(`not supported provider: ${providerName}`);
        }
    }
}

export default AuthService;