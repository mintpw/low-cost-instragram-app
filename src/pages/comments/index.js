import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import CommentsAll from '../../components/comments/CommentsAll';
import FeedContent from '../../components/feed/FeedContent';
import FeedSkeleton from '../../components/feed/FeedSkeleton';

function CommentsPage() {
  const location = useLocation();
  const history = useHistory();
  const commentsRef = useRef(null);
  const imageContainerRef = useRef(null);
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [feed, setFeed] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!location.state) {
      history.push('/');
    } else {
      setFeed(location.state.feed);
      setComments(location.state.feed.comments);
    }
  }, [location]);

  const submitCommentHandle = (value) => {
    if (!value.comment) {
      return;
    }
    form.setFieldsValue({
      comment: '',
    });

    setComments((prev) => [
      { username: 'Me', commentText: value.comment, userCover: null },
      ...prev,
    ]);
  };

  useEffect(() => {
    if (comments.length > 0 && commentsRef.current && imageContainerRef.current) {
      commentsRef.current.scrollTo({
        top: imageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [comments, commentsRef, imageContainerRef]);

  return feed ? (
    <>
      <div
        ref={commentsRef}
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          padding: '16px',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            borderBottom: '1px solid 	#D3D3D3',
            marginBottom: '16px',
          }}
        >
          <Title level={4} style={{ textAlign: 'center' }}>
            Comments
          </Title>
        </div>

        <div style={{ height: '100%' }}>
          <div ref={imageContainerRef}>
            <FeedContent feed={feed} pathname={location.pathname} />
          </div>
          <CommentsAll comments={comments} />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          paddingLeft: '6px',
          paddingRight: '6px',
        }}
      >
        <Form form={form} onFinish={submitCommentHandle}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '6px',
            }}
          >
            <Form.Item name="comment" style={{ width: '100%' }}>
              <Input
                placeholder="Say something nice..."
                autoComplete="off"
                prefix={<Avatar size={20} icon={<UserOutlined />} />}
              />
            </Form.Item>
            <Button htmlType="submit" icon={<SendOutlined />} />
          </div>
        </Form>
      </div>
    </>
  ) : null;
}

export default CommentsPage;
