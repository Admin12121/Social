import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import supabase from "@/api/feature/sessionProvider";
import { toast } from "sonner";
import { usePosts } from "@/pages/main/_components/postProvider";

interface DeletePostDialogProps {
  post: any;
  open: boolean;
  onClose: () => void;
}

export default function DeletePostDialog({
  post,
  open,
  onClose,
}: DeletePostDialogProps) {
  const [loading, setLoading] = useState(false);
  const { setRefetch } = usePosts();
  const  deletePost = async (postId : number) => {
    setLoading(true); 
    try {
      const { data, error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', postId); 
  
      if (error) throw error;
      toast.success('Post deleted')
      setRefetch((prev : boolean)=>!prev)
      onClose();
      return data;
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open || !loading) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete post?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() => deletePost(post.id)}
            loading={loading}
          >
            Delete
          </LoadingButton>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
