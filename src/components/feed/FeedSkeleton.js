import { Skeleton } from 'antd';
import React from 'react';

function FeedSkeleton() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Skeleton.Avatar active size={32} />
        <Skeleton.Input active size={18} style={{ marginLeft: '10px' }} />
      </div>
      <Skeleton.Input
        active
        style={{ width: '100%', height: '200px', marginBottom: '16px' }}
      />
    </>
  );
}

export default FeedSkeleton;
