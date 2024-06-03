class CalorieTracker {
   constructor(){
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories(0);
    this._meals = Storage.getMeals() ;
    this._workouts = Storage.getWorkouts();
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
    //this._render();
   }

   // Public Methods/APIs //
   addMeal(meal){
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    //updating the local storage
    Storage.updateTotalCalories(this._totalCalories);
    // saving meals in local storage
    Storage.saveMeals(meal);
    // displaying the new meal
    this._displayNewMeal(meal);
    // we have to render every time we add item
    this._render();
   }
   addWorkout(workout){
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    // updating the local storage
    Storage.updateTotalCalories(this._totalCalories);
    // saving workouts in local storage
    Storage.saveWorkouts(workout);
    // displaying the new workout
    this._displayNewWorkout(workout);
      // we have to render every time we add item
    this._render();
   }
   removeMeal(id){
    const index = this._meals.findIndex(meal => meal.id === id);
    if (index !== -1) { 
        this._totalCalories -= this._meals[index].calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._meals.splice(index, 1);
        this._render();
    }
   }
   removeWorkout(id){
    const index = this._workouts.findIndex(workout => workout.id === id);
    if (index !== -1){
    this._totalCalories += this._workouts[index].calories;
    Storage.updateTotalCalories(this._totalCalories);
    this._workouts.splice(index, 1);
    this._render();
    }
   }
   reset(){
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._render();
   }
   setLimit(limit){
    this._calorieLimit = limit;
    Storage.setCalorieLimit(limit);
    this._displayCaloriesLimit();
    this._render();
   }

    loadItmes(){
        this._meals.forEach(meal => this._displayNewMeal(meal));
        this._workouts.forEach(workout => this._displayNewWorkout(workout));
    }



   // Private Methods/APIs //
    _displayCaloriesTotal(){
    const totalClaoriesEl = document.querySelector("#calories-total");
    totalClaoriesEl.textContent = this._totalCalories;
    }
    _displayCaloriesLimit(){
        const totalClaoriesEl = document.querySelector("#calories-limit");
        totalClaoriesEl.textContent = this._calorieLimit;
        }
    
    _displayCaloriesConsumed(){
        const totalClaoriesEl = document.querySelector("#calories-consumed");
        const consumedCalories = this._meals.reduce((total, meal) => total + meal.calories, 0);
        totalClaoriesEl.textContent = consumedCalories;
    }

    _displayCaloriesBurned(){
        const totalClaoriesEl = document.querySelector("#calories-burned");
        const burnedCalories = this._workouts.reduce((total, workout) => total + workout.calories, 0);
        totalClaoriesEl.textContent = burnedCalories;
    }

    _displayCaloriesRemaining(){
        const totalClaoriesEl = document.querySelector("#calories-remaining");
        const remainingCalories = this._calorieLimit - this._totalCalories;
        totalClaoriesEl.textContent = remainingCalories;
        
    }

    _displayCaloriesProgress(){
        const progressEl = document.querySelector("#calorie-progress");
        progressEl.style.width = `${(this._totalCalories / this._calorieLimit) * 100}%`;
    }

    _displayNewMeal(meal){
        const mealsEL = document.getElementById("meal-items");
        mealsEL.innerHTML += this.createCards('meal', meal)
    }
    _displayNewWorkout(workout){
        const workoutsEL = document.getElementById("workout-items");
        workoutsEL.innerHTML += this.createCards('workout', workout)
    }
    
    // helper funtion for the displaying meals and workouts
    createCards(type, items){
        let bgColor = '';
        let cardContent = '';
        const itemsEL = document.createElement('div');
        itemsEL.classList.add('card', 'my-2');
        itemsEL.setAttribute('data-id', items.id);

        if (type === 'meal'){
            bgColor = 'primary'
            cardContent = `
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${items.name}</h4>
                <div
                  class="fs-1 bg-${bgColor} text-white text-center rounded-2 px-2 px-sm-5"
                >
                  ${items.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
          `
        } else {
            bgColor = 'secondary'
            cardContent = `
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${items.name}</h4>
                <div
                  class="fs-1 bg-${bgColor} text-white text-center rounded-2 px-2 px-sm-5"
                >
                  ${items.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
          `
        }
        itemsEL.innerHTML += cardContent;
        return itemsEL.outerHTML;           
    }


    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}


