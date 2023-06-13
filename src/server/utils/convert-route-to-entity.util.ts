const mapping: Record<string, string> = {
  attendances: 'attendance',
  'belt-progressions': 'belt_progression',
  'class-schedules': 'class_schedule',
  dojos: 'dojo',
  'membership-plans': 'membership_plan',
  techniques: 'technique',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
