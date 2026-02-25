// server/server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('../client'));

// BMR Calculation API
app.post('/api/calculate-bmr', (req, res) => {
    console.log("📊 BMR Calculation Request:", req.body);
    
    const { age, weight, height, gender, activity } = req.body;
    
    // Validate
    if (!age || !weight || !height || !gender || !activity) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };
    
    const tdee = bmr * (activityMultipliers[activity] || 1.2);
    
    // Response
    res.json({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        maintenance: Math.round(tdee),
        mildLoss: Math.round(tdee * 0.9),
        weightLoss: Math.round(tdee * 0.8),
        weightGain: Math.round(tdee * 1.1)
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Nutrition Tracker API is working!',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 BMR API: POST http://localhost:${PORT}/api/calculate-bmr`);
    console.log(`🩺 Health check: GET http://localhost:${PORT}/api/test`);
});
    
