# Dear Archibald 🐦‍⬛
*A Discord RPG Bot for Reflective Journaling and Connection*

## Overview

Dear Archibald is a low-barrier journaling RPG Discord bot that creates meaningful spaces for reflection and storytelling. Players create gathering places where animal visitors come seeking rest and connection, leading to thoughtful conversations guided by AI-generated prompts.

## Key Features

- **Gathering Places**: Create cozy refuges for weary travelers
- **Visitor System**: Dynamic animal NPCs with unique stories and needs  
- **Memory-Based Interactions**: Empathy-driven conversation mechanics
- **AI-Generated Gifts**: Personalized rewards based on scene interactions
- **Daily Limits**: Thoughtful pacing to encourage reflection over grinding
- **Collaborative Storytelling**: Multiple players can participate in scenes

---

## System Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                    DEAR ARCHIBALD BOT                       │
├─────────────────────────────────────────────────────────────┤
│  Discord.js Client                                          │
│  ├── Event Handlers (Commands, Buttons, Modals)            │
│  ├── MongoDB Database (Characters, Places, Daily Tracking) │
│  └── OpenAI Integration (Gift Generation)                  │
└─────────────────────────────────────────────────────────────┘

         ┌──────────────────┐         ┌──────────────────┐
         │   Discord Guild  │         │   MongoDB Atlas  │
         │                  │         │                  │
         │ ┌──────────────┐ │         │ ┌──────────────┐ │
         │ │   Channels   │◄┼─────────┼►│ GatheringPlace│ │
         │ │   Users      │ │         │ │   Character   │ │
         │ └──────────────┘ │         │ │ DailyTracker  │ │
         └──────────────────┘         │ └──────────────┘ │
                                      └──────────────────┘
                    ┌──────────────────┐
                    │   OpenAI API     │
                    │                  │
                    │ ┌──────────────┐ │
                    │ │ GPT-3.5-turbo│ │
                    │ │Gift Generator│ │
                    │ └──────────────┘ │
                    └──────────────────┘
```

### Data Flow Architecture

```
User Input (Discord) 
        ↓
Command/Button Handler
        ↓
Scene Manager (In-Memory)
        ↓
┌───────────────┬─────────────────┐
│ Database Ops  │   Game Logic    │
│ (MongoDB)     │   (Prompts)     │
└───────┬───────┴─────────┬───────┘
        ↓                 ↓
  Daily Tracking    Roll Mechanics
        ↓                 ↓
    Validation     Memory Updates
        ↓                 ↓
        └─────────┬───────┘
                  ↓
          Response Generation
                  ↓
         Discord API Response
```

---

## Game Mechanics

### 1. Gathering Place Creation
```
Player → /create-gathering-place → Modal Form
  ↓
- Type (Cafe, Park, Library)
- Location (Sunny Clearing, Cliff by Sea)  
- Purpose (Refuge from expectations)
- Two Descriptive Aspects
  ↓
Stored in MongoDB → Ready for visitors
```

### 2. Visitor Encounter System
```
/open-gathering-place → Daily Limit Check → Visitor Selection
    ↓
Random Visitor Based on Place Level
    ↓
Visitor Description + Memory Value (starts at 1)
    ↓
Roll d20 → Prompt Generation → Player Response
    ↓
Memory Adjustment (+3 to -3 based on interaction quality)
    ↓
Continue until Memory ≤ 0 (bad) or ≥ 6 (good)
```

### 3. Memory Mechanics
- **Memory Range**: 0-6, starts at 1
- **Positive Actions**: Listening, finding common ground (+1 to +3)
- **Negative Actions**: Empty advice, dismissive responses (-1 to -3)
- **Outcomes**:
  - Memory ≤ 0: Bad outcome, scene ends
  - Memory ≥ 6: Good outcome, scene ends
  - Memory 1-5: Continue interaction

### 4. Prompt System
- **20 Base Prompts**: First-time rolls for guild
- **20 Twist Prompts**: Repeated rolls (encouraging new experiences)
- **Roll Mechanics**: 
  - d20 for main prompts
  - d6 for twist resolution (±1 memory)
  - Reroll option (costs 1 memory)

---

## Technical Implementation

### Database Schema

**GatheringPlace**
```javascript
{
  gatheringPlaceId: Number (unique),
  guildId: String (Discord server),
  level: Number (visitor tier),
  type: String,
  location: String,  
  purpose: String,
  description: [String, String]
}
```

**Character** 
```javascript
{
  characterId: Number (unique),
  gatheringPlaceID: Number,
  userId: String (Discord user),
  name: String, // "Pip the Finch"
  mind: String, // "Wise"
  body: String, // "Agile" 
  strength: String, // "Acrobatics"
  flaw: String // "Clumsy"
}
```

**DailyTrackRecord**
```javascript
{
  guildId: String,
  rolled: [Number], // Tracks which prompts used today
  lastOpened: String // Date string
}
```

### Key Utilities

**Scene Manager** (In-Memory)
- Manages active visitor sessions per channel
- Tracks current visitor, prompts, and messages
- Handles scene lifecycle (start → interact → end)

**Daily Tracker**  
- Prevents prompt repetition within same day
- Limits one gathering place opening per day
- Tracks unique rolls to ensure fresh content

**Visitor System**
- Level-based visitor selection
- Randomized scenarios and dialogue
- Memory-driven conversation outcomes

---

## AI Integration

### Gift Generation System
```
Scene Completion → Message Log Collection
        ↓
