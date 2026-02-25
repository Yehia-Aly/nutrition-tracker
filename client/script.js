// client/script.js - COMPLETE BULLETPROOF VERSION
console.log("🔥 Nutrition Tracker v1.0 - Script loaded!");

// ===== ULTRA-SAFE PROPERTY GETTER =====
function getFoodProp(food, propName) {
    if (!food || typeof food !== 'object') return 0;
    
    // Try all possible property names
    const possibleNames = [
        propName, // original
        propName.toLowerCase(), // protein
        propName.toUpperCase(), // PROTEIN
        propName.charAt(0).toUpperCase() + propName.slice(1).toLowerCase() // Protein
    ];
    
    // Also try common variations
    const variations = {
        'protein': ['protein', 'Protein', 'PROTEIN', 'prot', 'Prot'],
        'carbs': ['carbs', 'Carbs', 'CARBS', 'carbohydrates', 'Carbohydrates'],
        'fat': ['fat', 'Fat', 'FAT', 'fats', 'Fats'],
        'calories': ['calories', 'Calories', 'CALORIES', 'cal', 'Cal']
    };
    
    // Add variations if they exist
    if (variations[propName]) {
        possibleNames.push(...variations[propName]);
    }
    
    // Try each possible name
    for (let name of possibleNames) {
        if (food[name] !== undefined && food[name] !== null) {
            const value = Number(food[name]);
            return isNaN(value) ? 0 : value;
        }
    }
    
    // Last resort: check all properties case-insensitively
    for (let key in food) {
        if (key.toLowerCase() === propName.toLowerCase()) {
            const value = Number(food[key]);
            return isNaN(value) ? 0 : value;
        }
    }
    
    return 0;
}

// ===== NORMALIZE FOOD OBJECT =====
function normalizeFood(food) {
    if (!food) return null;
    
    return {
        id: Number(food.id) || 0,
        name: String(food.name || 'Unknown Food'),
        calories: getFoodProp(food, 'calories'),
        protein: getFoodProp(food, 'protein'),
        carbs: getFoodProp(food, 'carbs'),
        fat: getFoodProp(food, 'fat')
    };
}

