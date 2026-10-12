let goals = [
    { id: 1, text: "Вивчити DOM.", completed: false },
    { id: 2, text: "Зройти перший сайт.", completed: true },
    { id: 3, text: "Прочитати книгу.", completed: false },
    { id: 4, text: "Пробігти 5 км.", completed: false }
];

let currentFilter = "all";

const goalForm = document.getElementById('goal-form');
const errorMessage = document.getElementById('error-message');
const goalInput = document.getElementById('goal-input');
const counter = document.getElementById('counter');
const emptyMessage = document.getElementById('empty-message');
const goalsList = document.getElementById('goals-list');
const filterBtn = document.querySelectorAll('.filter-btn');

function render(){
    goalsList.innerHTML = '';
    const filteredGoals = goals.filter(g =>{
        if (currentFilter === 'active'){return !g.completed}
        if(currentFilter === 'completed'){return g.completed}
        return true;})
    if (filteredGoals.length === 0){
        emptyMessage.hidden = false;
    }
    else{
        emptyMessage.hidden = true;
    }
    filteredGoals.forEach(g =>{
        const li = document.createElement('li');
        if (g.completed){
            li.className = 'completed';
        }

        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = g.text;

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox';
        checkbox.checked = g.completed;
        checkbox.dataset.id = g.id;
        checkbox.className = 'g-checkbox';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times';
        deleteBtn.dataset.id = g.id;

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        goalsList.appendChild(li);
    })
    const count = goals.length;
    const filteredCOunt = goals.filter(g => g.completed).length;
    counter.textContent = `Усього ${count}. Виконано ${filteredCOunt}`;
}

goalForm.addEventListener('submit', function(event){
    event.preventDefault();
    const text = goalInput.value.trim();
    if (text.length > 100 || text.length < 3){
        errorMessage.textContent = 'Кількість символів повинна бути від 3 до 100!';
        return;
    }
    errorMessage.textContent = '';
    const newGoal = {
        id: Date.now(),
        text: text,
        completed: false
    }
    goals.push(newGoal);
    goalInput.value = '';
    goalInput.focus();
    render();
})

goalsList.addEventListener('click', function(event){
    const target = event.target;
    const goalId = Number(target.dataset.id);
    if(target.classList.contains('delete-btn')){
        goals = goals.filter(g => g.id !== goalId);
        render();
    }
    if(target.classList.contains('g-checkbox')){
        const currentGoal = goals.find(g => g.id === goalId);
        if (currentGoal) {
            currentGoal.completed = target.checked;
            render();
        }
    }
})

const filteredContainer = document.querySelector(".filters")
if (filteredContainer){
    filteredContainer.addEventListener('click', function(event){
        const btn = event.target;
        if (btn.classList.contains('filter-btn')){
            const activeBtn = filteredContainer.querySelector('.filter-btn.active');
            if (activeBtn){
                activeBtn.classList.remove('active');
            }
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            render();
        }
    })
}
render();