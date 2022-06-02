import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import CommentsFeed from '../components/comments/CommentsFeed';
import FeedContent from '../components/feed/FeedContent';
import FeedStory from '../components/feed/FeedStory';
import { getFeedsAPI } from '../services/feedService';
import { getStoriesAPI } from '../services/storyService';

function HomePage() {
  const location = useLocation();

  const [feeds, setFeeds] = useState([]);
  const [feedsLoading, setFeedsLoading] = useState(true);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const { data } = await getFeedsAPI();
        setFeeds(data.feeds);
        if (location.state && location.state.newFeed) {
          setFeeds((prev) => [location.state.newFeed, ...prev]);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setFeedsLoading(false);
      }
    };

    fetchFeeds();
  }, [location]);

  useEffect(() => {
    const fecthStories = async () => {
      try {
        const { data } = await getStoriesAPI();
        setStories(data.story);
      } catch (error) {
        console.log('error', error);
      }
    };
    fecthStories();
  }, []);

  return (
    <>
      <div
        style={{
          overflowX: 'auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          {Array.isArray(stories) && stories.length > 0
            ? stories.map((story, index) => {
                return (
                  <div key={index}>
                    <FeedStory story={story} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
      {Array.isArray(feeds) && feeds.length > 0
        ? feeds.map((feed, index) => {
            return (
              <div key={index} style={{ paddingBottom: '16px' }}>
                <FeedContent
                  feed={feed}
                  index={index}
                  pathname={location.pathname}
                />
                <CommentsFeed feed={feed} comments={feed.comments} />
              </div>
            );
          })
        : null}
    </>
  );
}

export default HomePage;
