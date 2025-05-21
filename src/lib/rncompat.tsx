
import React from 'react';

// Mock React Native components for web compatibility
export const View = ({ style, children, ...props }: any) => (
  <div style={style} {...props}>{children}</div>
);

export const Text = ({ style, children, ...props }: any) => (
  <p style={{ margin: 0, ...style }} {...props}>{children}</p>
);

export const ScrollView = ({ style, children, ...props }: any) => (
  <div style={{ overflowY: 'auto', ...style }} {...props}>{children}</div>
);

export const TouchableOpacity = ({ style, onPress, children, ...props }: any) => (
  <div 
    style={{ cursor: 'pointer', ...style }}
    onClick={onPress}
    {...props}
  >
    {children}
  </div>
);

export const SafeAreaView = ({ style, children, ...props }: any) => (
  <div style={{ padding: '10px', ...style }} {...props}>{children}</div>
);

// Mock StatusBar
export const StatusBar = () => null;
