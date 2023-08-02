// 사용자가 선택하는 조건
let year = '';
let genre = '';
let weather = '';
let time = '';

const  year_id = ['1980년대', '1990년대', '2000년대', '2010년대', '2020년대', '모든연도']
const  genre_id = ['발라드', '댄스', '랩,힙합', 'R&B,Soul', '인디음악', '록,메탈', '트로트', '포크,블루스', '모든장르']
const  weather_id = ['화창한날', '비가내리는날', '안개가가득한날', '눈이내리는날', '바람이부는날', '모든날씨']
const  time_id = ['아침', '점심', '저녁', '새벽', '모든시간대']


let selectValue = []; // 배열로 초기화

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
        const target = e.target;
        const id = target.id;
        const value = target.value;

        if (year_id.includes(id)) {
            year = id;
        } else if (genre_id.includes(id)) {
            genre = id;
        } else if (weather_id.includes(id)) {
            weather = id;
        } else if (time_id.includes(id)) {
            time = id;
        }
        
        // 선택한 값을 배열에 추가
        selectValue = [year, genre, weather, time];
        console.log(selectValue);

        // 배열의 요소를 문자열로 결합하여 question에 할당
        question = `${year} 년대에 나온 ${genre} 장르인 노래들 중에서 ${weather}에 어울리고 ${time}에 듣기 좋은 한국 노래 5곡을 가수 - 노래 제목 형식에 맞춰서 보내줘. 한번만 대답해줘`;
    })
});


