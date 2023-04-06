import React, { useRef, useState } from 'react';
import {
    TextField,
    TextFieldButton,
    TextFieldWrapper,
    TextFieldContainer,
} from './styledComponents';
import { useDispatch } from 'react-redux';
import { sendMessageUser } from '../../store/reduser/chatReduser';
import { UserAuth } from '../../firebase/authorizationMethods';


const CustomTextField = ({
    createdAt,
    
}) => {

const {user} = UserAuth();


  const [value, setValue] = useState('');  // value содержит текущее значение ввода сообщения, а setValue используется для изменения значения ввода при изменении пользователем текста.

  const textRef = useRef();  //textRef - это ссылка на элемент DOM, который представляет текстовое поле ввода сообщений.

  const dispatch = useDispatch();

function getFormattedTimestamp() {  // форматируется текущая дата и время для использования в сообщениях чата,
  const date = new Date(Date.now());// создаем новый объект Date, передавая ему значение Date.now()
  const hours = date.getHours();// получаем часы (от 0 до 23)
  const minutes = date.getMinutes();// получаем минуты (от 0 до 59)
  return `${hours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')}`;
// форматируем строку с помощью метода padStart()
}

  const message = {    //объект message, который содержит текст и дату и время сообщения, а также информацию об имени пользователя и его фото профиля. Этот объект используется при отправке сообщения в чат.
      message: value,
      timestamp: getFormattedTimestamp(),
      createdAt:Date.now(), // добавляем timestamp,
      username:user.displayName,
      photoURL: user.photoURL
};


  const onClickHandler = () => {
        if (value) {
            
            dispatch(sendMessageUser(message));
            setValue('');
        }
    };

    const onChangeHandler = event => {
        const { target: { value } } = event;

        setValue(value);
    };

    const handleOnFocus = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();

            if (value) {
                //sendMessageUser(messages);
                dispatch(sendMessageUser(message));
                setValue('');
            }
        }
    };



    return (
        <TextFieldContainer>
            <TextFieldWrapper>
                <TextField
                    ref={textRef}
                    value={value}
                    key={createdAt}
                    onChange={onChangeHandler}
                    onKeyDown={handleOnFocus}
                    placeholder={'Send a message...'}
                />
            </TextFieldWrapper>
            <TextFieldButton
                onClick={onClickHandler}
                children={'SEND'}
            />
        </TextFieldContainer>
    );
};

export default CustomTextField;
