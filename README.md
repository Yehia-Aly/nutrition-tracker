# Nutrition Tracker - Full Stack JavaScript App


A complete nutrition tracking application built from scratch with vanilla JavaScript, Node.js, and Express. Calculate your BMR, search a database of common foods, log your meals, and track daily macros!

## ✨ Features

- **BMR Calculator** - Calculate your daily calorie needs based on age, weight, height, gender, and activity level
- **5 Activity Levels** - From sedentary to very active with accurate multipliers
- **Food Database** - 15+ common foods with complete macros (protein, carbs, fat)
- **Smart Search** - Search foods in real-time
- **Food Logging** - Add foods with adjustable serving sizes
- **Daily Totals** - Automatically calculates total calories and macros
- **Persistent Storage** - Your food log saves in browser localStorage
- **Tab Interface** - Clean navigation between Calculator, Food Log, and Progress sections
- **Responsive Design** - Works on desktop and mobile

## 🛠️ Built With

- **Frontend:** JavaScript (vanilla), HTML5, CSS3, Font Awesome icons
- **Backend:** Node.js, Express
- **Storage:** Browser localStorage, REST APIs
- **Tools:** Git, VS Code

## 🚀 Live Demo

[Coming Soon - Will deploy to Render/Heroku]

## 📸 Screenshots

![BMR and Calorie Calculator interface showing input fields for age, weight, height, gender selection, and activity level dropdown, with results displaying maintenance calories of 3079, weight loss target of 2463, and weight gain target of 3387](image.png)


## 🎯 How It Works

1. **Calculate your BMR** - Enter your stats in the Calculator tab
2. **Search for foods** - Type in the Food Log tab to find foods
3. **Log your meals** - Click on a food, adjust servings, add to log
4. **Track progress** - See daily totals update in real-time

## 💻 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/nutrition-tracker.git

# Navigate to project
cd nutrition-tracker

# Install backend dependencies
cd server
npm install

# Start the server
node server.js

# Open browser and go to:
http://localhost:3000
