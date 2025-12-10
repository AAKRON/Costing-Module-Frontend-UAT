# Railway Deployment Guide - Costing Module Frontend UAT

## 🚀 Quick Deploy Frontend to Railway

### Prerequisites
1. Backend deployed to Railway first (get the URL)
2. Railway account: https://railway.app  
3. GitHub integration enabled

### Frontend Deployment Steps

#### 1. Deploy Backend First
Make sure your backend is deployed and you have the Railway URL like:
```
https://your-backend-name.up.railway.app
```

#### 2. Create New Project for Frontend
```bash
# Go to railway.app
# Click "New Project"
# Select "Deploy from GitHub repo" 
# Choose: AAKRON/Costing-Module-Frontend-UAT
```

#### 3. Configure Environment Variables
In Railway dashboard, add this environment variable:

```
REACT_APP_API_URL=https://your-backend-name.up.railway.app/api/v1
```

**Example:**
```
REACT_APP_API_URL=https://costing-backend-uat.up.railway.app/api/v1
```

#### 4. Update CORS in Backend
After frontend deployment, update backend CORS to include frontend URL:

```ruby
# In backend config/initializers/cors.rb
origins 'https://your-frontend-name.up.railway.app',
        'https://your-backend-name.up.railway.app', 
        'https://uat.aakronline.com',
        'http://localhost:3000'
```

#### 5. Redeploy Backend with Updated CORS
After updating CORS, redeploy the backend service in Railway.

## ✅ Deployment Verification

### Test Frontend Access
```bash
# Visit your frontend URL
https://your-frontend-name.up.railway.app

# Should show the login page
```

### Test Login Flow  
1. **Create Test User** (via backend Railway console):
   ```ruby
   User.create(username: 'testuser', password: 'password123', role: 'admin')
   ```

2. **Login via Frontend**:
   - Go to frontend URL
   - Enter: username=testuser, password=password123
   - Should successfully log in and redirect to dashboard

3. **Verify JWT Token**:
   - Open browser dev tools → localStorage
   - Should see `token`, `username`, `role`, `tokenExpiry`

## 🔧 Environment Configuration

### Production Environment Variables
```bash
# Frontend (Railway dashboard)
REACT_APP_API_URL=https://your-backend.up.railway.app/api/v1

# Backend (Railway dashboard) 
RAILS_ENV=production
RACK_ENV=production
SECRET_KEY_BASE=your_generated_secret
SENTRY_DSN=your_sentry_dsn
NEW_RELIC_LICENSE_KEY=your_newrelic_key
ITEM_TYPE_UPDATE_APIKEY=your_api_key
```

## 🌐 Custom Domains (Optional)

### Backend Domain
```bash
# In backend Railway dashboard:
# Settings → Domains → Add Domain
# Example: api-uat.aakronline.com
```

### Frontend Domain  
```bash
# In frontend Railway dashboard:
# Settings → Domains → Add Domain
# Example: uat.aakronline.com
```

### Update Environment After Custom Domains
```bash
# Update frontend environment:
REACT_APP_API_URL=https://api-uat.aakronline.com/api/v1

# Update backend CORS:
origins 'https://uat.aakronline.com',
        'https://api-uat.aakronline.com'
```

## 🧪 Complete Testing Checklist

### ✅ Authentication Flow
- [ ] Frontend loads without errors
- [ ] Login form appears
- [ ] Valid credentials authenticate successfully  
- [ ] Invalid credentials show error
- [ ] JWT token stored in localStorage
- [ ] Token automatically expires after 60 minutes

### ✅ API Integration
- [ ] Dashboard loads data from backend
- [ ] All CRUD operations work (Create, Read, Update, Delete)
- [ ] Bearer tokens sent with all requests
- [ ] 401 errors redirect to login

### ✅ Security Features  
- [ ] Security headers present (check Network tab)
- [ ] Rate limiting works (try 15+ rapid requests)
- [ ] CORS blocks unauthorized origins
- [ ] No hardcoded secrets in frontend source

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```bash
   # Check browser console for CORS error
   # Update backend cors.rb with frontend Railway URL
   # Redeploy backend
   ```

2. **Authentication Errors**
   ```bash
   # Check backend logs in Railway dashboard
   # Verify SECRET_KEY_BASE is set in backend
   # Test backend /sessions endpoint directly
   ```

3. **Environment Variable Issues**
   ```bash
   # Check frontend build logs for REACT_APP_API_URL
   # Verify backend URL is correct and accessible
   # Test backend health endpoint
   ```

4. **Build Failures**
   ```bash
   # Check Railway build logs
   # Verify package.json has all dependencies
   # Check Node.js version compatibility
   ```

### Debug Commands

#### Frontend (Browser Console)
```javascript
// Check environment
console.log(process.env.REACT_APP_API_URL)

// Check stored token
localStorage.getItem('token')

// Decode JWT payload
JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
```

#### Backend (Railway Console)
```ruby
# Test user creation
User.create(username: 'debug', password: 'test123', role: 'admin')

# Check environment
ENV['SECRET_KEY_BASE']
ENV['SENTRY_DSN']

# Test JWT encoding
payload = { sub: 1, username: 'test', role: 'admin' }
token = JwtService.encode(payload)
JwtService.decode(token)
```

## 🎯 Success Criteria

**Deployment Successful When:**
- ✅ Frontend accessible via Railway URL
- ✅ Login works with test credentials
- ✅ JWT tokens generated and stored
- ✅ API calls authenticated with Bearer tokens
- ✅ Token expiry redirects to login
- ✅ All security headers present
- ✅ Rate limiting functional

## 💰 Railway Costs

**Estimated Monthly Cost:**
- **Backend Service**: $5/month (Hobby plan)
- **PostgreSQL**: Included
- **Redis**: Included  
- **Frontend Service**: $5/month (Hobby plan)
- **Total**: ~$10/month for complete UAT environment

## 🎉 Next Steps

1. **Deploy Backend** → Get Railway URL
2. **Deploy Frontend** → Configure with backend URL
3. **Update CORS** → Include frontend URL in backend
4. **Test Everything** → Complete authentication flow
5. **Optional**: Set up custom domains
6. **Ready for UAT!** 🚀