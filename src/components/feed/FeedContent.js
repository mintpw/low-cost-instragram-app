import {
  CommentOutlined,
  HeartOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Image, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { useHistory } from 'react-router';

function FeedContent({ feed, index, pathname }) {
  const history = useHistory();

  return feed ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Space size={4} style={{ marginBottom: '10px' }}>
        <Avatar size={32} src={feed.userCover ?? null} icon={<UserOutlined />} />
        <Text style={{ fontWeight: 700 }}>{feed.username ?? 'Anonymous User'}</Text>
      </Space>
      <Image
        alt="imageContent"
        width="100%"
        src={feed.image?.url}
        preview={{ visible: false }}
      />
      {pathname !== '/comments' ? (
        <Space size={1}>
          <Button
            type="link"
            style={{ color: 'gray', margin: 0 }}
            icon={<HeartOutlined />}
          />
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
        <Text style={{ fontWeight: 700 }}>{feed.username ?? 'Anonymous User'} </Text>
        <Text style={{ overflowWrap: 'anywhere' }}>{feed.image?.caption ?? ''}</Text>
      </div>
    </div>
  ) : null;
}

export default FeedContent;
