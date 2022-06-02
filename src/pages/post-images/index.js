import { PictureOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Typography, Upload } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

function PostImagesPgae() {
  const [form] = Form.useForm();
  const history = useHistory();

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const props = {
    beforeUpload: async (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return false;
      }

      const filePreview = await getBase64(file);
      setImageUrl(filePreview);
    },
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const submitNewPostHandle = (value) => {
    if (!imageUrl) {
      return;
    }

    const newFeed = {
      username: 'me',
      userCover: null,
      image: {
        url: imageUrl,
        caption: value.caption ?? '',
      },
      comments: [],
    };
    history.push({ pathname: '/', state: { newFeed: newFeed } });
  };
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          borderBottom: '1px solid 	#D3D3D3',
          paddingTop: '16px',
        }}
      >
        <Title level={4} style={{ textAlign: 'center' }}>
          Create New Post
        </Title>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
          height: '100%',
        }}
      >
        <Upload {...props} name="avatar" showUploadList={false}>
          {imageUrl ? (
            <img
              src={imageUrl}
              style={{ width: '100%', marginBottom: '16px' }}
              alt="newPost"
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <PictureOutlined style={{ fontSize: 100 }} />
              <Button
                type="primary"
                style={{ borderRadius: 4, marginBottom: '16px' }}
              >
                Select From Computer
              </Button>
            </div>
          )}
        </Upload>

        <Form
          form={form}
          onFinish={submitNewPostHandle}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Form.Item
            name="caption"
            style={{
              width: '90%',
            }}
          >
            <TextArea row={3} placeholder="Write a caption..." />
          </Form.Item>
          <Button
            type="dashed"
            htmlType="submit"
            style={{
              width: '90%',
              color: '#1890ff',
              borderColor: '#1890ff',
              marginTop: 'auto',
            }}
          >
            Post
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default PostImagesPgae;
