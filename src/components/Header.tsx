
import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white dark:bg-background p-4 border-b border-border">
      <div className="container mx-auto max-w-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-foreground">Hi there! 👋</h1>
          <p className="text-muted-foreground text-sm">Welcome to eFix</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-accent dark:bg-accent/50 rounded-full px-4 py-2 flex items-center">
            <span className="text-primary font-semibold mr-2">120</span>
            <span className="text-yellow-500">⚡</span>
          </div>
          <button className="relative">
            <Bell className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
