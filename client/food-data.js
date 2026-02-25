// client/food-data.js - COMPLETELY RECREATED
const foodDatabase = (function() {
    // Create fresh objects
    const foods = [
        { id: 1, name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { id: 2, name: "White Rice (1 cup)", calories: 205, protein: 4.3, carbs: 45, fat: 0.4 },
        { id: 3, name: "Egg (large)", calories: 72, protein: 6.3, carbs: 0.6, fat: 4.8 },
        { id: 4, name: "Banana (medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
        { id: 5, name: "Protein Shake (1 scoop)", calories: 120, protein: 24, carbs: 3, fat: 1 },
        { id: 6, name: "Broccoli (100g)", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
        { id: 7, name: "Salmon (100g)", calories: 208, protein: 20, carbs: 0, fat: 13 },
        { id: 8, name: "Apple (medium)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
        { id: 9, name: "Almonds (28g)", calories: 164, protein: 6, carbs: 6, fat: 14 },
        { id: 10, name: "Greek Yogurt (100g)", calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
        { id: 11, name: "Avocado (whole)", calories: 240, protein: 3, carbs: 12, fat: 22 },
        { id: 12, name: "Oatmeal (1 cup)", calories: 158, protein: 6, carbs: 27, fat: 3 },
        { id: 13, name: "Ground Beef (100g)", calories: 250, protein: 26, carbs: 0, fat: 17 },
        { id: 14, name: "Sweet Potato (medium)", calories: 103, protein: 2.3, carbs: 24, fat: 0.2 },
        { id: 15, name: "Milk (1 cup)", calories: 149, protein: 8, carbs: 12, fat: 8 }
    ];
    
    // Force create new objects to avoid reference issues
    return foods.map(food => ({
        id: Number(food.id),
        name: String(food.name),
        calories: Number(food.calories),
        protein: Number(food.protein),
        carbs: Number(food.carbs),
        fat: Number(food.fat)
    }));
})();