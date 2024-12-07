import React from 'react';
import { Building2, MapPin, Tags, Star } from 'lucide-react';
import type { Lead } from '../../types/lead';

interface LeadCardProps {
  lead: Lead;
  onSelect: (lead: Lead) => void;
}

export function LeadCard({ lead, onSelect }: LeadCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(lead)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {lead.firstName} {lead.lastName}
          </h3>
          <p className="text-sm text-gray-600">{lead.title}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {lead.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <Building2 className="h-4 w-4 mr-2" />
          {lead.company}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          {lead.location}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Tags className="h-4 w-4 mr-2" />
          {lead.tags.join(', ')}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Star className="h-4 w-4 mr-2" />
          Lead Score: {lead.score}
        </div>
      </div>
    </div>
  );
}