import { v4 as uuidv4 } from "uuid";

import { saveProfile } from "./storage";

export const createProfile = async () => {
  const profile: Profile = {
    id: uuidv4(),
  };

  await saveProfile(profile);

  return profile.id;
};
