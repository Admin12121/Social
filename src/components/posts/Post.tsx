import { cn, formatRelativeDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Linkify from "./Linkify";
import UserTooltip from "./UserTooltip";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";
import PostMoreButton from "./PostMoreButton";
import supabase from "@/api/feature/sessionProvider";
interface PostProps {
  post: any;
}

export default function Post({ post }: PostProps) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data.user) {
          setUser(value.data.user);
        } else {
          setUser(null);
        }
      });
    }
    getUserData();
  }, []);

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.profiles}>
            <Link to={`/users/${post.profiles.email}`}>
              <Avatar>
                <AvatarImage src={post.profiles.picture} />
                <AvatarFallback>
                  {post.profiles.email.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.profiles}>
              <Link
                to={`/users/${post.profiles.email}`}
                className="block font-medium hover:underline"
              >
                {post.profiles.email}
              </Link>
            </UserTooltip>
            <Link
              to={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(new Date(post.created_at))}
            </Link>
          </div>
        </div>
        {post.created_by === user?.email && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      {!!post.image && <MediaPreviews attachments={post.image} />}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton postId={post.id} initialState={post.like_count} />
        </div>
        <BookmarkButton postId={post.id} />
      </div>
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: any;
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div className={cn("flex flex-col gap-3")}>
      <MediaPreview media={attachments} />
    </div>
  );
}

interface MediaPreviewProps {
  media: any;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media) {
    return (
      <img
        src={media}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}

export const Reposted = (data: any) => {
  const post = data.post;
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data.user) {
          setUser(value.data.user);
        } else {
          setUser(null);
        }
      });
    }
    getUserData();
  }, []);
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.profiles}>
            <Link to={`/users/${post.profiles.email}`}>
              <Avatar>
                <AvatarImage src={post.profiles.picture} />
                <AvatarFallback>
                  {post.profiles.email.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post?.profiles}>
              <Link
                to={`/users/${post?.profiles?.email}`}
                className="block font-medium hover:underline"
              >
                {post?.profiles?.email}
              </Link>
            </UserTooltip>
            <Link
              to={`/posts/${post?.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(new Date(post?.created_at))}
            </Link>
          </div>
        </div>
        {post?.profiles?.email === user?.email && (
          <PostMoreButton
            post={post.Posts}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <article className="cursor-pointer group/post space-y-3 rounded-2xl bg-background p-5 shadow-sm ">
        <div className="flex justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <UserTooltip user={post.Posts.profiles}>
              <Link to={`/users/${post.Posts.profiles.email}`}>
                <Avatar>
                  <AvatarImage src={post.Posts.profiles.picture} />
                  <AvatarFallback>
                    {post.Posts.profiles.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </UserTooltip>
            <div>
              <UserTooltip user={post.Posts.profiles}>
                <Link
                  to={`/users/${post.Posts.profiles.email}`}
                  className="block font-medium hover:underline"
                >
                  {post.Posts.profiles.email}
                </Link>
              </UserTooltip>
              <Link
                to={`/posts/${post.Posts.id}`}
                className="block text-sm text-muted-foreground hover:underline"
                suppressHydrationWarning
              >
                {formatRelativeDate(new Date(post.Posts.created_at))}
              </Link>
            </div>
          </div>
        </div>
        <Linkify>
          <div className="whitespace-pre-line break-words">
            {post.Posts.content}
          </div>
        </Linkify>
        {!!post.Posts.image && <MediaPreviews attachments={post.Posts.image} />}
      </article>
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton
            postId={post.Posts.id}
            initialState={post.Posts.like_count}
          />
        </div>
      </div>
    </article>
  );
};
