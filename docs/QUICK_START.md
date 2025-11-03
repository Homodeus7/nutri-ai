# Quick Start Guide - Authentication with Mocks

## TL;DR

This project has a fully functional sign-in form with **mock API** mode for development.

## Get Started in 3 Steps

### 1. Install Dependencies (if not already done)
```bash
npm install
```

### 2. Configure Environment
The `.env` file is already configured for mock mode:
```bash
NEXT_PUBLIC_USE_MOCK_API=true
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000/sign-in` and you're ready to test!

## Testing Sign-In

The mock API will accept **any email and password**. Try:

```
Email: test@example.com
Password: password123
```

You'll see:
- Real-time validation (Zod)
- Loading states
- Success toast notification
- Redirect after successful login

## What's Working

✅ Sign-in form with validation
✅ TanStack Form integration
✅ Zod validation schemas
✅ Mock API responses (MSW)
✅ Auth store (Zustand + localStorage)
✅ Toast notifications
✅ Loading states

## Mock vs Production Mode

### Development (Current Setup)
```bash
# .env
NEXT_PUBLIC_USE_MOCK_API=true
```
- Uses MSW to mock API responses
- No backend needed
- Returns faker-generated data
- Perfect for frontend development

### Production Mode
```bash
# .env
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_BASE_URL=https://your-api.com/api
```
- Connects to real API
- Requires backend server
- Uses actual authentication

## File Structure (Key Files)

```
src/
├── pages/
│   └── sign-in/
│       └── ui/sign-in.page.tsx         # Sign-in page component
├── features/
│   └── auth/
│       ├── sign-in/
│       │   ├── model/
│       │   │   ├── sign-in.schema.ts   # Zod validation
│       │   │   └── use-sign-in.ts      # Auth hook
│       │   └── index.ts
│       └── sign-up/                    # Ready for future implementation
├── entities/
│   └── auth/
│       └── model/auth.store.ts         # Auth state management
├── shared/
│   ├── ui/
│   │   └── form/
│   │       ├── form-input-field.tsx    # Reusable form components
│   │       └── form-password-input.tsx
│   ├── lib/
│   │   └── msw/
│   │       ├── browser.ts              # MSW setup
│   │       ├── init-msw.ts             # MSW initialization
│   │       └── msw-provider.tsx        # MSW React provider
│   └── api/
│       └── generated/                  # Auto-generated API code + mocks
```

## Console Messages

When running in mock mode, you'll see:
```
🔧 Mock API mode enabled
✅ MSW started successfully
[MSW] Mocking enabled.
```

When making a sign-in request:
```
[MSW] POST /auth/login (200 OK)
```

## Browser Developer Tools

### Check Auth State
Open browser console and type:
```javascript
// View stored auth data
localStorage.getItem('auth-storage')
```

### Network Tab
- See intercepted requests
- Inspect mock responses
- Verify request payloads

## Next Steps

### Add More Auth Features
The infrastructure is ready for:
- Sign-up page (schema and hook already created)
- Forgot password
- Reset password
- Social login (Google OAuth)

### Switch to Real API
1. Update `.env`:
   ```bash
   NEXT_PUBLIC_USE_MOCK_API=false
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3333/api
   ```
2. Start your backend server
3. Restart Next.js dev server

## Troubleshooting

### MSW Not Working?
1. Check console for error messages
2. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Verify `.env` has `NEXT_PUBLIC_USE_MOCK_API=true`
4. Restart dev server: `npm run dev`

### Form Not Validating?
- Validation happens on field change (after you start typing)
- Submit button is disabled while request is pending
- Error messages appear below fields

### No Toast Notifications?
- Check if Toaster is rendered (should be in `app-provider.tsx`)
- Inspect browser console for errors

## Documentation

- 📚 [MSW Setup Guide](./MSW_SETUP.md) - Detailed MSW documentation
- 🔐 [Auth Implementation](./AUTH_IMPLEMENTATION.md) - Authentication architecture
- 📋 [API Generation](./API_GENERATION.md) - How API code is generated (if exists)

## Help

If you encounter issues:
1. Check console for error messages
2. Review documentation files
3. Verify environment variables
4. Try hard refresh in browser

Happy coding! 🚀
