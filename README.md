# Life OS – Personal Intelligence Dashboard

## Overview

Life OS is a smart, AI-powered personal dashboard that transforms scattered data into **actionable life decisions**.

Instead of simply displaying information like weather, news, or schedules, Life OS analyzes multiple data sources in real-time and provides **intelligent suggestions, predictions, and warnings** to help users make better daily decisions.

> Think of it as a system that doesn't just show your life — it understands it.

---

## Purpose

Most applications today focus on **displaying data**, not interpreting it.

Life OS solves this by:

* Combining multiple APIs
* Understanding user context
* Delivering meaningful, real-world recommendations

The goal is to build a system that acts like a **decision engine for everyday life**.

---

## APIs Used

This project integrates multiple APIs from different domains to create a unified intelligence layer:

### Weather API

* Provides real-time weather data
* Used to suggest optimal activities and routines

### Geolocation API

* Detects user location
* Personalizes all recommendations

### News API

* Fetches relevant news
* Filters based on user context and location

### Text Analysis / NLP API

* Analyzes user input (notes, journal)
* Detects mood, stress, and patterns

### Calendar API

* Accesses user schedule
* Helps optimize daily planning

### Food API

* Suggests meals based on weather and health patterns

### Fitness API

* Recommends workouts based on activity level

### Transport API

* Provides traffic insights
* Suggests best travel timing

---

## Key Features

### Smart Morning Brief

* Personalized daily summary
* Combines weather, schedule, and news
* Suggests optimal plan for the day

---

### Decision Engine

Users can ask:

> "Should I go out today?"

System evaluates:

* Weather
* Traffic
* Schedule
* User condition

Returns:

* A clear, actionable recommendation

---

### Mood Detection System

* Analyzes user journal entries
* Detects burnout, stress, or low energy
* Suggests:

  * Breaks
  * Music
  * Light tasks

---

### Life Alerts & Warnings

* Overloaded schedule alerts
* Health/activity warnings
* Environmental alerts (rain, heat, etc.)

---

### Daily Life Score

* Tracks:

  * Productivity
  * Health
  * Consistency
* Gamifies personal growth

---

## Tech Stack

### Frontend

* React.js / JavaScript / TypeScript / Nexr.js
* Tailwind CSS / Framer / GSAP

### APIs & Services

* REST APIs from Public APIs repository
* Optional: Groq API for reasoning layer

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Heyykrishnna/WAP-PROJECT.git
cd WAP-PROJECT
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```
WEATHER_API_KEY=your_key
NEWS_API_KEY=your_key
GEO_API_KEY=your_key
```

---

### 4. Run the project

```bash
cd client
npm run dev
or
npx vite
```

---

## Future Improvements

* AI-based predictive planning
* Voice assistant integration
* Habit tracking system
* Mobile app version
* Personalized recommendation learning system

---

## Why This Project Matters

This is not just another API project.

It demonstrates:

* System design thinking
* Real-world problem solving
* Multi-API integration
* Intelligent data processing
