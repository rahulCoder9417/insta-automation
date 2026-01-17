import { create } from 'zustand';
import type { StoreState, User, Notification, DM, Comment, NewFollower, EngagementRate, MessagesSent, TotalFollowers, ProfileViews, ActiveAutomation, ScheduledPost } from '../../types/types';
// Initial State
const initialState = {
  user: null,
  notifications: [],
  dms: [],
  comments: [],
  newFollowers: [],
  engagementRate: null,
  messagesSent: null,
  totalFollowers: null,
  profileViews: null,
  activeAutomation: null,
  scheduledPosts: [],
};

// Create Store
export const useStore = create<StoreState>((set) => ({
  ...initialState,

  setUser: (user: User) => set({ user }),

  addNotification: (notification: Notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  clearNotifications: () => set({ notifications: [] }),

  addDM: (dm: DM) =>
    set((state) => ({
      dms: [...state.dms, dm],
    })),

  addComment: (comment: Comment) =>
    set((state) => ({
      comments: [...state.comments, comment],
    })),

  addNewFollower: (follower: NewFollower) =>
    set((state) => ({
      newFollowers: [...state.newFollowers, follower],
    })),

  setEngagementRate: (rate: EngagementRate) => set({ engagementRate: rate }),

  setMessagesSent: (messages: MessagesSent) => set({ messagesSent: messages }),

  setTotalFollowers: (followers: TotalFollowers) => set({ totalFollowers: followers }),

  setProfileViews: (views: ProfileViews) => set({ profileViews: views }),

  setActiveAutomation: (automation: ActiveAutomation) => set({ activeAutomation: automation }),

  addScheduledPost: (post: ScheduledPost) =>
    set((state) => ({
      scheduledPosts: [...state.scheduledPosts, post],
    })),

  removeScheduledPost: (index: number) =>
    set((state) => ({
      scheduledPosts: state.scheduledPosts.filter((_, i) => i !== index),
    })),

  resetStore: () => set(initialState),
}));