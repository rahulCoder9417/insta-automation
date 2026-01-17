
// Types
export interface User {
  email: string;
  username: string;
  fullname: string;
  avatar: string;
}

export interface Notification {
  type: string;
  title: string;
  gotoUrl: string;
}

export interface DM {
  name: string;
  latestMessage: string;
  latestMessageAt: Date;
}

export interface Comment {
  name: string;
  title: string;
  time: Date;
}

export interface NewFollower {
  name: string;
  time: Date;
}

export interface EngagementRate {
  rate: number;
  percentageChange: number;
}

export interface MessagesSent {
  total: number;
  percentageChange: number;
}

export interface TotalFollowers {
  total: number;
  percentageChange: number;
}

export interface ProfileViews {
  views: number;
  percentageChange: number;
}

export interface ActiveAutomation {
  dm_flow: number;
  product_info_bot: number;
  comment_auto_reply: number;
}

export interface ScheduledPost {
  photo: string;
  title: string;
  time: Date;
}

// Store State Interface
export interface StoreState {
  user: User | null;
  notifications: Notification[];
  dms: DM[];
  comments: Comment[];
  newFollowers: NewFollower[];
  engagementRate: EngagementRate | null;
  messagesSent: MessagesSent | null;
  totalFollowers: TotalFollowers | null;
  profileViews: ProfileViews | null;
  activeAutomation: ActiveAutomation | null;
  scheduledPosts: ScheduledPost[];
   // Actions
   setUser: (user: User) => void;
   addNotification: (notification: Notification) => void;
   clearNotifications: () => void;
   addDM: (dm: DM) => void;
   addComment: (comment: Comment) => void;
   addNewFollower: (follower: NewFollower) => void;
   setEngagementRate: (rate: EngagementRate) => void;
   setMessagesSent: (messages: MessagesSent) => void;
   setTotalFollowers: (followers: TotalFollowers) => void;
   setProfileViews: (views: ProfileViews) => void;
   setActiveAutomation: (automation: ActiveAutomation) => void;
   addScheduledPost: (post: ScheduledPost) => void;
   removeScheduledPost: (index: number) => void;
   resetStore: () => void;
}