
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from '../chat/ChatBot';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default MainLayout;
