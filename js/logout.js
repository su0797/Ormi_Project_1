document.addEventListener("DOMContentLoaded", function() {
    // 로그아웃 버튼 클릭 시 AJAX 요청 보내기
    document.getElementById("logoutButton").addEventListener("click", function() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8000/user/logout/");
        xhr.setRequestHeader("Content-Type", "application/json");
        
        // CSRF 토큰을 요청 헤더에 추가
        const csrftoken = getCookie('csrftoken');
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        
        xhr.responseType = "json";
        xhr.onload = function() {
            if (xhr.status === 200) {
                // 로그아웃에 성공한 경우 처리
                const response = xhr.response;
                console.log("로그아웃 성공:", response);
                // 여기에 로그아웃 성공 시 처리할 코드를 작성합니다.
                // 예: window.location.href = "/";  // 메인 페이지로 리다이렉트
            } else {
                // 로그아웃에 실패한 경우 처리
                console.log("로그아웃 실패:", xhr.status, xhr.response);
                // 여기에 로그아웃 실패 시 처리할 코드를 작성합니다.
            }
        };
        xhr.onerror = function() {
            console.log("AJAX 요청 에러");
        };
        xhr.send();  // 로그아웃 API 요청에는 별도의 데이터(body)가 필요하지 않습니다.
    });
});

// CSRF 토큰을 가져오는 함수
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring('csrftoken='.length));
                break;
            }
        }
    }
    return cookieValue;
}