OpenAI GPT-3.5-turbo Prompt:
- Act as "Archibald the Crow"
- Analyze scene themes and emotions
- Apply random lens (values, limitations, parables, etc.)
- Generate symbolic gift description
        ↓
Personalized gift delivered to players
```

**Gift Generation Lenses** (randomly selected):
1. Values noticed in the scene
2. Limitations characters faced  
3. Animal parable connections
4. Personally resonant moments
5. Character commonalities
6. Myth deconstructions
7. Symbolic lessons

---

## Command Reference

### Setup Commands
- `/start` - Introduction and setup guidance
- `/create-gathering-place` - Initialize your refuge
- `/create-character` - Define your persona  
- `/edit-gathering-place` - Modify existing place

### Gameplay Commands  
- `/open-gathering-place` - Begin visitor encounter (once/day)
- `/close-gathering-place` - End scene and receive AI gift

### Interaction Buttons
- **🎲 Roll 20** - Generate interaction prompt
- **🔄🎲 Reroll** - Spend memory to reroll (if memory > 1)
- **🎲 Roll 6** - Resolve twist scenarios
- **Submit Response** - Confirm your story contribution
- **🎁 End Scene & Receive Gift** - Complete encounter

### Admin Commands
- `/reset-daily-tracker` - Reset daily limits (admin only)

---

## Installation & Setup

📖 **[Complete Setup Manual](https://docs.google.com/document/d/1h9-BkunMmOcln1wVkRvPaHx0tFMPAqQ4vpoL-ScfvFg/edit?usp=sharing)**

For detailed step-by-step installation instructions, including screenshots and troubleshooting tips, see the comprehensive setup manual linked above.

### Quick Start Summary

#### Prerequisites
- Node.js 16+ 
- MongoDB database
- Discord Bot Token
- OpenAI API Key

#### Environment Variables
```bash
BOT_TOKEN=your_discord_bot_token
MONGODB_URI=your_mongodb_connection_string  
API_KEY=your_openai_api_key
```

#### Basic Installation
```bash
npm install
node src/index.js
```

#### Required Bot Permissions
- Read Messages
- Send Messages  
- Use Slash Commands
- Manage Channels (for welcome setup)
- Embed Links

> **Note**: For first-time setup or if you encounter issues, please refer to the [detailed setup manual](https://docs.google.com/document/d/1h9-BkunMmOcln1wVkRvPaHx0tFMPAqQ4vpoL-ScfvFg/edit?usp=sharing) which includes troubleshooting guides and platform-specific instructions.

---

## Design Philosophy

**Low-Barrier Journaling**: Simple mechanics encourage reflection without overwhelming complexity

**Empathy Over Efficiency**: Rewards listening and understanding over quick solutions

**Collaborative Storytelling**: Multiple players can participate in visitor encounters  

**Meaningful Pacing**: Daily limits prevent grinding, encourage thoughtful engagement

**AI-Enhanced Reflection**: Personalized gifts provide closure and insight

**Animal Wisdom Tradition**: Draws from fables and folklore for accessible metaphors

---

## Technical Highlights

### Modular Architecture
- **Separation of Concerns**: Commands, events, and utilities clearly separated
- **Event-Driven Design**: Discord.js event handlers with clean routing
- **Database Abstraction**: Mongoose models with manager utilities

### State Management
- **In-Memory Scenes**: Fast access for active interactions
- **Persistent Data**: MongoDB for long-term storage
- **Daily Tracking**: Ensures content freshness and pacing

### User Experience
- **Modal Forms**: Rich input collection for creation commands  
- **Interactive Buttons**: Smooth gameplay flow without command spam
- **Ephemeral Responses**: Clean channel experience with private feedback

### Error Handling
- **Graceful Degradation**: Fallbacks for missing data or API failures
- **User-Friendly Messages**: Clear error communication
- **Debug Logging**: Comprehensive logging for troubleshooting

---
