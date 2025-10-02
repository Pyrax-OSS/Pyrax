# Authentication Implementation Plan - Rust + Bun FFI + Hono

## Phase 1: Rust Core Authentication Library

### 1.1 Project Structure Setup
- Create Rust workspace with separate crates for auth logic and FFI bindings
- Set up `Cargo.toml` with dependencies: `tokio`, `serde`, `serde_json`, `sqlx`, `rand`, `chrono`, `argon2`, `reqwest`
- Configure build to generate C-compatible dynamic library (.dll for Windows)

### 1.2 Database Layer
- Create database connection pool manager
- Implement repository pattern for users, sessions, OTP codes, and roles
- Write SQL queries leveraging existing schema for users, sessions, OTP verification, and role management

### 1.3 Core Authentication Functions
- **Registration**: Validate and create user with full name, username, email
- **OTP Generation**: Generate secure 6-digit codes with expiration timestamps
- **OTP Storage**: Store OTP codes with email association and expiry tracking
- **OTP Verification**: Validate OTP code against stored values and check expiration
- **Session Management**: Create fast sessions with token generation and role attachment
- **Role Management**: Assign and retrieve user roles from database

### 1.4 Resend Integration
- Create HTTP client for Resend API
- Build email template for OTP delivery
- Implement retry logic and error handling for email sending
- Add configuration for API keys and email domains

## Phase 2: FFI Bridge Layer

### 2.1 C-Compatible Interface
- Define FFI-safe function signatures using `#[no_mangle]` and `extern "C"`
- Create serialization layer converting Rust types to C-compatible strings/primitives
- Implement error handling that crosses FFI boundary safely

### 2.2 Core Exposed Functions
- `register_user(full_name, username, email) -> Result<user_id>`
- `send_otp(email) -> Result<otp_sent_confirmation>`
- `verify_otp(email, code) -> Result<session_token>`
- `validate_session(token) -> Result<user_with_roles>`
- `revoke_session(token) -> Result<success>`
- `get_user_roles(user_id) -> Result<roles_array>`

### 2.3 Memory Management
- Implement proper string allocation/deallocation for cross-FFI data
- Create cleanup functions for resources
- Add memory safety guards to prevent leaks

## Phase 3: Bun FFI Integration

### 3.1 FFI Bindings Setup
- Use Bun's `bun:ffi` to load the compiled Rust library
- Define TypeScript types matching Rust FFI signatures
- Create symbol mappings for all exposed Rust functions

### 3.2 TypeScript Wrapper Layer
- Build async TypeScript wrappers around FFI calls
- Implement JSON parsing for complex return types
- Add TypeScript error handling and type conversions
- Create connection pool initialization

### 3.3 Helper Utilities
- Build result parsers to handle Rust's `Result` types
- Create TypeScript interfaces for User, Session, Role types
- Implement logging and debugging utilities

## Phase 4: Hono API Integration

### 4.1 Authentication Routes
- `POST /auth/register` - Registration endpoint
- `POST /auth/login` - Email submission for OTP
- `POST /auth/verify` - OTP verification endpoint
- `POST /auth/logout` - Session termination
- `GET /auth/me` - Current user with roles

### 4.2 Middleware
- Session validation middleware calling Rust FFI
- Role-based authorization middleware
- Rate limiting for OTP requests
- Request validation middleware

### 4.3 Context Enhancement
- Extend Hono context with authenticated user
- Add role checking helpers
- Implement session refresh logic

## Phase 5: Security & Configuration

### 5.1 Configuration Management
- Environment variables for database connection
- Resend API key configuration
- OTP expiration time settings
- Session duration configuration
- CORS and security headers

### 5.2 Security Measures
- Rate limiting on OTP generation (prevent spam)
- OTP attempt limiting (prevent brute force)
- Secure session token generation
- Input validation and sanitization
- SQL injection prevention (parameterized queries)

## Phase 6: Testing & Deployment

### 6.1 Testing Strategy
- Rust unit tests for auth logic
- Integration tests for FFI boundary
- API endpoint tests with Bun test
- Load testing for session validation

### 6.2 Build & Deployment
- Rust compilation pipeline for target platforms
- Dynamic library placement strategy
- Environment-specific configuration
- Error monitoring setup

## Key Technical Considerations

- **FFI Performance**: Minimize FFI calls by batching where possible
- **Error Propagation**: Ensure errors from Rust are properly surfaced to API layer
- **Async Handling**: Rust async runtime (Tokio) coordination with Bun's event loop
- **Connection Pooling**: Share database connections efficiently across FFI calls
- **OTP Cleanup**: Background job to purge expired OTP codes
- **Session Rotation**: Implement token refresh mechanism for long-lived sessions