class Meal{
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Workout{
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Storage{
    // we will use static functions/methods for this because we don't need to 
    // intantiate a Storage object for using the browser storgae.
    static getCalorieLimit(defaultLimit=2000){
        let calorieLimit;
        if (localStorage.getItem('calorieLimit') === null){
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit(calorieLimit){
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories(defaultCalaories=0){
        let totalCalories;
        if (localStorage.getItem('totalCalories') === null){
            totalCalories = defaultCalaories;
        } else {
            totalCalories = +localStorage.getItem('totalCalories');
        }
        return totalCalories;
    }

    static updateTotalCalories(totalCalories){
        localStorage.setItem('totalCalories', totalCalories);
    }

    static getMeals(){
        let meals;
        if (localStorage.getItem('meals') === null){
            meals = [];
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }
        return meals;

    }

    static saveMeals(meal){
        const meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));   
    }

    static getWorkouts(){
        let workouts;
        if (localStorage.getItem('workouts') === null){
            workouts = [];
        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;

    }

    static saveWorkouts(workout){
        const workouts = Storage.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));   
    }



}

class App{
    constructor(){
        
        this._tracker = new CalorieTracker();
        this._loadEventListeners();
        this._tracker.loadItmes();
    }

    _loadEventListeners(){
        // grabbing the forms' data
         document
        .getElementById("meal-form")
        .addEventListener('submit',this._newItem.bind(this,'meal'));
       
        document
        .getElementById("workout-form")
        .addEventListener('submit',this._newItem.bind(this,'workout'));

        document
        .getElementById("meal-items")
        .addEventListener('click',this._removeItem.bind(this,'meal'));

        document
        .getElementById("workout-items")
        .addEventListener('click',this._removeItem.bind(this,'workout'));
    
        document
        .getElementById("filter-meals")
        .addEventListener('keyup',this._filterItems.bind(this, 'meal'));

        document
        .getElementById("filter-workouts")
        .addEventListener('keyup',this._filterItems.bind(this, 'workout'));


        document
        .getElementById("reset")
        .addEventListener('click',this._reset.bind(this));

        document
        .getElementById("limit-form")
        .addEventListener('submit', this._setLimit.bind(this));

    }

    
    _newItem(type, e){
        e.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);
    
        // checkig for the correct values
        if (name.value === '' || +calories.value === ''){
            alert("Please fill all fields");
            return;
        }
        if (+calories.value < 0){
            alert("Calories must be a positive number");
            return;
        }

        if (type === 'meal'){
        const meal = new Meal(name.value, +calories.value);
        this._tracker.addMeal(meal);
        }   else {
        const workout = new Workout(name.value, +calories.value);
        this._tracker.addWorkout(workout);
        }

        // resetting the form 
        name.value = "";
        calories.value = "";

        // collapsing the forms
        const collapse = document.getElementById(`collapse-${type}`);
        const boCollapse = new bootstrap.Collapse(collapse,{
            toggle: true
        });
    }

    _removeItem(type, e){
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
            if(confirm('Are you sure?')){
                const id = e.target.closest('.card').getAttribute('data-id');
                type === 'meal' ?
                this._tracker.removeMeal(id) :
                this._tracker.removeWorkout(id);

                e.target.closest('.card').remove();
            }
        }
    }

    _filterItems(type, e){
        const filter = e.target.value.toLowerCase();
        const items = document.querySelectorAll(`#${type}-items .card`);
        items.forEach(item =>{
            const name = item.firstElementChild.firstElementChild.textContent;
            if(name.toLowerCase().indexOf(filter) !== -1){
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        })
}

    _reset(){
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';

    }

    _setLimit(e){
        e.preventDefault();
        let limit = document.getElementById('limit').value;
        // checkig for the correct values
        if (limit === '' || +limit < 0){
            alert("Limit must be a positive number");
            return;
        }

        this._tracker.setLimit(+limit);
        limit = '';

        const modalEl = document.getElementById('limit-modal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    }


}




const app = new App();
