const $input = document.querySelector("input");

// 사용자가 선택한 조건을 입력하는 함수
$input.addEventListener("button", (e) => {
    selectvalue = e.target.value; 
});

const selectValue = (selectli) => {
    let selectButton = document.createElement("li");
    // selectButton.classList.add("selectli");
    selectButton.innerText = selectli;
    $input.appendChild(selectButton);
    console.log(selectli);
};

// document.querySelectorAll('button[type="button"]').forEach(selectButton=> {
//     selectButton.addEventListener("change", (e) => {
//         const target = e.target;
//         const id = target.id;
//         const checked = target.checked;

//         if (id === '여자' || id === '남자') {
//         gender = checked ? id : '';
//         } else if (id.includes('대')) {
//         age = checked ? id : '';
//         } else if (id === '실내' || id === '실외') {
//         place = checked ? id : '';
//         }
//     });
// });