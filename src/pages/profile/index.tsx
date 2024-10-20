import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import supabase from "@/api/feature/sessionProvider";
import Feed from "./Feed";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUserData() {
      setLoading(true);
      try {
        let userData;
        if (id && id.includes("@")) {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", id)
            .single();
          if (error) throw error;
          userData = data;
        } else {
          const { data, error } = await supabase.auth.getUser();
          if (error) throw error;
          userData = data.user;
        }
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, [id]);

  console.log(user);

  if (!user && loading)
    return (
      <div className="flex-center w-full h-full">
        <Spinner />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={user?.picture || user?.user_metadata?.avatar_url}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {user.full_name || user?.user_metadata?.user_name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                {user.email}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              {/* <StatBlock value={currentUser.posts.length} label="Posts" /> */}
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {/* {currentUser.bio} */}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${id && id.includes("@") && "hidden"}`}>
              <Button>Edit Profile</Button>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl">
        <Feed profile={id && id.includes("@") ? user : ''}/>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
