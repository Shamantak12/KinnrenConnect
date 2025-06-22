import {
  users,
  families,
  posts,
  comments,
  likes,
  stories,
  storyViews,
  bookmarks,
  familyEvents,
  timeCapsules,
  anonymousMessages,
  type User,
  type UpsertUser,
  type Family,
  type InsertFamily,
  type Post,
  type InsertPost,
  type Comment,
  type InsertComment,
  type Story,
  type InsertStory,
  type FamilyEvent,
  type InsertFamilyEvent,
  type TimeCapsule,
  type AnonymousMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, gt } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Family operations
  createFamily(family: InsertFamily): Promise<Family>;
  getFamily(id: string): Promise<Family | undefined>;
  getFamilyMembers(familyId: string): Promise<User[]>;
  joinFamily(userId: string, familyId: string): Promise<void>;
  
  // Post operations
  createPost(post: InsertPost): Promise<Post>;
  getFamilyPosts(familyId: string, limit?: number): Promise<(Post & { user: User; isLiked?: boolean; isBookmarked?: boolean })[]>;
  getPost(id: number): Promise<Post | undefined>;
  deletePost(id: number, userId: string): Promise<void>;
  
  // Like operations
  likePost(postId: number, userId: string): Promise<void>;
  unlikePost(postId: number, userId: string): Promise<void>;
  isPostLiked(postId: number, userId: string): Promise<boolean>;
  
  // Comment operations
  createComment(comment: InsertComment): Promise<Comment>;
  getPostComments(postId: number): Promise<(Comment & { user: User })[]>;
  deleteComment(id: number, userId: string): Promise<void>;
  
  // Bookmark operations
  bookmarkPost(postId: number, userId: string): Promise<void>;
  unbookmarkPost(postId: number, userId: string): Promise<void>;
  isPostBookmarked(postId: number, userId: string): Promise<boolean>;
  getUserBookmarks(userId: string): Promise<(Post & { user: User })[]>;
  
  // Story operations
  createStory(story: InsertStory): Promise<Story>;
  getFamilyStories(familyId: string): Promise<(Story & { user: User; isViewed?: boolean })[]>;
  viewStory(storyId: number, userId: string): Promise<void>;
  getActiveStories(familyId: string): Promise<(Story & { user: User })[]>;
  
  // Family event operations
  createFamilyEvent(event: InsertFamilyEvent): Promise<FamilyEvent>;
  getFamilyEvents(familyId: string): Promise<FamilyEvent[]>;
  
  // Anonymous chat operations
  createAnonymousMessage(familyId: string, content: string): Promise<AnonymousMessage>;
  getAnonymousMessages(familyId: string, limit?: number): Promise<AnonymousMessage[]>;
  
  // Time capsule operations
  getFamilyTimeCapsules(familyId: string): Promise<TimeCapsule[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Family operations
  async createFamily(family: InsertFamily): Promise<Family> {
    const [newFamily] = await db.insert(families).values(family).returning();
    return newFamily;
  }

  async getFamily(id: string): Promise<Family | undefined> {
    const [family] = await db.select().from(families).where(eq(families.id, id));
    return family;
  }

  async getFamilyMembers(familyId: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.familyId, familyId));
  }

  async joinFamily(userId: string, familyId: string): Promise<void> {
    await db.update(users).set({ familyId }).where(eq(users.id, userId));
  }

  // Post operations
  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async getFamilyPosts(familyId: string, limit = 20): Promise<(Post & { user: User; isLiked?: boolean; isBookmarked?: boolean })[]> {
    const result = await db
      .select({
        post: posts,
        user: users,
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.familyId, familyId))
      .orderBy(desc(posts.createdAt))
      .limit(limit);

    return result.map(({ post, user }) => ({ ...post, user }));
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async deletePost(id: number, userId: string): Promise<void> {
    await db.delete(posts).where(and(eq(posts.id, id), eq(posts.userId, userId)));
  }

  // Like operations
  async likePost(postId: number, userId: string): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.insert(likes).values({ postId, userId });
      await tx
        .update(posts)
        .set({ likesCount: sql`${posts.likesCount} + 1` })
        .where(eq(posts.id, postId));
    });
  }

  async unlikePost(postId: number, userId: string): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.delete(likes).where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
      await tx
        .update(posts)
        .set({ likesCount: sql`${posts.likesCount} - 1` })
        .where(eq(posts.id, postId));
    });
  }

  async isPostLiked(postId: number, userId: string): Promise<boolean> {
    const [like] = await db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
    return !!like;
  }

  // Comment operations
  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db.transaction(async (tx) => {
      const [comment_] = await tx.insert(comments).values(comment).returning();
      await tx
        .update(posts)
        .set({ commentsCount: sql`${posts.commentsCount} + 1` })
        .where(eq(posts.id, comment.postId));
      return [comment_];
    });
    return newComment;
  }

  async getPostComments(postId: number): Promise<(Comment & { user: User })[]> {
    const result = await db
      .select({
        comment: comments,
        user: users,
      })
      .from(comments)
      .innerJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));

    return result.map(({ comment, user }) => ({ ...comment, user }));
  }

  async deleteComment(id: number, userId: string): Promise<void> {
    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    if (comment && comment.userId === userId) {
      await db.transaction(async (tx) => {
        await tx.delete(comments).where(eq(comments.id, id));
        await tx
          .update(posts)
          .set({ commentsCount: sql`${posts.commentsCount} - 1` })
          .where(eq(posts.id, comment.postId));
      });
    }
  }

  // Bookmark operations
  async bookmarkPost(postId: number, userId: string): Promise<void> {
    await db.insert(bookmarks).values({ postId, userId });
  }

  async unbookmarkPost(postId: number, userId: string): Promise<void> {
    await db.delete(bookmarks).where(and(eq(bookmarks.postId, postId), eq(bookmarks.userId, userId)));
  }

  async isPostBookmarked(postId: number, userId: string): Promise<boolean> {
    const [bookmark] = await db
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.postId, postId), eq(bookmarks.userId, userId)));
    return !!bookmark;
  }

  async getUserBookmarks(userId: string): Promise<(Post & { user: User })[]> {
    const result = await db
      .select({
        post: posts,
        user: users,
      })
      .from(bookmarks)
      .innerJoin(posts, eq(bookmarks.postId, posts.id))
      .innerJoin(users, eq(posts.userId, users.id))
      .where(eq(bookmarks.userId, userId))
      .orderBy(desc(bookmarks.createdAt));

    return result.map(({ post, user }) => ({ ...post, user }));
  }

  // Story operations
  async createStory(story: InsertStory): Promise<Story> {
    const [newStory] = await db.insert(stories).values(story).returning();
    return newStory;
  }

  async getFamilyStories(familyId: string): Promise<(Story & { user: User; isViewed?: boolean })[]> {
    const result = await db
      .select({
        story: stories,
        user: users,
      })
      .from(stories)
      .innerJoin(users, eq(stories.userId, users.id))
      .where(and(eq(stories.familyId, familyId), gt(stories.expiresAt, new Date())))
      .orderBy(desc(stories.createdAt));

    return result.map(({ story, user }) => ({ ...story, user }));
  }

  async viewStory(storyId: number, userId: string): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.insert(storyViews).values({ storyId, userId });
      await tx
        .update(stories)
        .set({ viewsCount: sql`${stories.viewsCount} + 1` })
        .where(eq(stories.id, storyId));
    });
  }

  async getActiveStories(familyId: string): Promise<(Story & { user: User })[]> {
    const result = await db
      .select({
        story: stories,
        user: users,
      })
      .from(stories)
      .innerJoin(users, eq(stories.userId, users.id))
      .where(and(eq(stories.familyId, familyId), gt(stories.expiresAt, new Date())))
      .orderBy(desc(stories.createdAt));

    return result.map(({ story, user }) => ({ ...story, user }));
  }

  // Family event operations
  async createFamilyEvent(event: InsertFamilyEvent): Promise<FamilyEvent> {
    const [newEvent] = await db.insert(familyEvents).values(event).returning();
    return newEvent;
  }

  async getFamilyEvents(familyId: string): Promise<FamilyEvent[]> {
    return await db
      .select()
      .from(familyEvents)
      .where(eq(familyEvents.familyId, familyId))
      .orderBy(desc(familyEvents.eventDate));
  }

  // Anonymous chat operations
  async createAnonymousMessage(familyId: string, content: string): Promise<AnonymousMessage> {
    const [message] = await db
      .insert(anonymousMessages)
      .values({ familyId, content })
      .returning();
    return message;
  }

  async getAnonymousMessages(familyId: string, limit = 50): Promise<AnonymousMessage[]> {
    return await db
      .select()
      .from(anonymousMessages)
      .where(eq(anonymousMessages.familyId, familyId))
      .orderBy(desc(anonymousMessages.createdAt))
      .limit(limit);
  }

  // Time capsule operations
  async getFamilyTimeCapsules(familyId: string): Promise<TimeCapsule[]> {
    return await db
      .select()
      .from(timeCapsules)
      .where(eq(timeCapsules.familyId, familyId))
      .orderBy(desc(timeCapsules.createdAt));
  }
}

export const storage = new DatabaseStorage();
