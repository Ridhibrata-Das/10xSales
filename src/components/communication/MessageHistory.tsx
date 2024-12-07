import React from 'react';
import { format } from 'date-fns';
import { MessageSquare, UserPlus, Mail, Clock } from 'lucide-react';
import type { Message } from '../../types/communication';

interface MessageHistoryProps {
  messages: Message[];
  onMessageSelect?: (message: Message) => void;
}

export function MessageHistory({ messages, onMessageSelect }: MessageHistoryProps) {
  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'connection':
        return UserPlus;
      case 'inmail':
        return Mail;
      case 'follow_up':
        return Clock;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Message History</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {messages.map((message) => {
            const Icon = getMessageIcon(message.type);
            return (
              <li
                key={message.id}
                className="px-4 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onMessageSelect?.(message)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{message.content}</p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {format(message.timestamp, 'MMM d, h:mm a')}
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        message.status === 'replied'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.status}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}