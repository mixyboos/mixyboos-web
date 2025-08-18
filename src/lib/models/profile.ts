import type { _User } from "@/lib/models/_user";

export type ProfileModel = {
  id: string;
  email: string;
  username: string;
} & _User;
