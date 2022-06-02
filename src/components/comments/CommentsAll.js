import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

function CommentsAll({ comments }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: '1px solid #D3D3D3',
      }}
    >
      {Array.isArray(comments) && comments.length > 0
        ? comments.map((comment, index) => {
            return (
              <Space
                key={index}
                style={{ alignItems: 'flex-start', marginBottom: '6px' }}
              >
                <Avatar size={26} src={comment.userCover} icon={<UserOutlined />} />
                <div>
                  <Text style={{ fontWeight: 700, marginRight: '6px' }}>
                    {comment.username}
                  </Text>
                  <Text>{comment.commentText}</Text>
                </div>
              </Space>
            );
          })
        : null}
    </div>
  );
}

export default CommentsAll;
