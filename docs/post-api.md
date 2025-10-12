# Post API Documentation

This document describes all the available endpoints for the Post API in the USMP application.

## Base URL
```
/api/posts
```

## Authentication
Some endpoints require authentication. Include the `accessToken` cookie in your requests for protected routes.

---

## Public Routes (No Authentication Required)

### 1. Get All Posts
**GET** `/api/posts`

Retrieves a paginated list of published posts.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of posts per page (default: 10)
- `status` (optional): Filter by status - "published", "draft", "archived" (default: "published")
- `sortBy` (optional): Sort field - "createdAt", "updatedAt", "engagementScore", "likedCount" (default: "createdAt")
- `sortOrder` (optional): Sort order - "asc", "desc" (default: "desc")

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "post_id",
        "title": "Post Title",
        "content": "Post content...",
        "images": ["image_url1", "image_url2"],
        "author": {
          "_id": "user_id",
          "username": "username",
          "avatar": "avatar_url"
        },
        "community": {
          "_id": "community_id",
          "name": "Community Name"
        },
        "category": {
          "_id": "category_id",
          "name": "Category Name"
        },
        "likes": ["user_id1", "user_id2"],
        "likedCount": 2,
        "views": {
          "users": ["user_id1"],
          "count": 1
        },
        "shares": {
          "users": ["user_id1"],
          "count": 1
        },
        "comments": ["comment_id1"],
        "commentsCount": 1,
        "tags": ["tag1", "tag2"],
        "status": "published",
        "engagementScore": 15.5,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 2. Get Post by ID
**GET** `/api/posts/:id`

Retrieves a single post by its ID.

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "data": {
    "post": {
      // Same structure as above with full populated data
    }
  }
}
```

### 3. Get Trending Posts
**GET** `/api/posts/trending/all`

Retrieves trending posts based on engagement score.

**Query Parameters:**
- `limit` (optional): Number of posts to return (default: 10)
- `timeFrame` (optional): Time frame filter - "7d", "30d", "90d", "all" (default: "7d")

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      // Array of trending posts
    ]
  }
}
```

### 4. Search Posts
**GET** `/api/posts/search`

Search posts by content, title, or tags.

**Query Parameters:**
- `q` (required): Search query string
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of posts per page (default: 10)
- `sortBy` (optional): Sort field (default: "createdAt")
- `sortOrder` (optional): Sort order - "asc", "desc" (default: "desc")

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      // Array of matching posts
    ],
    "query": "search term",
    "pagination": {
      // Pagination info
    }
  }
}
```

---

## Protected Routes (Authentication Required)

### 5. Create Post
**POST** `/api/posts`

Creates a new post.

**Request Body:**
```json
{
  "title": "Post Title (optional, max 200 chars)",
  "content": "Post content (required, max 2000 chars)",
  "images": ["image_url1", "image_url2"],
  "community": "community_id (optional)",
  "category": "category_id (optional)",
  "tags": ["tag1", "tag2"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "post": {
      // Created post data
    }
  }
}
```

### 6. Update Post
**PUT** `/api/posts/:id`

Updates an existing post (only by the author).

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Request Body:**
```json
{
  "title": "Updated Title (optional)",
  "content": "Updated content (optional)",
  "images": ["new_image_url"],
  "category": "new_category_id (optional)",
  "tags": ["new_tag1", "new_tag2"],
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "post": {
      // Updated post data
    }
  }
}
```

### 7. Delete Post
**DELETE** `/api/posts/:id`

Deletes a post (only by the author).

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

### 8. Like Post
**POST** `/api/posts/:id/like`

Likes a post.

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "message": "Post liked successfully",
  "data": {
    "likedCount": 5
  }
}
```

### 9. Unlike Post
**POST** `/api/posts/:id/unlike`

Removes like from a post.

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "message": "Post unliked successfully",
  "data": {
    "likedCount": 4
  }
}
```

### 10. Add View
**POST** `/api/posts/:id/view`

Adds a unique view to a post.

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "message": "View added successfully",
  "data": {
    "viewCount": 10
  }
}
```

### 11. Share Post
**POST** `/api/posts/:id/share`

Shares a post.

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Request Body:**
```json
{
  "platform": "internal" // or "facebook", "twitter", "linkedin", "whatsapp"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post shared successfully",
  "data": {
    "shareCount": 3
  }
}
```

### 12. Publish Post
**PUT** `/api/posts/:id/publish`

Publishes a draft post.

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "message": "Post published successfully",
  "data": {
    "post": {
      // Updated post data with status: "published"
    }
  }
}
```

### 13. Archive Post
**PUT** `/api/posts/:id/archive`

Archives a post.

**Path Parameters:**
- `id`: Post ID (MongoDB ObjectId)

**Response:**
```json
{
  "success": true,
  "message": "Post archived successfully",
  "data": {
    "post": {
      // Updated post data with status: "archived"
    }
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"] // For validation errors
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

---

## Data Models

### Post Status
- `draft`: Post is not published yet
- `published`: Post is live and visible to public
- `archived`: Post is archived and hidden

### Engagement Score Calculation
The engagement score is automatically calculated based on:
- Likes: 2 points each
- Comments: 3 points each
- Shares: 4 points each
- Views: 0.5 points each

### Validation Rules
- **Title**: Optional, max 200 characters
- **Content**: Required, max 2000 characters
- **Images**: Optional, max 10 images, must be valid URLs
- **Tags**: Optional, max 10 tags, each max 30 characters
- **Community/Category**: Optional, must be valid MongoDB ObjectIds

