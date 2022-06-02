import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';
import { getStoriesAPI } from '../../services/storyService';

function FeedStory({ story }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingBottom: '16px',
        marginRight: 20,
      }}
    >
      <div
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: '70px',
          textAlign: 'center',
        }}
      >
        <Avatar
          size={52}
          icon={<UserOutlined />}
          src={story.userCover ? story.userCover : null}
        />
        <Text style={{ whiteSpace: 'nowrap' }}>
          {story.username ? story.username : 'Anonymous User'}
        </Text>
      </div>
    </div>
  );
}

export default FeedStory;
