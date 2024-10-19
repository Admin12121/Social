import { useEffect, useState, useRef, ClipboardEvent } from 'react';
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDropzone } from "@uploadthing/react";
import { ImageIcon, Loader2, X } from "lucide-react";
import "./styles.css";
import supabase from '@/api/feature/sessionProvider';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { usePosts } from "@/pages/main/_components/postProvider";
import { useNavigate } from 'react-router-dom';

export default function PostEditor() {
  const { setRefetch } = usePosts();
  const route = useNavigate()
  const [user, setUser] = useState<any>({});
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  useEffect(() => {
    async function getUserData() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    }
    getUserData();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => setAttachments(acceptedFiles),
  });

  const { onClick, ...rootProps } = getRootProps();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin'?",
      }),
    ],
  });

  const input = editor?.getText({ blockSeparator: "\n" }) || "";

  const createNewPost = async (postData: any) => {
    if(!user){
      route("/login")
    }
    try {
      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      const { title, content } = postData;
      let imageUrl = null;

      if (attachments.length > 0) {
        setIsUploading(true);
        const file = attachments[0];
        const { data, error } = await supabase.storage
          .from('content')
          .upload(user.id + "/" + uuidv4(), file);

        if (error) throw error;
        console.log(data)
        imageUrl = "https://loonyekdvymyoupgasqz.supabase.co/storage/v1/object/public/" + data?.fullPath;
        setIsUploading(false);
      }

      const { data, error } = await supabase
        .from('Posts')
        .insert([{
          title,
          content,
          image: imageUrl,
          created_by: user.email,
          user: user.id,
        }]);

      if (error) throw error;

      editor?.commands.clearContent();
      setAttachments([]);
      setUploadProgress(null);
      toast.success("Post Uploaded")
      setRefetch((prev : boolean)=>!prev)
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    setAttachments(files);
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <Avatar>
          <AvatarImage src={user ? user?.user_metadata?.avatar_url : "https://github.com/shadcn.png"} />
          <AvatarFallback>{user?.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div {...rootProps} className="w-full">
          <EditorContent
            editor={editor}
            className={cn(
              "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
              isDragActive && "outline-dashed",
            )}
            onPaste={onPaste}
          />
          <input {...getInputProps()} />
        </div>
      </div>
      {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={(fileName) => setAttachments(attachments.filter(file => file.name !== fileName))}
        />
      )}
      <div className="flex items-center justify-end gap-3">
        {isUploading && (
          <>
            <span className="text-sm">{uploadProgress ?? 0}%</span>
            <Loader2 className="size-5 animate-spin text-primary" />
          </>
        )}
        <AddAttachmentsButton
          onFilesSelected={(files) => setAttachments(files)}
          disabled={isUploading || attachments.length >= 5}
        />
        <LoadingButton
          onClick={() => createNewPost({ title: "Post Title", content: input })}
          disabled={!input.trim() || isUploading}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
}

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-primary hover:text-primary"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={20} />
      </Button>
      <input
        type="file"
        accept="image/*, video/*"
        multiple
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFilesSelected(files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

interface AttachmentPreviewsProps {
  attachments: File[];
  removeAttachment: (fileName: string) => void;
}

function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.name)}
        />
      ))}
    </div>
  );
}

interface AttachmentPreviewProps {
  attachment: File;
  onRemoveClick: () => void;
}

function AttachmentPreview({
  attachment,
  onRemoveClick,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(attachment);

  return (
    <div
      className={cn("relative mx-auto size-fit")}
    >
      {attachment.type.startsWith("image") ? (
        <img
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={attachment.type} />
        </video>
      )}
      <button
        onClick={onRemoveClick}
        className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
      >
        <X size={20} />
      </button>
    </div>
  );
}