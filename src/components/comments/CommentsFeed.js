import Text from 'antd/lib/typography/Text';
import React from 'react';
import { Link } from 'react-router-dom';

function CommentsFeed({ feed }) {
  return (
    <div>
      {Array.isArray(feed.comments) && feed.comments.length > 0 ? (
        feed.comments.length === 1 ? (
          <div>
            <Text style={{ fontWeight: 700 }}>{feed.comments[0].username} </Text>
            <Text>{feed.comments[0].commentText}</Text>
          </div>
        ) : (
          <Link
            to={{
              pathname: `/comments`,
              state: { feed: feed },
            }}
            style={{ color: 'gray' }}
          >
            View all {feed.comments.length} comments
          </Link>
        )
      ) : (
        <Text style={{ color: 'gray', fontStyle: 'italic' }}>No Comments</Text>
      )}
    </div>
  );
}

export default CommentsFeed;
