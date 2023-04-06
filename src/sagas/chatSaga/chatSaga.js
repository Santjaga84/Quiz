import { all, put, call, fork, take, takeEvery } from 'redux-saga/effects';
import * as eventChannels from '../eventChannels/eventChannels';
import { sendMessageFirebase } from '../../firebase/chatFirebase';
import { sendMessageStore } from '../../store/reduser/chatReduser';
import { setUserMessage } from '../../store/reduser/chatReduser';
import { sendMessageUser } from '../../store/reduser/chatReduser';



export function* sendMessagesSaga(action) { //генераторная функция, которая обрабатывает действие sendMessageUser. Она использует эффект call, чтобы вызвать функцию sendMessageFirebase с payload действия, которая отправляет сообщение на сервер Firebase.
     
     yield call(sendMessageFirebase,action.payload);
  
}

export function* setUserMessages({ payload }) { //енераторная функция, которая обрабатывает действие setUserMessage. Сначала она проверяет, содержит ли payload действия какие-либо сообщения с свойством createdAt. Если да, то она фильтрует любые сообщения, которые не имеют этого свойства, затем отправляет действие sendMessageStore с отфильтрованными сообщениями в качестве его payload.
    if (payload.length) {
        const filteredMessagesList = payload.filter(message => message.createdAt);

        filteredMessagesList.length && (yield put(sendMessageStore(filteredMessagesList)));
    }
}

export function* startListener() {  //генераторная функция, которая прослушивает новые сообщения в чате, используя канал событий chatMessagesEventChannel, определенный в ../eventChannels/eventChannels.js. Она входит в бесконечный цикл, используя оператор while (true) и ожидает новых сообщений, поступающих на канал событий, используя эффект take. Когда новое сообщение приходит, она отправляет связанное с ним действие.
    const chatMessagesChannel = eventChannels.chatMessagesEventChannel();

    while (true) {
        const eventAction = yield take(chatMessagesChannel);

        yield put(eventAction);
    }
}

export default function* watchChatSaga() {  //корневая функция для саги чата, которая является композицией нескольких саг. Она использует эффект all, чтобы выполнять несколько саг одновременно, в том числе startListener, sendMessagesSaga и setUserMessages. Она также использует эффект takeEvery, чтобы прослушивать действия sendMessageUser и setUserMessage и запускать их соответствующие саги
    yield all([
        fork(startListener),
        takeEvery(sendMessageUser().type, sendMessagesSaga),
        takeEvery(setUserMessage().type, setUserMessages),
    ]);
};