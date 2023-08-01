document.addEventListener("DOMContentLoaded", function() {
    // 로그인 버튼 클릭 시 AJAX 요청 보내기
    document.getElementById("loginButton").addEventListener("click", function() {
        const email = document.querySelector("input[name=email]").value;
        const password = document.querySelector("input[name=password]").value;
        const data = {
            email: email,
            password: password
        };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8000/user/login/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.onload = function() {
            if (xhr.status === 200) {
                // 로그인에 성공한 경우 처리
                const response = xhr.response;
                console.log("로그인 성공:", response);
                // 여기에 로그인 성공 시 처리할 코드를 작성합니다.
                // 메인 페이지로 리다이렉트
                window.location.href = "./main.html";
            } else {
                // 로그인에 실패한 경우 처리
                console.log("로그인 실패:", xhr.status, xhr.response);
                window.location.href = "./login.html";
            }
        };
        xhr.onerror = function() {
            console.log("AJAX 요청 에러");
        };
        xhr.send(JSON.stringify(data));
    });
});
