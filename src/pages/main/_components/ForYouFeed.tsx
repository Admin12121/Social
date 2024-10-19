import InfiniteScrollContainer from "@/components/global/infinite-scroll";
import Post, {Reposted} from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import supabase from "@/api/feature/sessionProvider";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { usePosts } from "./postProvider";

export default function ForYouFeed() {
  const [posts, setPosts] = useState<any>([]);
  const { refetch } = usePosts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchPosts = async (pageParam = 0) => {
    try {
      setLoading(true);
      const { data: newPosts, error: postsError } = await supabase
        .from('Posts')
        .select(`*, profiles (id, email, full_name, picture)`)
        .order('created_at', { ascending: false }) 
        .range(pageParam * 5, (pageParam + 1) * 5 - 1);
      if (postsError) throw new Error(postsError.message);

      const { data: repostedPosts, error: repostsError } = await supabase
        .from('repostead')
        .select(`*, Posts (*, profiles (id, email, full_name, picture)), profiles (id, email, full_name, picture)`)
        .order('created_at', { ascending: false }) 
        .range(pageParam * 5, (pageParam + 1) * 5 - 1);
      if (repostsError) throw new Error(repostsError.message);

      const combinedPosts = [...newPosts, ...repostedPosts];

      setPosts((prevPosts: any) => {
        const postKeys = new Set(prevPosts.map((post: any) => {
          return post.repostead_by ? `repost-${post.id}` : `post-${post.id}`;
        }));
      
        const uniqueNewPosts = combinedPosts.filter(post => {
          const key = post.repostead_by ? `repost-${post.id}` : `post-${post.id}`;
          return !postKeys.has(key);
        });
        return [...prevPosts, ...uniqueNewPosts];
      });

      setHasNextPage(newPosts.length === 5 || repostedPosts.length === 5);
    } catch (err) {
      setError((err as any).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page, refetch]);

  const handleBottomReached = () => {
    if (hasNextPage && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 0) {
    return <PostsLoadingSkeleton />;
  }

  if (error) {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts: {error}
      </p>
    );
  }

  if (!posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={handleBottomReached}
    >
      {posts.map((post: any) => (
        post.repostead_by ? (
          <Reposted key={Math.random()} post={post} />
        ) : (
          <Post key={Math.random()} post={post} />
        )
      ))}
      {loading && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}

