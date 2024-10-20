import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "./TrendsSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./_components/FollowingFeed";
import ForYouFeed from "./_components/ForYouFeed";

const Content = () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="for-you">
              For you
            </TabsTrigger>
            <TabsTrigger className="w-full" value="following">
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following"><FollowingFeed /></TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Content;
