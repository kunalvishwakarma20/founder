'use client'
import { baseUrl } from '@/base_url'
import { Button } from "@/components/ui/button"
import { Skeleton } from '@/components/ui/skeleton'
import { useChatHistory } from '@/hooks/use-chat-history'
import Logo from '@/public/FrLogo.png'
import { SignOutButton, useUser } from '@clerk/nextjs'
import clsx from 'clsx'
import { HelpCircle, Highlighter, Home, Library, LogOut, LucideIcon, Menu, MessageSquare, Plus, Search, Settings, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

type SidebarItem = {
  name: string;
  href: string;
  icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
  { name: 'For You', href: '/dashboard/for-you', icon: Home },
  { name: 'Explore', href: '/dashboard/explore', icon: Search },
  { name: 'My Library', href: '/dashboard/my-library', icon: Library },
  { name: 'Highlights', href: '/dashboard/highlights', icon: Highlighter },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
]

const bottomItems: SidebarItem[] = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Help & Support', href: '/dashboard/help-support', icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showPreviousChats, setShowPreviousChats] = useState(false)
  const { chats, isLoading, refetch } = useChatHistory()
  const { user } = useUser()
  const [error, setError] = useState<string | null>(null);

  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(checkScreenSize, 250);
    
    checkScreenSize();
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      debouncedHandleResize.cancel();
    };
  }, [checkScreenSize]);

  useEffect(() => {
    setShowPreviousChats(pathname.includes('/dashboard/chat'))
  }, [pathname])

  const handleChatClick = useCallback((chatId: string) => {
    try {
      router.push(`/dashboard/chat/${chatId}`);
      if (isMobile) {
        setIsOpen(false);
      }
    } catch (err) {
      setError('Failed to navigate to chat');
      console.error('Navigation error:', err);
    }
  }, [router, isMobile]);

  const handleDeleteAllChats = useCallback(async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      const confirmed = await showConfirmDialog(
        'Are you sure you want to delete all chats? This cannot be undone.'
      );
      
      if (!confirmed) return;

      const response = await fetch(`${baseUrl}/api/v1/chat/user/${user.id}/all`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await refetch();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete chats';
      setError(errorMessage);
      console.error('Error deleting chats:', error);
    }
  }, [user, setError, refetch]);

  useEffect(() => {
    if (error) {
      console.error(error);
      setTimeout(() => setError(null), 5000);
    }
  }, [error]);

  const sidebarContent = useMemo(() => (
    <aside
      className={clsx(
        'h-screen bg-white shadow-md transition-all duration-300',
        {
          'translate-x-0': isOpen,
          '-translate-x-full': !isOpen,
          'w-64': true,
          'md:translate-x-0': true,
        },
        'flex flex-col'
      )}
    >
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <Link href="/dashboard/for-you" className="flex items-center space-x-2">
          <Image src={Logo} alt='FoundrGuide' width={100} height={100} className='w-6 h-6' />
          <p className="text-xl font-semibold">Foundr<span className='text-blue-600'>Guide</span></p>
        </Link>
      </div>

      {/* Main Navigation - Fixed */}
      <nav className="flex-shrink-0 pt-4">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-6 py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-600 
                  ${pathname === item.href ? 'bg-gray-100 text-gray-900' : ''}`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Previous Chats Section - Scrollable */}
      {showPreviousChats && (
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex-shrink-0 px-4 py-2 flex justify-between items-center">
            <Button
              onClick={() => router.push('/dashboard/chat')}
              className="flex-1 mr-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
            <Button
              onClick={handleDeleteAllChats}
              variant="destructive"
              size="icon"
              className="flex-shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-shrink-0 px-6 py-2 border-t border-gray-200 bg-white">
            <h3 className="text-sm font-semibold text-gray-500">Previous Chats</h3>
          </div>
          <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            {isLoading ? (
              // Loading skeletons
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="px-6 py-2">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            ) : chats.length > 0 ? (
              chats.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => handleChatClick(chat._id)}
                  className="w-full flex items-center space-x-3 px-6 py-2 text-gray-700 hover:bg-gray-200 text-sm border-l-2 border-transparent hover:border-blue-600"
                >
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <span className="block truncate">{chat.title}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(chat.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-6 py-4 text-sm text-gray-500 text-center">
                No previous chats
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Items - Fixed */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <ul>
          {bottomItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 px-6 py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-600"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          <li className='flex items-center space-x-3 px-6 py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-600'>
            <LogOut className='h-5 w-5'/>
            <SignOutButton/>
          </li>
        </ul>
      </div>
    </aside>
  ), [isOpen, isMobile, pathname, chats, isLoading, handleChatClick, handleDeleteAllChats, router, showPreviousChats]);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed left-0 top-0 h-full z-40">
        {sidebarContent}
      </div>

      <div className="md:ml-64" />
    </>
  )
}

function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced as T & { cancel: () => void };
}

function showConfirmDialog(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(window.confirm(message));
  });
}
