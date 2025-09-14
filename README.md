# Chat App

A real-time chat application built with Node.js, Express, Socket.IO, and MongoDB. This application allows users to register, login, send messages, and chat in real-time with other users.

## Features

- 🔐 **User Authentication**: Secure user registration and login with JWT tokens
- 💬 **Real-time Messaging**: Instant messaging using Socket.IO
- 👥 **User Management**: View all users and their online status
- 📸 **Image Sharing**: Send images in chat messages via Cloudinary
- 👁️ **Message Status**: Track seen/unseen messages
- 🎨 **Profile Management**: Update profile picture, bio, and full name
- 🔒 **Protected Routes**: Secure API endpoints with authentication middleware

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and management
- **CORS** - Cross-origin resource sharing

## Project Structure

```
Chat_App/
├── server/
│   ├── controllers/
│   │   ├── messageController.js    # Message-related API endpoints
│   │   └── userController.js       # User authentication and profile management
│   ├── lib/
│   │   ├── cloudinary.js          # Cloudinary configuration
│   │   ├── db.js                  # Database connection
│   │   └── utils.js               # Utility functions (JWT generation)
│   ├── middleware/
│   │   └── auth.js                # Authentication middleware
│   ├── models/
│   │   ├── message.js             # Message schema
│   │   └── User.js                # User schema
│   ├── routes/
│   │   ├── messageRoutes.js       # Message routes
│   │   └── userRoutes.js          # User routes
│   ├── server.js                  # Main server file
│   ├── package.json               # Dependencies and scripts
│   └── env.example                # Environment variables template
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Chat_App
```

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Environment Configuration
1. Copy the environment template:
```bash
cp env.example .env
```

2. Update the `.env` file with your configuration:
```env
# Database
MONGODB_URL=mongodb://localhost:27017

# JWT Secret (generate a strong secret key)
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Port
PORT=5000
```

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run server

# Production mode
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your .env file).

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register a new user
- `POST /login` - Login user
- `GET /get` - Get current user data (protected)
- `PUT /update-profile` - Update user profile (protected)

### Message Routes (`/api/messages`)
- `GET /users` - Get all users for sidebar (protected)
- `GET /:id` - Get messages with a specific user (protected)
- `POST /send/:id` - Send message to a user (protected)
- `PUT /mark/:id` - Mark message as seen (protected)

### Status Route
- `GET /api/status` - Check if server is running

## Socket.IO Events

### Client to Server
- `connection` - User connects with userId in query
- `disconnect` - User disconnects

### Server to Client
- `getOnlineUsers` - List of currently online user IDs
- `newMessage` - New message received

## Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  fullName: String (required),
  password: String (required, min 8 chars),
  profilePic: String (default: ""),
  bio: String,
  timestamps: true
}
```

### Message Model
```javascript
{
  senderId: ObjectId (ref: User, required),
  receiverId: ObjectId (ref: User, required),
  text: String,
  image: String,
  seen: Boolean (default: false),
  timestamps: true
}
```

## Recent Bug Fixes

The following bugs have been identified and fixed:

1. **Fixed undefined variables in login function** (`userController.js`)
   - Fixed `userData` → `user` in password comparison
   - Fixed `newUser` → `user` in token generation
   - Fixed `userData` → `user` in response

2. **Fixed missing file extension** (`messageController.js`)
   - Added `.js` extension to User model import

3. **Fixed route path** (`messageRoutes.js`)
   - Added missing `/` in mark message route

4. **Added environment template**
   - Created `env.example` file for easy setup

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- Input validation and sanitization
- CORS configuration

## Development Notes

- The application uses ES6 modules (`"type": "module"` in package.json)
- Socket.IO is configured with CORS enabled for all origins
- Real-time features include online user tracking and instant messaging
- Image uploads are handled through Cloudinary integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please open an issue in the repository.
