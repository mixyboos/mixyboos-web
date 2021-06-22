import React from 'react';
import { UserModel } from '../../data/models';

export function useUser(user: UserModel) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef<UserModel>();

  // Store current value in ref
  React.useEffect(() => {
    ref.current = user;
  }, [user]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
