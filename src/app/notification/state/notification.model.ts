export interface NotificationReference {
  reference: string;
}

export interface NotificationOptions extends Partial<NotificationReference> {
  text: string;
  icon?: string;
}

export interface Notification extends NotificationOptions {
  id: string;
  seen: boolean;
}