// ===== MAIN CODE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM loaded - Initializing app...");
    
    // ===== TAB SWITCHING =====
    console.log("Setting up tabs...");
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            console.log(`Switching to tab: ${this.getAttribute('data-tab')}`);
            
            // Remove active from all
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // ===== BMR CALCULATOR =====
    console.log("Setting up BMR calculator...");
    const bmrForm = document.getElementById('bmrForm');
    
    if (bmrForm) {
        bmrForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log("📊 Calculating BMR...");
            
            // Get values
            const age = document.getElementById('age').value;
            const weight = document.getElementById('weight').value;
            const height = document.getElementById('height').value;
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const activity = document.getElementById('activity').value;
            
            console.log("User data:", { age, weight, height, gender, activity });
            
            // Loading state
            const button = this.querySelector('.calculate-btn');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
            button.disabled = true;
            
            try {
                // Send to server
                const response = await fetch('/api/calculate-bmr', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        age: parseInt(age),
                        weight: parseFloat(weight),
                        height: parseFloat(height),
                        gender: gender,
                        activity: activity
                    })
                });
                
                if (!response.ok) throw new Error(`Server error: ${response.status}`);
                
                const data = await response.json();
                console.log("Server response:", data);
                
                // Update page
                document.getElementById('bmrValue').textContent = data.bmr;
                document.getElementById('maintenance').textContent = data.maintenance;
                document.getElementById('weightLoss').textContent = data.weightLoss;
                document.getElementById('weightGain').textContent = data.weightGain;
                
                // Show results
                const resultsDiv = document.getElementById('results');
                resultsDiv.classList.remove('hidden');
                resultsDiv.style.opacity = '1';
                
                console.log("✅ BMR calculated successfully!");
                
            } catch (error) {
                console.error("❌ BMR calculation failed:", error);
                alert(`Error: ${error.message}\n\nMake sure server is running: node server/server.js`);
            } finally {
                button.innerHTML = originalText;
                button.disabled = false;
            }
        });
    }
    
    // ===== FOOD LOGGING SYSTEM =====
    console.log("Setting up food logging...");
    
    // Check if food database loaded
    if (typeof foodDatabase === 'undefined') {
        console.error("❌ CRITICAL: foodDatabase not loaded!");
        alert("Food database failed to load. Check food-data.js");
        return;
    }
    
    console.log(`✅ Food database loaded with ${foodDatabase.length} items`);
    
    // Get elements
    const foodSearch = document.getElementById('food-search');
    const foodResults = document.getElementById('food-results');
    const addFoodBtn = document.getElementById('add-food-btn');
    const servingsInput = document.getElementById('servings');
    const foodLogList = document.getElementById('food-log-list');
    
    if (!foodSearch || !foodResults || !addFoodBtn || !servingsInput || !foodLogList) {
        console.error("❌ Missing food logging elements!");
        return;
    }
    
    let selectedFood = null;
    
    // === FOOD SEARCH FUNCTION ===
    foodSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        console.log(`🔍 Searching for: "${searchTerm}"`);
        
        if (searchTerm.length < 1) {
            foodResults.style.display = 'none';
            return;
        }
        
        // Filter foods
        const filteredFoods = foodDatabase.filter(food => 
            (food.name || '').toLowerCase().includes(searchTerm)
        );
        
        console.log(`Found ${filteredFoods.length} matches`);
        
        if (filteredFoods.length > 0) {
            // Create HTML for results - USING SAFE GETTER
            foodResults.innerHTML = filteredFoods.map(food => {
                // Use safe getter for all properties
                const protein = getFoodProp(food, 'protein');
                const carbs = getFoodProp(food, 'carbs');
                const fat = getFoodProp(food, 'fat');
                const calories = getFoodProp(food, 'calories');
                
                return `
                <div class="food-result-item" data-food-id="${food.id}">
                    <strong>${food.name || 'Unknown'}</strong><br>
                    <small>${calories} cal | P: ${protein}g | C: ${carbs}g | F: ${fat}g</small>
                </div>
                `;
            }).join('');
            
            foodResults.style.display = 'block';
            
            // Add click handlers
            document.querySelectorAll('.food-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const foodId = parseInt(this.getAttribute('data-food-id'));
                    const rawFood = foodDatabase.find(f => f.id === foodId);
                    
                    if (!rawFood) {
                        console.error("❌ Could not find food with ID:", foodId);
                        alert("Error: Food not found in database");
                        return;
                    }
                    
                    // NORMALIZE the food object
                    selectedFood = normalizeFood(rawFood);
                    
                    console.log(`✅ Selected food:`, selectedFood);
                    
                    foodSearch.value = selectedFood.name;
                    foodResults.style.display = 'none';
                });
            });
            
        } else {
            foodResults.innerHTML = '<div class="food-result-item">No foods found. Try "chicken", "egg", "rice"</div>';
            foodResults.style.display = 'block';
        }
    });
    
    // === ADD FOOD FUNCTION ===
    addFoodBtn.addEventListener('click', function() {
        console.log("➕ Add Food button clicked");
        
        if (!selectedFood) {
            alert('❌ Please select a food first!\n\n1. Type in search box\n2. CLICK on a food from the list\n3. Then click "Add to Log"');
            return;
        }
        
        console.log("Selected food:", selectedFood);
        
        const servings = parseFloat(servingsInput.value) || 1;
        console.log(`Adding ${servings} serving(s) of ${selectedFood.name}`);
        
        // CREATE FOOD LOG ITEM
        const foodLogItem = {
            id: Date.now(),
            foodId: selectedFood.id,
            name: selectedFood.name,
            servings: servings,
            calories: Number(selectedFood.calories * servings),
            protein: Number(selectedFood.protein * servings),
            carbs: Number(selectedFood.carbs * servings),
            fat: Number(selectedFood.fat * servings),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        // Double-check all numbers
        foodLogItem.calories = Number(foodLogItem.calories) || 0;
        foodLogItem.protein = Number(foodLogItem.protein) || 0;
        foodLogItem.carbs = Number(foodLogItem.carbs) || 0;
        foodLogItem.fat = Number(foodLogItem.fat) || 0;
        
        console.log("Created food item:", foodLogItem);
        
        // Get current log from localStorage
        let foodLog = JSON.parse(localStorage.getItem('nutrition_food_log')) || [];
        console.log("Current log has", foodLog.length, "items");
        
        // Add new item
        foodLog.push(foodLogItem);
        
        // Save back to localStorage
        localStorage.setItem('nutrition_food_log', JSON.stringify(foodLog));
        
        console.log(`✅ Food added! Total items: ${foodLog.length}`);
        
        // Update display
        updateFoodLogDisplay();
        
        // Reset form
        foodSearch.value = '';
        selectedFood = null;
        servingsInput.value = 1;
        foodResults.style.display = 'none';
        
        // Show success message
        alert(`✅ Added ${servings} serving${servings > 1 ? 's' : ''} of ${foodLogItem.name}`);
    });
    
    // === UPDATE FOOD LOG DISPLAY ===
    function updateFoodLogDisplay() {
        console.log("🔄 Updating food log display...");
        
        // Get log from localStorage
        let foodLog = [];
        try {
            const logData = localStorage.getItem('nutrition_food_log');
            foodLog = logData ? JSON.parse(logData) : [];
        } catch (error) {
            console.error("Error reading localStorage:", error);
            foodLog = [];
        }
        
        console.log(`📊 Found ${foodLog.length} items in log`);
        
        // Clear container
        foodLogList.innerHTML = '';
        
        if (foodLog.length === 0) {
            // Show empty message
            foodLogList.innerHTML = '<p class="empty-message">No foods logged yet. Add some above!</p>';
        } else {
            console.log(`📋 Creating HTML for ${foodLog.length} items...`);
            
            // Create HTML for each item
            foodLog.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'food-log-item';
                itemDiv.setAttribute('data-id', item.id);
                
                // Ensure all values are numbers
                const protein = Number(item.protein) || 0;
                const carbs = Number(item.carbs) || 0;
                const fat = Number(item.fat) || 0;
                const calories = Number(item.calories) || 0;
                const name = item.name || 'Unknown Food';
                const timestamp = item.timestamp || '';
                const servings = Number(item.servings) || 1;
                
                itemDiv.innerHTML = `
                    <div>
                        <strong>${name}</strong><br>
                        <small>${timestamp} • ${servings} serving${servings > 1 ? 's' : ''}</small>
                    </div>
                    <div style="text-align: right;">
                        <div>${Math.round(calories)} cal</div>
                        <small>P: ${protein.toFixed(1)}g | C: ${carbs.toFixed(1)}g | F: ${fat.toFixed(1)}g</small>
                        <button class="remove-food" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                foodLogList.appendChild(itemDiv);
            });
            
            console.log(`✅ Display: Added ${foodLog.length} items to page`);
            
            // Add remove button handlers
            document.querySelectorAll('.remove-food').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    console.log(`🗑️ Removing item ID: ${itemId}`);
                    removeFoodItem(itemId);
                });
            });
        }
        
        // Update totals
        updateTotals();
    }
    
    // === REMOVE FOOD ITEM ===
    function removeFoodItem(itemId) {
        console.log(`🗑️ Removing item ${itemId} from localStorage...`);
        
        let foodLog = JSON.parse(localStorage.getItem('nutrition_food_log')) || [];
        const initialLength = foodLog.length;
        
        // Filter out the item to remove
        foodLog = foodLog.filter(item => item.id !== itemId);
        
        if (foodLog.length < initialLength) {
            // Save updated log
            localStorage.setItem('nutrition_food_log', JSON.stringify(foodLog));
            console.log(`✅ Item removed. Now ${foodLog.length} items`);
            
            // Update display
            updateFoodLogDisplay();
            
            alert('✅ Food removed from log!');
        } else {
            console.error("❌ Item not found for removal!");
        }
    }
    
    // === UPDATE TOTALS ===
    function updateTotals() {
        const foodLog = JSON.parse(localStorage.getItem('nutrition_food_log')) || [];
        console.log(`📈 Calculating totals from ${foodLog.length} items...`);
        
        // Calculate totals with safe defaults
        const totals = foodLog.reduce((acc, item) => {
            acc.calories += Number(item.calories) || 0;
            acc.protein += Number(item.protein) || 0;
            acc.carbs += Number(item.carbs) || 0;
            acc.fat += Number(item.fat) || 0;
            return acc;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
        
        console.log("📈 Totals calculated:", totals);
        
        // Update page elements
        document.getElementById('total-calories').textContent = Math.round(totals.calories);
        document.getElementById('total-protein').textContent = totals.protein.toFixed(1) + 'g';
        document.getElementById('total-carbs').textContent = totals.carbs.toFixed(1) + 'g';
        document.getElementById('total-fat').textContent = totals.fat.toFixed(1) + 'g';
        
        console.log("✅ Totals updated on page");
    }
    
    // === INITIALIZE ===
    console.log("🚀 Initializing food log display...");
    updateFoodLogDisplay();
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.food-results') && !event.target.closest('#food-search')) {
            foodResults.style.display = 'none';
        }
    });
    
    console.log("✅ All systems ready! Try logging some food!");
});

// Test server connection
fetch('/api/test')
    .then(response => {
        if (response.ok) {
            console.log("✅ Server connection: OK");
        } else {
            console.warn("⚠️ Server test failed");
        }
    })
    .catch(error => {
        console.error("❌ Server not responding. Run: node server/server.js");
    });