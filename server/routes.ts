import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertPostSchema, insertCommentSchema, insertStorySchema, insertFamilyEventSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Family routes
  app.post('/api/families', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { name, description } = req.body;
      
      const familyId = `family_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const family = await storage.createFamily({
        id: familyId,
        name,
        description,
        createdBy: userId,
      });
      
      // Join the family
      await storage.joinFamily(userId, familyId);
      
      res.json(family);
    } catch (error) {
      console.error("Error creating family:", error);
      res.status(500).json({ message: "Failed to create family" });
    }
  });

  app.post('/api/families/:familyId/join', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { familyId } = req.params;
      
      await storage.joinFamily(userId, familyId);
      res.json({ message: "Joined family successfully" });
    } catch (error) {
      console.error("Error joining family:", error);
      res.status(500).json({ message: "Failed to join family" });
    }
  });

  app.get('/api/families/:familyId/members', isAuthenticated, async (req, res) => {
    try {
      const { familyId } = req.params;
      const members = await storage.getFamilyMembers(familyId);
      res.json(members);
    } catch (error) {
      console.error("Error fetching family members:", error);
      res.status(500).json({ message: "Failed to fetch family members" });
    }
  });

  // Post routes
  app.post('/api/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to create posts" });
      }

      const validatedData = insertPostSchema.parse({
        ...req.body,
        userId,
        familyId: user.familyId,
      });

      const post = await storage.createPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.get('/api/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to view posts" });
      }

      const posts = await storage.getFamilyPosts(user.familyId);
      
      // Add like and bookmark status for each post
      const postsWithStatus = await Promise.all(
        posts.map(async (post) => ({
          ...post,
          isLiked: await storage.isPostLiked(post.id, userId),
          isBookmarked: await storage.isPostBookmarked(post.id, userId),
        }))
      );

      res.json(postsWithStatus);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // Like routes
  app.post('/api/posts/:postId/like', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postId = parseInt(req.params.postId);
      
      const isLiked = await storage.isPostLiked(postId, userId);
      if (isLiked) {
        await storage.unlikePost(postId, userId);
      } else {
        await storage.likePost(postId, userId);
      }

      res.json({ liked: !isLiked });
    } catch (error) {
      console.error("Error toggling like:", error);
      res.status(500).json({ message: "Failed to toggle like" });
    }
  });

  // Comment routes
  app.post('/api/posts/:postId/comments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postId = parseInt(req.params.postId);

      const validatedData = insertCommentSchema.parse({
        ...req.body,
        postId,
        userId,
      });

      const comment = await storage.createComment(validatedData);
      res.json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  app.get('/api/posts/:postId/comments', isAuthenticated, async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const comments = await storage.getPostComments(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  // Bookmark routes
  app.post('/api/posts/:postId/bookmark', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const postId = parseInt(req.params.postId);
      
      const isBookmarked = await storage.isPostBookmarked(postId, userId);
      if (isBookmarked) {
        await storage.unbookmarkPost(postId, userId);
      } else {
        await storage.bookmarkPost(postId, userId);
      }

      res.json({ bookmarked: !isBookmarked });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      res.status(500).json({ message: "Failed to toggle bookmark" });
    }
  });

  app.get('/api/bookmarks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookmarks = await storage.getUserBookmarks(userId);
      res.json(bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      res.status(500).json({ message: "Failed to fetch bookmarks" });
    }
  });

  // Story routes
  app.post('/api/stories', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to create stories" });
      }

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // Stories expire after 24 hours

      const validatedData = insertStorySchema.parse({
        ...req.body,
        userId,
        familyId: user.familyId,
        expiresAt,
      });

      const story = await storage.createStory(validatedData);
      res.json(story);
    } catch (error) {
      console.error("Error creating story:", error);
      res.status(500).json({ message: "Failed to create story" });
    }
  });

  app.get('/api/stories', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to view stories" });
      }

      const stories = await storage.getActiveStories(user.familyId);
      res.json(stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  app.post('/api/stories/:storyId/view', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storyId = parseInt(req.params.storyId);
      
      await storage.viewStory(storyId, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error viewing story:", error);
      res.status(500).json({ message: "Failed to view story" });
    }
  });

  // Family events routes
  app.post('/api/events', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to create events" });
      }

      const validatedData = insertFamilyEventSchema.parse({
        ...req.body,
        familyId: user.familyId,
        createdBy: userId,
      });

      const event = await storage.createFamilyEvent(validatedData);
      res.json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  app.get('/api/events', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to view events" });
      }

      const events = await storage.getFamilyEvents(user.familyId);
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Anonymous chat routes
  app.post('/api/anonymous-chat', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to send anonymous messages" });
      }

      const { content } = req.body;
      const message = await storage.createAnonymousMessage(user.familyId, content);
      
      // Broadcast to WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'anonymous_message',
            data: message,
          }));
        }
      });

      res.json(message);
    } catch (error) {
      console.error("Error sending anonymous message:", error);
      res.status(500).json({ message: "Failed to send anonymous message" });
    }
  });

  app.get('/api/anonymous-chat', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to view anonymous messages" });
      }

      const messages = await storage.getAnonymousMessages(user.familyId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching anonymous messages:", error);
      res.status(500).json({ message: "Failed to fetch anonymous messages" });
    }
  });

  // Time capsule routes
  app.get('/api/time-capsules', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.familyId) {
        return res.status(400).json({ message: "User must be part of a family to view time capsules" });
      }

      const timeCapsules = await storage.getFamilyTimeCapsules(user.familyId);
      res.json(timeCapsules);
    } catch (error) {
      console.error("Error fetching time capsules:", error);
      res.status(500).json({ message: "Failed to fetch time capsules" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket server for real-time features
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received:', data);

        // Handle different message types
        switch (data.type) {
          case 'ping':
            ws.send(JSON.stringify({ type: 'pong' }));
            break;
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  return httpServer;
}
