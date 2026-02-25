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

![image alt](https://github.com/Yehia-Aly/nutrition-tracker/blob/1c413cbd2ebd72ec096c353d9bdd76a3e33cdd29/Screenshot%20(270).png)
![image alt](https://github.com/Yehia-Aly/nutrition-tracker/blob/b06ed49630feaaac4a0da2af921f8a96d8ce641e/Screenshot%20(271).png)


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

🔧 API Endpoints
POST /api/calculate-bmr - Calculate BMR based on user stats

GET /api/test - Test if server is running

🎨 Future Features
User authentication with MongoDB

Weight tracking and progress charts

Custom food creation

Meal categories (Breakfast, Lunch, Dinner)

Weekly/Monthly reports

Image recognition for food logging

📝 License
Feel free to use this code for learning and inspiration! 
If you build something cool with it, give credit where it's due 🙏

📬 Contact
Yehia Aly - yehiiaaly@gmail.com

Project Link: https://github.com/Yehia-Aly/nutrition-tracker

🙏 Acknowledgments
Built while learning full-stack JavaScript

Inspired by MacroFactor and MyFitnessPal
