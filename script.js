function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray(){
    const min = 0, max = 100
    let arr = []
    for(i=0; i<20; i++){
        const randomElement = Math.floor(Math.random()*((max-min)+1));
        arr.push(randomElement)
    }
    return arr.sort((a,b)=>a-b)
}


async function binarySearch() {
    const arrayElements = document.getElementsByClassName('bar');
    const prevKey = document.querySelector('#found');
    if (prevKey) {
        prevKey.removeAttribute('id');
        prevKey.classList.remove('found', 'highlight', 'mid', 'low_index', 'high_index');
    }

    const prevHigh = document.querySelector('.high_index');
    const prevLow = document.querySelector('.low_index');

    if(prevHigh){
        prevHigh.classList.remove('high_index')
    }

    if(prevLow){
        prevHigh.classList.remove('low_index')
    }

    const searchValue = parseInt(document.getElementById('search-key').value, 10);

    if (!searchValue) {
        alert("Enter some value to search !!");
        return;
    }


    const values = [];
    for (let i = 0; i < arrayElements.length; i++) {
        values.push(parseInt(arrayElements[i].textContent, 10));
    }

    let low = 0;
    let high = values.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        arrayElements[mid].classList.add('highlight','mid');
        arrayElements[low].classList.add('low_index')
        arrayElements[high].classList.add('high_index')
        await sleep(1500);

        if (values[mid] === searchValue) {
            arrayElements[mid].classList.add('found');
            arrayElements[mid].setAttribute('id', 'found');
            setTimeout(() => {
                alert("Element found !!");
                arrayElements[mid].classList.remove('found', 'highlight', 'mid');
                arrayElements[low].classList.remove('low_index')
                arrayElements[high].classList.remove('high_index')
            }, 200);
            return;
        } else if (values[mid] < searchValue) {
            arrayElements[low].classList.remove('low_index');
            low = mid + 1;
        } else {
            arrayElements[high].classList.remove('high_index');
            high = mid - 1;
        }

        arrayElements[mid].classList.remove('highlight','mid');
        
    }

    setTimeout(() => { 
        alert(`${searchValue} not found`); 
        if(arrayElements[low].classList.contains('low_index')) arrayElements[low].classList.remove('low_index');
        if(arrayElements[low].classList.contains('high_index')) arrayElements[high].classList.remove('high_index'); 
    }, 200);
}



function displayArray(array){
    const barContainer = document.getElementById('bar-container');
    barContainer.innerHTML = ""

    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value}%`;
        const valueText = document.createElement('span')
        valueText.textContent = value;
        bar.appendChild(valueText)
        barContainer.appendChild(bar);
    });
}

function generateAndDisplayArray(){
    const array = generateArray()
    console.log(array)
    displayArray(array)
}

document.addEventListener('DOMContentLoaded', () => {
    generateAndDisplayArray()
});