import { useEffect, useRef } from 'react';
import { useStore } from '@/utils/zustand/zustand';

// Module-scoped flag to avoid reloading in hot-reloads
let hasLoaded = false;

export function useLoadDummyData() {
  const addDM = useStore((s) => s.addDM);
  const addComment = useStore((s) => s.addComment);
  const addNewFollower = useStore((s) => s.addNewFollower);
  const setEngagementRate = useStore((s) => s.setEngagementRate);
  const setMessagesSent = useStore((s) => s.setMessagesSent);
  const setTotalFollowers = useStore((s) => s.setTotalFollowers);
  const setProfileViews = useStore((s) => s.setProfileViews);
  const setActiveAutomation = useStore((s) => s.setActiveAutomation);
  const setUser = useStore((s) => s.setUser);
  const addScheduledPost = useStore((s) => s.addScheduledPost);

  const loadedRef = useRef(false);

  useEffect(() => {
    if (hasLoaded || loadedRef.current) return;
    hasLoaded = true;
    loadedRef.current = true;

    // Basic user
    setUser({
      email: 'demo@insta.dev',
      username: 'insta_demo',
      fullname: 'Insta Demo',
      avatar: 'https://i.pravatar.cc/100?img=12',
    });

    const now = new Date();

    // Helper to shift days
    const daysAgo = (days: number, minutesOffset = 0) => {
      const d = new Date(now);
      d.setDate(now.getDate() - days);
      d.setMinutes(d.getMinutes() - minutesOffset);
      return d;
    };

    // DMs across last 7 days
    const dms = [
      { name: 'sarah.design', latestMessage: 'Hey! I saw your latest post...', latestMessageAt: daysAgo(0, 2) },
      { name: 'mike_photo', latestMessage: "Thanks for reaching out! Here's more info...", latestMessageAt: daysAgo(0, 5) },
      { name: 'brand.collab', latestMessage: 'Would love to collaborate...', latestMessageAt: daysAgo(0, 25) },
      { name: 'studio.alpha', latestMessage: 'Interested in a cross-promo?', latestMessageAt: daysAgo(1, 60) },
      { name: 'daily.art', latestMessage: 'Absolutely loved your reel!', latestMessageAt: daysAgo(2, 30) },
      { name: 'wander.world', latestMessage: 'Where was that photo taken?', latestMessageAt: daysAgo(3, 10) },
      { name: 'tech.today', latestMessage: 'Can we get a quote?', latestMessageAt: daysAgo(4, 120) },
      { name: 'coffee.co', latestMessage: 'Let’s collab on a giveaway', latestMessageAt: daysAgo(5, 15) },
      { name: 'music.mood', latestMessage: 'Feature request: playlist tag', latestMessageAt: daysAgo(6, 45) },
    ];
    dms.forEach(addDM);

    // Comments across last 7 days
    const comments = [
      { name: 'travel.lover', title: 'Love this! Where was this taken?', time: daysAgo(0, 12) },
      { name: 'cinema.buff', title: 'Great transitions!', time: daysAgo(1, 30) },
      { name: 'pixel.pushr', title: 'Colors are stunning ✨', time: daysAgo(2, 45) },
      { name: 'hike.more', title: 'Which trail is this?', time: daysAgo(3, 5) },
      { name: 'uiux.pro', title: 'Clean composition 👌', time: daysAgo(4, 25) },
      { name: 'chef.table', title: 'Recipe pls! 😋', time: daysAgo(5, 75) },
      { name: 'macro.magic', title: 'Sharp details!', time: daysAgo(6, 20) },
    ];
    comments.forEach(addComment);

    // New Followers
    const followers = [
      {
        name: 'creative.studio',
        time: daysAgo(0, 18),
      },
      { name: 'motion.master', time: daysAgo(1, 22) },
      { name: 'lens.legend', time: daysAgo(2, 11) },
    ];
    followers.forEach(addNewFollower);

    // Dashboard metrics (optional)
    setEngagementRate({ rate: 5.7, percentageChange: 1.2 });
    setMessagesSent({ total: 128, percentageChange: 3.4 });
    setTotalFollowers({ total: 2345, percentageChange: 2.1 });
    setProfileViews({ views: 1023, percentageChange: -0.8 });
    setActiveAutomation({ dm_flow: 2, product_info_bot: 1, comment_auto_reply: 1 });

    // Scheduled posts
    addScheduledPost({
      photo: 'gradient-1',
      title: 'New product launch coming soon! 🚀 Stay tuned...',
      time: daysAgo(0, -120), // Today, +2h
    });
    addScheduledPost({
      photo: 'gradient-2',
      title: 'Behind the scenes of our latest shoot 🎬',
      time: daysAgo(-1, -600), // Tomorrow
    });
    addScheduledPost({
      photo: 'gradient-3',
      title: 'Monday motivation to start your week right ✨',
      time: daysAgo(-2, -540), // Future
    });
  }, [
    addDM,
    addComment,
    addNewFollower,
    setEngagementRate,
    setMessagesSent,
    setTotalFollowers,
    setProfileViews,
    setActiveAutomation,
    setUser,
    addScheduledPost,
  ]);
}
