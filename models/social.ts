export interface SocialModel {
  id?: string;
  eventDate: number;
  eventDescription: string;
  eventImage: string;
  eventLocation: string;
  eventName: string;
  // TODO: You may need to add attributes here
  // to implement your desired functionality.
  // The staff solutions add two attributes.
  uid : string;
  liked : string[]; // A list of user ids that have liked this post
}
