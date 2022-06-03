import {
  CommentOutlined,
  FrownOutlined,
  HeartOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Image, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { useHistory } from 'react-router';

function FeedContent({ feed, pathname }) {
  const history = useHistory();

  return feed ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Space size={4} style={{ marginBottom: '10px' }}>
        <Avatar
          size={32}
          src={feed.userCover ? feed.userCover : null}
          icon={<UserOutlined />}
        />
        <Text style={{ fontWeight: 700 }}>
          {feed.username ? feed.username : 'Anonymous User'}
        </Text>
      </Space>
      <div
        style={{
          width: '100%',
          marginBottom: '6px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {feed.image?.url ? (
          <Image
            alt="imageContent"
            height="100%"
            src={feed.image.url}
            preview={{ visible: false }}
          />
        ) : (
          <div
            style={{
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <FrownOutlined style={{ fontSize: '48px', marginBottom: '10px' }} />
            <Text>Oops, something went wrong</Text>
          </div>
        )}
      </div>
      {pathname !== '/comments' ? (
        <Space size={1} style={{ marginLeft: -8 }}>
          <Button type="link" style={{ color: 'gray' }} icon={<HeartOutlined />} />
          <Button
            type="link"
            style={{ color: 'gray' }}
            icon={<CommentOutlined />}
            onClick={() =>
              history.push({
                pathname: `/comments`,
                state: { feed: feed },
              })
            }
          />
          <Button type="link" style={{ color: 'gray' }} icon={<SendOutlined />} />
        </Space>
      ) : null}
      <div
        style={{
          display: 'block',
          flex: '1 1 auto',
          marginTop: pathname === '/comments' ? '10px' : 0,
        }}
      >
        <Text style={{ fontWeight: 700 }}>
          {feed.username ? feed.username : 'Anonymous User'}{' '}
        </Text>
        <Text style={{ overflowWrap: 'anywhere' }}>
          {feed.image?.caption ? feed.image.caption : ''}
        </Text>
      </div>
    </div>
  ) : null;
}

export default FeedContent;
