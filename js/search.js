const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $chatList = document.querySelector("#cardContainer");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let question = '';

// 질문과 답변 저장
let data = [
{
    role: "system",
    content: "assistant는 친절한 음악 추천 AI이다.",
},{
    role: "system",
    content: "답변은 무조건 1. 가수 - 제목 형태로만 대답하고 부가적인 모든말은 하지 않는다."
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
    content: "모든 곡의 제목은 한국어로 알려준다."
}
];

// 화면에 뿌려줄 데이터, 질문들
const questionData = [];

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
};

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
let cardAnswer = document.querySelector("#cardContainer");
cardAnswer.classList.add("answer");
cardAnswer.innerText = answer;
$chatList.appendChild(cardAnswer);
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
};

// submit
$form.addEventListener("submit", (e) => {
e.preventDefault();
sendQuestion(question);
apiPost();
});
