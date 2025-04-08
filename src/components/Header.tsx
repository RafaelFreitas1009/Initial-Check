
import React from 'react';
import { Heart, Stethoscope } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-8 h-8 text-medical-primary" />
          <h1 className="text-xl font-bold tracking-tight text-medical-dark">CareBuddy</h1>
        </div>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
          <Heart className="w-4 h-4 text-medical-secondary" />
          <span>Emergência</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
