import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: 'chat',
  initialState: {  //задает начальное состояние чата, которое содержит только массив сообщений.
  messages: [],
  },
  reducers: {  // определяет редьюсеры для изменения состояния чата
 
  setUsersMessagesStore: (state, action) => {  //присваивает значение массива сообщений в state, переданный в payload.
     
    state.messages = action.payload;
    },
  
  sendMessageUser:(state, action) => {  //не делает никаких изменений, используется для инициации отправки сообщения в Firebase.
    
      
    },  
  sendMessageStore:(state,action) => {  // добавляет новое сообщение в state, переданный в payload.
          
     const newMessage = {
        messages: action.payload,
        timestamp: Date.now()  // добавляем timestamp
        
      };
      state.messages.push(newMessage);
    },
    
  setUserMessage:(state,action) => {  //присваивает значение сообщения, которое будет отправлено, в состояние sendMessage.
      state.sendMessage = action.payload.sendMessage
    }
  }
  });

  export const {
  setUsersMessagesStore,
  sendMessageStore,
  setUserMessage,
  sendMessageUser
} = chatSlice.actions;

export default chatSlice.reducer;
