import React , { memo, useRef, useState } from 'react';
import styles from './image_file_input.module.css';

const ImageFileInput = memo(({ imageUploader, name, onFileChange }) => {

    // 로딩 state
    const [loading, setLoading] = useState(false);

    // 버튼이랑 input을 둘다 만든 이유: input은 CSS가 별로 없어서 꾸밀수가 없다.
    // input을 CSS적으로 숨기고 button을 클릭했을때 input을 클릭한 것 처럼 만든다.
    const inputRef = useRef();
    const onButtonClick = event => {
        event.preventDefault();
        inputRef.current.click();
      };

    // inputFile Change
    const onChange = async (event) => {
        setLoading(true);
        // async처리 아래같이 then을 써도 되고
        //imageUploader.upload(event.target.files[0]).then(console.log);

        // event옆에 async붙이고 아래와 같이 await을 써줘도 된다.
        const uploaded = await imageUploader.upload(event.target.files[0]);
        setLoading(false);
        onFileChange({
            name : uploaded.original_filename,
            url : uploaded.url
        });
    }

    return (
        <div className={styles.container}>
            <input 
                ref={inputRef} 
                className={styles.input} 
                type="file" 
                accept="image/*" 
                name="file" 
                onChange={onChange}
            />
            {!loading && (
                <button className={`${styles.button} ${name ? styles.pink : styles.grey}`} onClick={onButtonClick}>
                    {name || 'No file'}
                </button>
            )}
            {loading && <div className={styles.loading}></div>}
        </div>
    );
});

export default ImageFileInput;