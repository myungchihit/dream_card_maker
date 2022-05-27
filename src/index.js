import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import CardRepository from './service/card_repository';

const root = ReactDOM.createRoot(document.getElementById('root'));

const authService = new AuthService();
const cardRepository = new CardRepository();
const imageUploader = new ImageUploader();
const FileInput = memo( props => (
  // imageUploader service를 card_edit_form, card_add_form까지 넘기는게 성능이 안좋다.
  // 만약 imageUploader 서비스를 제외하고 또 다른 서비스를 추가한다면 또 서비스를 넘겨야하는데 그것보다
  // 여기서 만약 추가하는 serviec를 넣은 component를 만들고 component 자체를 넘겨주는게 이득이다.
  // 여기서만 서비스를 새로 넣어주면 되기 때문이다.
  // ...props를 주는 이유는 ImageFileInput을 쓰는곳에서 props를 자유롭게 쓰기위해서 확장성을 용이하게만듬.
  <ImageFileInput {...props} imageUploader={imageUploader}/>
));

root.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput} cardRepository={cardRepository}/>
  </React.StrictMode>
);
