import Image from "next/image";
import React from "react";
import UserBioComponent from "./user-bio-component";
import MixListComponent from "@/components/widgets/mix-list-component";
import type { MixModel, UserModel } from "@/lib/models";

type UserPageProps = {
  user: UserModel;
  mixes: MixModel[];
};

const UserPage: React.FC<UserPageProps> = ({ user, mixes }) => {
  return (
    <div className="">
      <div className="relative">
        <div className="h-64 w-full ">
          <Image
            className="rounded-md object-cover"
            alt="User header"
            src={user.headerImage}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 rounded-md bg-gray-700 opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white">{user.name}</h2>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
          <div className="col-span-4 -mt-28 sm:col-span-3">
            <div className="rounded-lg  p-6 shadow">
              <UserBioComponent user={user} />
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="rounded-lg shadow">
              <h2 className="mb-4 mt-6 text-xl font-bold">Latest mixes</h2>
              <MixListComponent mixes={mixes} />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="relative">
    //     <section className="h-[350px]">
    //       <Image
    //         alt="User header"
    //         src={user.headerImage}
    //         layout="fill"
    //         objectFit="cover"
    //       />
    //     </section>
    //     <div className="absolute left-5 top-[8em] mx-5 max-w-md rounded-sm bg-muted px-4 shadow-xl">
    //       <UserBioComponent user={user} />
    //     </div>
    //   </div>
    //   <div className="ml-72">
    //     <MixListComponent mixes={mixes} />
    //   </div>
    // </div>
  );
};

export default UserPage;
