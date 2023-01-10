'use client';
import { UserModel } from '@lib/data/models';
import ProfileService from '@lib/services/api/profileService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl';
import React from 'react';
import Button from './Button';

interface IFollowButtonProps {
  fromUser?: UserModel | undefined;
  toUser?: UserModel | undefined;
}
const FollowButton = ({ fromUser, toUser }: IFollowButtonProps) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    setIsFollowing(
      fromUser?.following?.some((r) => r.id === toUser?.id) ?? false
    );
  }, []);
  const toggleFollow = async () => {
    if (session && toUser?.slug) {
      var profileService = new ProfileService(session.user.accessToken);
      if (await profileService.toggleFollow(toUser?.slug)) {
        setIsFollowing(!isFollowing);
      }
    } else {
      router.push('/auth/login');
    }
  };
  return (
    <Button
      buttonStyle={isFollowing ? 'basic' : 'fancy'}
      buttonSize="sm"
      type="button"
      onClick={() => toggleFollow()}
      title={isFollowing ? 'Following' : 'Follow'}
      icon={isFollowing ? <SlUserFollowing /> : <SlUserFollow />}
    ></Button>
  );
};

export default FollowButton;
