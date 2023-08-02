document.addEventListener("DOMContentLoaded", function() {
    // 로그아웃 버튼 클릭 시 AJAX 요청 보내기
    document.getElementById("logoutButton").addEventListener("click", function() {
        // CSRF 토큰 가져오기
        const csrftoken = getCookie('csrftoken');
        
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8000/user/logout/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-CSRFToken", csrftoken); // CSRF 토큰을 요청 헤더에 추가
        xhr.responseType = "json";
        xhr.onload = function() {
            if (xhr.status === 200) {
                // 로그아웃에 성공한 경우 처리
                console.log("로그아웃 성공");
                window.location.href = "./index.html"
                // 여기에 로그아웃 성공 시 처리할 코드를 작성합니다.
                // 예: 로그아웃 완료 메시지 표시, 메인 페이지로 이동 등
            } else {
                // 로그아웃에 실패한 경우 처리
                console.log("로그아웃 실패:", xhr.status, xhr.response);
                alert("로그아웃을 다시 시도해주세요.")
                // 여기에 로그아웃 실패 시 처리할 코드를 작성합니다.
                // 예: 오류 메시지 표시 등
            }
        };
        xhr.onerror = function() {
            console.log("AJAX 요청 에러");
        };
        xhr.send();
    });

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
});
// document.addEventListener("DOMContentLoaded", function() {
//     // 로그아웃 버튼 클릭 시 AJAX 요청 보내기
//     document.getElementById("logoutButton").addEventListener("click", function() {
//         const token = localStorage.getItem("userToken"); // 저장된 토큰 불러오기

//         if (token) {
//             const xhr = new XMLHttpRequest();
//             xhr.open("POST", "http://127.0.0.1:8000/user/logout/");
//             xhr.setRequestHeader("Content-Type", "application/json");
//             xhr.setRequestHeader("Authorization", "Token " + token); // 토큰을 헤더에 추가
//             xhr.responseType = "json";
//             xhr.onload = function() {
//                 if (xhr.status === 200) {
//                     // 로그아웃에 성공한 경우 처리
//                     console.log("로그아웃 성공");
//                     // 여기에 로그아웃 성공 시 처리할 코드를 작성합니다.
//                     // 예: 로그아웃 완료 메시지 표시, 메인 페이지로 이동 등
//                 } else {
//                     // 로그아웃에 실패한 경우 처리
//                     console.log("로그아웃 실패:", xhr.status, xhr.response);
//                     // 여기에 로그아웃 실패 시 처리할 코드를 작성합니다.
//                     // 예: 오류 메시지 표시 등
//                 }
//             };

//             xhr.onerror = function() {
//                 console.log("AJAX 요청 에러");
//             };

//             xhr.send();
//         } else {
//             console.log("토큰이 없습니다. 로그인이 필요합니다.");
//         }
//     });
// });
