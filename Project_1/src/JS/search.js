const $form = document.querySelector("form");
const $input = document.querySelector("input");
// const $button = document.querySelector("button");
const $questionList = document.querySelector("#questionBox");
// const $explanationList = document.querySelector("#explanContainer");
const $chatList = document.querySelector("#cardContainer");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let question;

// 질문과 답변 저장
let data = [
{
    role: "system",
    content: "assistant는 친절한 답변가이다.",
},{
    role: "system",
    content: "제일 먼저 '다음 질문에 대한 답변입니다' 라는 문장을 먼저 출력 후 답변읋 한다."
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
    content: "답변 마지막에 '다음과 같은 곡들을 추천합니다.' 라는 문장을 같이 보여준다."
}
];

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
question = e.target.value;
});

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
    $questionList.appendChild(cardBox);
    questionData = [];
    question = false;
}
console.log('printQuestion')
};

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
let cardAnswer = document.createElement("div");
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
$input.value = null;
sendQuestion(question);
apiPost();
printQuestion();
});
