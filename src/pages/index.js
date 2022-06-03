import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import CommentsFeed from '../components/comments/CommentsFeed';
import FeedContent from '../components/feed/FeedContent';
import FeedSkeleton from '../components/feed/FeedSkeleton';
import FeedStory from '../components/feed/FeedStory';
import StorySkeleton from '../components/story/StorySkeleton';
import { getFeedsAPI } from '../services/feedService';
import { getStoriesAPI } from '../services/storyService';

function HomePage() {
  const location = useLocation();

  const [feeds, setFeeds] = useState([]);
  const [feedsLoading, setFeedsLoading] = useState(false);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        setFeedsLoading(true);
        const { data } = await getFeedsAPI();
        setFeeds(data.feeds);
        if (location.state && location.state.newPost) {
          setFeeds((prev) => [location.state.newPost, ...prev]);
        }
      } catch (error) {
        message.error(error);
      } finally {
        setFeedsLoading(false);
      }
    };

    fetchFeeds();
  }, [location]);

  useEffect(() => {
    const fecthStories = async () => {
      try {
        setStoriesLoading(true);
        const { data } = await getStoriesAPI();
        setStories(data.story);
      } catch (error) {
        message.error(error);
      } finally {
        setStoriesLoading(false);
      }
    };
    fecthStories();
  }, []);

  return (
    <>
      {storiesLoading ? (
        <StorySkeleton />
      ) : Array.isArray(stories) && stories.length > 0 ? (
        <div
          style={{
            overflowX: 'auto',
            width: '100%',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {stories.map((story, index) => {
              return (
                <div key={index}>
                  <FeedStory story={story} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {feedsLoading ? (
          <>
            <FeedSkeleton />
            <FeedSkeleton />
          </>
        ) : Array.isArray(feeds) && feeds.length > 0 ? (
          feeds.map((feed, index) => {
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
        ) : null}
      </div>
    </>
  );
}

export default HomePage;
