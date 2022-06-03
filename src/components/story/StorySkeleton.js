import { Skeleton, Space } from 'antd';
import React from 'react';

function StorySkeleton() {
  return (
    <Space size="middle" style={{ marginBottom: '16px' }}>
      <Skeleton.Avatar active={true} size={52} shape="circle" />
      <Skeleton.Avatar active={true} size={52} shape="circle" />
      <Skeleton.Avatar active={true} size={52} shape="circle" />
      <Skeleton.Avatar active={true} size={52} shape="circle" />
      <Skeleton.Avatar active={true} size={52} shape="circle" />
    </Space>
  );
}

export default StorySkeleton;
