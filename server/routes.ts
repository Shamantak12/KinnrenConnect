import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertPostSchema, insertCommentSchema, insertStorySchema, insertFamilyEventSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Mock user endpoint for demo
  app.get('/api/auth/user', async (req, res) => {
    res.json({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      familyId: "family-1"
    });
  });

  // Mock endpoints for demo - return sample data
  app.get('/api/posts', async (req, res) => {
    res.json([
      {
        id: 1,
        content: "Having a wonderful family dinner tonight! 🍽️",
        createdAt: new Date().toISOString(),
        user: {
          firstName: "Sarah",
          lastName: "Johnson",
          profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        isLiked: false,
        isBookmarked: false
      },
      {
        id: 2,
        content: "Kids' soccer game today - they played amazingly! ⚽",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        user: {
          firstName: "Mike",
          lastName: "Smith",
          profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        isLiked: true,
        isBookmarked: false
      }
    ]);
  });

  app.get('/api/stories', async (req, res) => {
    res.json([
      {
        id: 1,
        content: "Beach day with the family!",
        mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop",
        createdAt: new Date().toISOString(),
        user: {
          firstName: "Emma",
          lastName: "Wilson",
          profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        isViewed: false
      }
    ]);
  });

  app.get('/api/bookmarks', async (req, res) => {
    res.json([
      {
        id: 1,
        content: "Family recipe for grandma's apple pie 🥧",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        user: {
          firstName: "Mary",
          lastName: "Davis",
          profileImageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
        }
      }
    ]);
  });

  app.get('/api/events', async (req, res) => {
    res.json([
      {
        id: 1,
        title: "Family Reunion",
        description: "Annual family gathering at the park",
        date: new Date(Date.now() + 86400000 * 7).toISOString(),
        location: "Central Park"
      },
      {
        id: 2,
        title: "Birthday Party",
        description: "Little Tommy's 8th birthday",
        date: new Date(Date.now() + 86400000 * 14).toISOString(),
        location: "Home"
      }
    ]);
  });

  app.get('/api/timecapsules', async (req, res) => {
    res.json([
      {
        id: 1,
        title: "2024 Family Memories",
        description: "Collection of our best moments this year",
        openDate: new Date(Date.now() + 86400000 * 365).toISOString(),
        isLocked: true
      }
    ]);
  });

  app.get('/api/anonymous-messages', async (req, res) => {
    res.json([
      {
        id: 1,
        content: "I'm proud of how our family supports each other ❤️",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        content: "Thank you for always being there for me",
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ]);
  });

  // POST endpoints that return success responses
  app.post('/api/posts', async (req, res) => {
    res.json({ id: Date.now(), message: "Post created successfully" });
  });

  app.post('/api/posts/:id/like', async (req, res) => {
    res.json({ message: "Post liked successfully" });
  });

  app.post('/api/posts/:id/bookmark', async (req, res) => {
    res.json({ message: "Post bookmarked successfully" });
  });

  app.post('/api/comments', async (req, res) => {
    res.json({ id: Date.now(), message: "Comment created successfully" });
  });

  app.post('/api/stories', async (req, res) => {
    res.json({ id: Date.now(), message: "Story created successfully" });
  });

  app.post('/api/events', async (req, res) => {
    res.json({ id: Date.now(), message: "Event created successfully" });
  });

  app.post('/api/anonymous-messages', async (req, res) => {
    res.json({ id: Date.now(), message: "Message sent successfully" });
  });

  const httpServer = createServer(app);

  // WebSocket server for real-time chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              id: Date.now(),
              content: data.content,
              createdAt: new Date().toISOString(),
              type: 'anonymous-message'
            }));
          }
        });
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  return httpServer;
}