export const sendGetRequest = async url => {
    const data = await fetch(url).then(response => response.json());
//     data.forEach(item => {
    
//         console.log(item); // выводим каждый элемент массива в консоль
//     // здесь можно производить другую обработку данных
// });
return data;
};
