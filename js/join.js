document.addEventListener("DOMContentLoaded", function() {
    // 회원가입 버튼 클릭 시 AJAX 요청 보내기
    document.getElementById("joinButton").addEventListener("click", function() {
        const emailInput = document.querySelector("input[name=email]");
        const nameInput = document.querySelector("input[name=name]");
        const passwordInput = document.querySelector("input[name=password]");
        
        if (emailInput && nameInput && passwordInput) {
            const email = emailInput.value;
            const name = nameInput.value;
            const password = passwordInput.value;
            const data = {
            email: email,
            name: name,
            password: password
            };
        
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:8000/user/join/");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = "json";
            xhr.onload = function() {
            if (xhr.status === 201) {
                // 회원가입에 성공한 경우 처리
                const response = xhr.response;
                console.log("회원가입 성공:", response);
                alert("회원가입이 완료되었습니다.")
                // 여기에 회원가입 성공 시 처리할 코드를 작성합니다.
                // 예: 회원가입 완료 메시지 표시, 로그인 페이지로 이동 등
                window.location.href = "./login.html";
            } else {
                // 회원가입에 실패한 경우 처리
                console.log("회원가입 실패:", xhr.status, xhr.response);
                alert("회원가입이 실패했습니다.")
                // 여기에 회원가입 실패 시 처리할 코드를 작성합니다.
                window.location.href = "./index.html";
                // 예: 오류 메시지 표시 등
            }
            };
            xhr.onerror = function() {
            console.log("AJAX 요청 에러");
            };
            xhr.send(JSON.stringify(data));
        }
        });
    });
    