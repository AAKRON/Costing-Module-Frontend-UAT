# Costing Module Frontend - UAT

This is the UAT (User Acceptance Testing) version of the Costing Module Frontend, configured to work with the secure backend.

## 🔧 Backend Integration Changes

This frontend has been updated to work with the secure backend that features:
- **JWT Authentication** with Bearer tokens (60-minute expiry)
- **Enhanced Security Headers** and CORS restrictions
- **Rate Limiting** and attack protection
- **Environment-based Configuration**

## 🚀 Quick Setup

### Prerequisites
- Node.js 16+ 
- NPM or Yarn
- UAT Backend running (Costing-Module-Backend-UAT)

### Installation
```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your UAT backend URL

# Start development server
npm start
```

## ⚙️ Configuration

### Environment Variables
Create `.env.local` file:
```bash
REACT_APP_API_URL=http://localhost:3000/api/v1
```

For production UAT:
```bash
REACT_APP_API_URL=https://your-uat-backend.com/api/v1
```

## 🔐 Authentication Changes

### What Changed
1. **JWT Response**: Backend now returns only `{token}` instead of `{username, token, role}`
2. **Token Expiry**: Automatic handling of 60-minute JWT expiration
3. **Bearer Authentication**: Already using proper `Authorization: Bearer` headers

### Login Flow
1. User enters username/password
2. Frontend sends POST to `/api/v1/sessions`
3. Backend returns JWT token
4. Frontend decodes JWT to extract username/role
5. Token automatically expires after 60 minutes

## 🌐 CORS Configuration

The backend allows these origins:
- `https://uat.aakronline.com`
- `http://localhost:3000` (development)
- `https://staging.aakronline.com`

Make sure your frontend URL matches one of these origins.

## 🧪 Testing

### Manual Testing
1. **Start Backend**: Ensure UAT backend is running
2. **Start Frontend**: `npm start`
3. **Test Login**: Use valid credentials
4. **Check Token**: Verify JWT token in localStorage
5. **Test Expiry**: Wait 60 minutes or manually expire token

### Expected Behavior
- ✅ Login works with JWT tokens
- ✅ API requests include Bearer headers
- ✅ Token expiry redirects to login
- ✅ CORS restrictions applied
- ✅ Rate limiting on failed logins

## 📦 Deployment

### UAT Environment
```bash
# Build for UAT
npm run build

# Deploy to UAT server
# (Copy build/ directory to your UAT hosting)
```

### Environment Configuration
- Update `REACT_APP_API_URL` to production UAT backend
- Ensure CORS origins match your frontend domain
- Configure HTTPS for production

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Verify frontend URL is in backend CORS allowlist
   - Check browser console for specific CORS messages

2. **Authentication Failures**
   - Check backend is running and reachable
   - Verify `/sessions` endpoint returns JWT token
   - Check localStorage for token storage

3. **Token Expiry Issues**
   - JWT tokens expire after 60 minutes
   - Frontend will automatically redirect to login
   - Check browser console for token expiry logs

4. **Rate Limiting**
   - Backend limits login attempts (5 per username per 20 minutes)
   - General rate limit: 300 requests per 5 minutes per IP
   - Wait for limits to reset

### Debug Commands
```bash
# Check stored token
localStorage.getItem('token')

# Check token expiry
localStorage.getItem('tokenExpiry')

# Decode JWT payload (in browser console)
JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
```

## 🎯 Backend Compatibility

This frontend is compatible with:
- ✅ JWT Authentication with 60-minute expiry
- ✅ Bearer token authorization headers
- ✅ Enhanced security headers
- ✅ CORS restrictions
- ✅ Rate limiting
- ✅ Environment-based secrets management

## 📞 Support

For issues with:
- **Authentication**: Check JWT token format and expiry
- **API Calls**: Verify backend URL and Bearer headers
- **CORS**: Confirm frontend domain in backend allowlist