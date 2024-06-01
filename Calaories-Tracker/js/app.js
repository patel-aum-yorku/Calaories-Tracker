class CalorieTracker {
   constructor(){
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
   }

   // Public Methods/APIs //
   addMeal(meal){
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    // we have to render every time we add item
    this._render();
   }
   addWorkout(workout){
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
      // we have to render every time we add item
    this._render();
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

const tracker = new CalorieTracker();
const breakFast = new Meal("Breakfast", 400);
const lunch = new Meal("Lunch", 500);
const dinner = new Meal("Dinner", 600);

tracker.addMeal(breakFast);
tracker.addMeal(lunch);
tracker.addMeal(dinner);

const run = new Workout("Run", 300);
const gym = new Workout("Gym", 500);

tracker.addWorkout(run);
tracker.addWorkout(gym);


console.log(tracker);