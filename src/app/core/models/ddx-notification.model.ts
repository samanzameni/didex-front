export interface NotificationContent {
  title: string;
  body: string;
  hasCallToAction: boolean;
  buttonUrl: string;
  buttonText: string;
  call: boolean;
  type: NotificationType;
}

export enum NotificationType {
  Good = 1,
  Warning = 2,
  ImmediateAction = 3,
}
