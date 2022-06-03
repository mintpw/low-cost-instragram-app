import { CloseOutlined, PictureOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Typography, Upload } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function PostImagesPgae() {
  const [form] = Form.useForm();
  const history = useHistory();

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const [imageUrl, setImageUrl] = useState('');
  const [isShownErrorMessage, setIsShownErrorMessage] = useState(false);

  const props = {
    beforeUpload: async (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isLt2M) {
        message.error('Image must be smaller than 20MB!');
        return false;
      }
      const filePreview = await getBase64(file);
      setImageUrl(filePreview);
      setIsShownErrorMessage(false);

      return false;
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
      setIsShownErrorMessage(true);
      return;
    }
    const newPost = {
      username: 'me',
      userCover: null,
      image: {
        url: imageUrl,
        caption: value.caption ?? '',
      },
      comments: [],
    };
    history.push({ pathname: '/', state: { newPost: newPost } });
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          borderBottom: '1px solid 	#D3D3D3',
          paddingTop: '16px',
          position: 'relative',
        }}
      >
        <Title level={4} style={{ textAlign: 'center' }}>
          Create New Post
        </Title>
        <Link
          to="/"
          style={{
            color: 'black',
            position: 'absolute',
            top: 18,
            right: 10,
          }}
        >
          <CloseOutlined style={{ fontSize: '16px' }} />
        </Link>
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
            <div
              style={{
                width: '100%',
                // height: '420px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowY: 'auto',
              }}
            >
              <img
                src={imageUrl}
                style={{
                  width: '100%',
                  marginBottom: '16px',
                }}
                alt="newPost"
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '16px',
                height: '420px',
              }}
            >
              <PictureOutlined style={{ fontSize: 100 }} />
              <Button
                type="primary"
                style={{
                  borderRadius: 4,
                  marginBottom: isShownErrorMessage ? '6px' : '16px',
                }}
              >
                Select From Computer
              </Button>
              {isShownErrorMessage ? (
                <Text style={{ color: 'red' }}>Please select an image :D</Text>
              ) : null}
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
              width: '100%',
              marginBottom: '16px',
            }}
          >
            <TextArea
              row={3}
              placeholder="Write a caption..."
              style={{ borderRadius: 6 }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: '100%',
              marginTop: 'auto',
              marginBottom: '16px',
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
