const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $chatList = document.querySelector("#cardContainer");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let question = '';
let year = '';
let genre = '';
let weather = '';
let time = '';

// 선택한 값을 질문으로 넣기
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
            const target = e.target;
            const id = target.id;
            const value = target.value;

            if (id === "1980년대" || id === "1990년대" || id === "2000년대" || id === "2010년대" || id === "2020년대" || id === "기타") {
                year = value ? id : '';
            } else if (id === "발라드" || id === "댄스" || id === "랩,힙합" || id === "R&B,Soul" || id === "인디음악" || id === "록,메탈" || id === "트로트" || id === "포크,블루스" || id === "기타" ) {
                genre = value ? id : '';
            } else if (id === "화창한날" || id === "비가내리는날" || id === "안개가가득한날" || id === "눈이내리는날" || id === "바람이부는날" || id === "기타" ) {
                weather = value ? id : '';
            } else if (id === "아침" || id === "점심" || id === "저녁" || id === "새벽" || id === "기타" ) {
                time = value ? id : '';
            }
            const selectValue = [year, genre, weather, time];
            question = selectValue.join();
            console.log(question)
    })
})

// 질문과 답변 저장
let data = [
{
    role: "system",
    content: "assistant는 친절한 음악 추천 AI이다.",
},{
    role: "system",
    content: "답변 처음에는 무조건 '다음 질문에 대한 답변입니다' 라는 문장만 먼저 출력 후 답변읋 한다. 다른 문장은 보여주지 않는다."
}, {
    role: "system",
    content: "한번에 대답하지 말고 나눠서 답변한다."
},{
    role: "system",
    content: "한번에 무조건 5곡씩만 추천한다"
},{
    role: "system",
    content: "1980년대는 1980년부터 1989년까지이다. 1990년대는 1990년부터 1999년까지이다. 2000년대는 2000년부터 2009년까지이다.2010년대는 2010년부터 2019년까지이다. 2020년대는 2020년부터 2023년까지이다."
},{
    role: "system",
    content: "답변 마지막에 무조건 '다음과 같은 곡들을 추천합니다.' 라는 문장을 같이 보여준다."
},{
    role: "system",
    content: "모든 곡의 제목은 한국어로 알려준다."
},{
    role: "system",
    content: "모든 곡은 '가수 - 노래 제목' 형식으로 답한다."
}
];

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

// input에 입력된 질문 받아오는 함수
// $input.addEventListener("check", (e) => {
//     question = e.target.value;
//     console.log(question);
//     });

// document.querySelectorAll('input[type="radio"]').forEach((checkbox) => {
//     checkbox.addEventListener("change", (e) => {
//         const target = e.target;
//         const id = target.id;
//         const checked = target.value;
//         question = id;
//         console.log(question)

//     });
// });

 // input에 입력된 질문 받아오는 함수
// $yearSection.addEventListener("change", (e) => {
//     question = e.target.value;
//     });

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (question) => {
    if (question) {
        data.push({
            role: "user",
            content: question,
        });
        questionData.push({
            role: "user",
            content: question,
        });
    }
    console.log("sendQuestion");
};

// 화면에 질문 그려주는 함수
const printQuestion = async () => {
if (question) {
    let cardBox = document.createElement("div");
    cardBox.classList.add("question");
    questionData.map((el) => {
    cardBox.innerText = el.content;
    });
    $chatList.appendChild(cardBox);
    questionData = [];
    question = false;
}
console.log('printQuestion')
};

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
let cardAnswer = document.querySelector("#cardContainer");
cardAnswer.classList.add("answer");
cardAnswer.innerText = answer;
$chatList.appendChild(cardAnswer);
console.log('printAnswer')
};

// api 요청보내는 함수
const apiPost = async () => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then((res) => res.json())
        .then((res) => {
        printAnswer(res.choices[0].message.content);
        })
        .catch((err) => {
        console.log(err);
        });
    console.log('apiPost')
};

// submit
$form.addEventListener("submit", (e) => {
e.preventDefault();
sendQuestion(question);
apiPost();
printQuestion();
});
