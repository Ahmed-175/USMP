# Post Controllers - Organized Structure

## Overview
The post controllers have been reorganized from a single large file (`post.controller.ts`) into multiple focused, maintainable files. This structure improves code organization, readability, and maintainability.

## Directory Structure
```
controllers/post/
├── index.ts                 # Main export file
├── public.controller.ts     # Public routes (no auth)
├── crud.controller.ts       # CRUD operations
├── interaction.controller.ts # Like, view, share operations
└── status.controller.ts     # Publish, archive operations
```

## Architecture Flow
```
Routes (postRoutes.routes.ts)
    ↓
Index (controllers/post/index.ts)
    ↓
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  Public         │  CRUD           │  Interaction    │  Status         │
│  Controller     │  Controller     │  Controller     │  Controller     │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ • getAllPosts   │ • createPost    │ • likePost      │ • publishPost   │
│ • getPostById   │ • updatePost    │ • unlikePost    │ • archivePost   │
│ • searchPosts   │ • deletePost    │ • addView       │ • unarchivePost │
│ • getTrending   │                 │ • sharePost     │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
    ↓
Database Models (Post, User)
```

## File Organization

### 1. `index.ts` - Main Export File
**Purpose**: Central export point for all post controllers
**Exports**: All controller functions organized by category
**Benefits**: 
- Single import point for routes
- Clear organization of exports
- Easy to maintain and update

### 2. `public.controller.ts` - Public Routes
**Purpose**: Handles routes that don't require authentication
**Controllers**:
- `getAllPosts` - Get all published posts with pagination
- `getPostById` - Get single post by ID
- `searchPosts` - Search posts by content, title, or tags
- `getTrendingPosts` - Get trending posts based on engagement

**Features**:
- Pagination support
- Advanced filtering
- Search functionality
- Trending algorithm

### 3. `crud.controller.ts` - CRUD Operations
**Purpose**: Handles basic Create, Read, Update, Delete operations
**Controllers**:
- `createPost` - Create new post
- `updatePost` - Update existing post
- `deletePost` - Delete post

**Features**:
- Author-only operations for update/delete
- Comprehensive validation
- User-post relationship management
- Cleanup operations on delete

### 4. `interaction.controller.ts` - User Interactions
**Purpose**: Handles user interactions with posts
**Controllers**:
- `likePost` - Like a post
- `unlikePost` - Remove like from post
- `addView` - Add unique view to post
- `sharePost` - Share post with platform tracking

**Features**:
- Duplicate prevention
- User-post relationship tracking
- Platform-specific sharing
- Unique view tracking

### 5. `status.controller.ts` - Status Management
**Purpose**: Handles post status changes
**Controllers**:
- `publishPost` - Publish draft post
- `archivePost` - Archive post
- `unarchivePost` - Restore archived post

**Features**:
- Author-only operations
- Status validation
- State transition management

## Benefits of This Structure

### 1. **Maintainability**
- Each file has a single responsibility
- Easier to locate and modify specific functionality
- Reduced cognitive load when working on specific features

### 2. **Scalability**
- Easy to add new controllers to appropriate files
- Clear separation of concerns
- Modular architecture

### 3. **Team Collaboration**
- Multiple developers can work on different files simultaneously
- Clear ownership of different functionalities
- Reduced merge conflicts

### 4. **Code Organization**
- Logical grouping of related functions
- Consistent naming conventions
- Clear file purposes

### 5. **Testing**
- Easier to write focused unit tests
- Clear test boundaries
- Better test organization

## Import Usage

### In Routes File
```typescript
import {
  // Public controllers
  getAllPosts,
  getPostById,
  getTrendingPosts,
  searchPosts,
  // CRUD controllers
  createPost,
  updatePost,
  deletePost,
  // Interaction controllers
  likePost,
  unlikePost,
  addView,
  sharePost,
  // Status controllers
  publishPost,
  archivePost,
  unarchivePost
} from "../controllers/post";
```

### Individual File Imports (if needed)
```typescript
// Import specific controller groups
import { getAllPosts, getPostById } from "../controllers/post/public.controller";
import { createPost, updatePost } from "../controllers/post/crud.controller";
```

## Adding New Controllers

### 1. **Determine the Category**
- **Public**: No authentication required
- **CRUD**: Basic data operations
- **Interaction**: User interactions
- **Status**: Status management

### 2. **Add to Appropriate File**
```typescript
// Example: Adding to interaction.controller.ts
export const newInteractionController = async (req: Request, res: Response) => {
  // Implementation
};
```

### 3. **Export from Index**
```typescript
// Add to index.ts
export {
  // ... existing exports
  newInteractionController
} from './interaction.controller';
```

### 4. **Update Routes**
```typescript
// Add to routes file
import { newInteractionController } from "../controllers/post";
```

## Best Practices

### 1. **File Naming**
- Use descriptive names that indicate purpose
- Follow consistent naming conventions
- Use kebab-case for file names

### 2. **Function Organization**
- Group related functions together
- Use consistent parameter patterns
- Maintain consistent error handling

### 3. **Documentation**
- Add JSDoc comments for complex functions
- Document any special requirements
- Keep README files updated

### 4. **Testing**
- Create corresponding test files
- Test each controller group separately
- Maintain high test coverage

## Migration Notes

### What Changed
- Single `post.controller.ts` file split into 4 focused files
- Added new `unarchivePost` controller
- Improved error handling and validation
- Enhanced population of related data

### What Stayed the Same
- All existing API endpoints work exactly the same
- Response formats remain consistent
- Authentication requirements unchanged
- Database operations unchanged

### Backward Compatibility
- All existing routes continue to work
- No breaking changes to API
- Same import structure in routes file
- Consistent error responses

This organized structure makes the codebase more maintainable, scalable, and easier to work with while maintaining all existing functionality.
