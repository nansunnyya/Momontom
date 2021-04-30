const toDoForm = document.querySelector('.js-toDoForm'),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";
let todos = [];

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
    //local storage에는 string으로 저장됨. 그래서 json.stringify를 써야함
}
function addInput(e){
    e.preventDefault();
    const currentValue = toDoInput.value;
    console.log(currentValue);
    addList(currentValue);
    toDoInput.value = "";

}
function addList(text, id){
    const li = document.createElement("li");
    if (id===undefined){
        li.id = Date.now();
    }else{
        li.id = id;
    }
    const deleBtn = document.createElement("button");
    deleBtn.innerText = "✂";
    deleBtn.addEventListener("click", deletedToDo);
    const span = document.createElement("span");
    console.log("id",id);

    span.innerText = text;

    
    li.appendChild(deleBtn);
    li.appendChild(span);
     console.log(li);
    toDoList.append(li);    
    const toDoObj = {
        text : text,
        id: li.id 
    };
    todos.push(toDoObj);
    saveToDos();

}

function deletedToDo(e){
    const btn = e.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
   
    const cleanToDos = todos.filter(todos => todos.id !== li.id);

    todos = cleanToDos;
    saveToDos();
}

function deleteSpell(){
    toDoInput.value="";
}

function init(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(todos => {
            addList(todos.text, todos.id)
        });
        /*json: 데이터를 전달할 때 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔줌
         object는 string 으로 바꿀 수 있음 */
    }

    toDoForm.addEventListener("submit", addInput);
    toDoInput.addEventListener("blur", deleteSpell)
}
init();