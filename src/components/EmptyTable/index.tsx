import React from 'react';
import { Image } from 'antd';
import empty from 'assets/icons/Empty.svg';
export function EmptyTable() {
  return (
    <div className="empty-state">
      <Image
        rel="preload"
        loading="lazy"
        src={empty}
        alt="No data"
        width={122}
        height={167}
        className="empty-image"
        preview={false}
      />
    </div>
  );
}
