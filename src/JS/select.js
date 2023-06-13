// 선택한 값을 질문으로 넣기
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
            const target = e.target;
            const id = target.id;
            const value = target.value;

            if (id === "1980년대" || id === "1990년대" || id === "2000년대" || id === "2010년대" || id === "2020년대" || id === "모든연도") {
                year = value ? id : '';
            } else if (id === "발라드" || id === "댄스" || id === "랩,힙합" || id === "R&B,Soul" || id === "인디음악" || id === "록,메탈" || id === "트로트" || id === "포크,블루스" || id === "모든장르" ) {
                genre = value ? id : '';
            } else if (id === "화창한날" || id === "비가내리는날" || id === "안개가가득한날" || id === "눈이내리는날" || id === "바람이부는날" || id === "모든날씨" ) {
                weather = value ? id : '';
            } else if (id === "아침" || id === "점심" || id === "저녁" || id === "새벽" || id === "모든시간대" ) {
                time = value ? id : '';
            }
            const selectValue = [year, genre, weather, time];
            question = selectValue.join();
            console.log(question)
    })
})

