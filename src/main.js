// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    .then(res => res.json())
    // json API로 res.body를 json의 오브젝트로 변환
    .then(json => json.items)
}

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
    // items.map(item => createHTMLString(item))는 단순한 문자열 배열
    // .join('')을 사용하여 하나의 문자열로 변환
    //join('')에 ''필수
}

//Create HTML list item from the given data item
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail ">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null) {
        return;
    }

    displayItems(items.filter(item => item[key] === value));
    //item[key]는 items 배열의 키가 key인 밸류를 호출
    // 밸류가 value와 같은 것만 리턴  
    // 클릭할때 마다 요소를 만들어서 업데이트 하는 것은 비효율

    // updateItems(items, key, value);
}

// function updateItems(items, key, value) {
//     items.forEach(item => {
//         if(item[key] === value) {
//             item.classList.remove('invisible');
//         } else {
//             item.classList.add('invisible');
//         }
//     });
// }

function setEventListners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    // button들이 들어있는 컨테이너에 EventListner을 등록해서 한 곳에서만 이벤트핸들링이 가능하도록 함 = 이벤트 위임(효율적)

    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items))
}

//main
loadItems()
.then(items => {
    displayItems(items);
    setEventListners(items)
})