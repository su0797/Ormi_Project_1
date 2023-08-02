const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $chatList = document.querySelector("#cardContainer");


// openAI API
let url = `http://127.0.0.1:8000/chatbot/`;

// server.listen(8000, 'localhost'); // or server.listen(3001, '0.0.0.0'); for all interfaces
// server.on('listening', function() {
//     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });

// 사용자의 질문
let question = '';

// 질문과 답변 저장
let data = [
{
    role: "prompt",
    content: "assistant는 친절한 음악 추천 AI이다.",
},{
    role: "prompt",
    content: "답변은 무조건 1. 가수 - 제목 형태로만 대답하고 부가적인 모든말은 하지 않는다."
}, {
    role: "prompt",
    content: "한번에 대답하지 말고 나눠서 답변한다."
},{
    role: "prompt",
    content: "한번에 무조건 5곡씩만 추천한다"
},{
    role: "prompt",
    content: "1980년대는 1980년부터 1989년까지이다. 1990년대는 1990년부터 1999년까지이다. 2000년대는 2000년부터 2009년까지이다.2010년대는 2010년부터 2019년까지이다. 2020년대는 2020년부터 2023년까지이다."
},{
    role: "prompt",
    content: "한국어 제목인 노래는 무조건 한국어로 알려준다."
}
];

// 화면에 뿌려줄 데이터, 질문들
const questionData = [];

// 사용자의 질문을 객체를 만들어서 push
// const sendQuestion = (question) => {
//     if (question) {
//         const formData = new FormData();
//         formData.append('prompt', question);

//         // CSRF 토큰 가져오기
//         const csrftoken = getCookie('csrftoken');

//         // 질문 데이터를 서버로 보냄
//         fetch(url, {
//             method: "POST",
//             credentials: "same-origin",
//             headers: {
//                 "X-CSRFToken": csrftoken,
//             },
//             body: formData,
//             redirect: "follow",
//         })
//         .then((res) => res.json())
//         .then((res) => {
//             printAnswer(res.response);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }
// };

// 화면에 질문 그려주는 함수
const printQuestion = async () => {
    if (questionData.length > 0) {
        let cardBox = document.createElement("div");
        cardBox.classList.add("question");
        questionData.forEach((el) => {
            cardBox.innerText = el.content;
        });
        $chatList.appendChild(cardBox);
        questionData.length = 0;
    }
};


// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
    if (answer && typeof answer === 'string') {
        let cardAnswer = document.createElement("div");
        cardAnswer.classList.add("answer");
        cardAnswer.innerText = answer;
        $chatList.appendChild(cardAnswer);
    }
};

// api 요청보내는 함수
const apiPost = async () => {
    const csrftoken = getCookie('csrftoken');

    const result = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            data: data,
            prompt: question,
        }),
        redirect: "follow",
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.response) {
            printAnswer(res.response);
            // 답변을 받은 후에는 data 배열과 question 변수를 초기화
            data = [];
            question = '';
        }
    })
    .catch((err) => {
        console.log(err);
    });
};


// CSRF 토큰을 가져오는 함수
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // CSRF 토큰이름이 csrftoken인 쿠키 값을 가져옵니다.
            if (cookie.startsWith('csrftoken=')) {
            cookieValue = decodeURIComponent(cookie.substring('csrftoken='.length));
            break;
            }
        }
        }
        return cookieValue;
    }


$form.addEventListener("submit", async (e) => { // 비동기 함수로 변경
    e.preventDefault();
    // printQuestion();
    // sendQuestion(question);
    console.log(question);
    await apiPost(); // await를 사용하여 결과를 기다림
    printAnswer();
    });
