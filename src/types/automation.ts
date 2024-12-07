export type AutomationTrigger = 
  | 'profile_view'
  | 'connection_request'
  | 'message_received'
  | 'time_delay'
  | 'custom_event';

export type AutomationAction =
  | 'send_connection'
  | 'send_message'
  | 'view_profile'
  | 'add_to_list'
  | 'tag_lead'
  | 'notify_user';

export interface AutomationStep {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  config: {
    triggerType?: AutomationTrigger;
    actionType?: AutomationAction;
    delay?: number;
    template?: string;
    conditions?: AutomationCondition[];
  };
  nextSteps: string[];
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less';
  value: string | number | boolean;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  steps: AutomationStep[];
  targetList?: string;
  createdAt: Date;
  updatedAt: Date;
}