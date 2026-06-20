// src/components/common/SessionTypeBadge.jsx

import { Badge } from '@/components/ui';
import { getSessionTypeColor } from '@/lib/dashboard';

export function SessionTypeBadge({ type }) {
  return <Badge color={getSessionTypeColor(type)}>{type}</Badge>;
}