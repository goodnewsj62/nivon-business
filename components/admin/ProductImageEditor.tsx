"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  createSignedPreviewUrl,
  deleteStorageImage,
  parseStorageObjectPathFromPublicUrl,
  uploadStorageImage,
} from "@/lib/supabase/storage-service";
import { cn } from "@/lib/utils";
import { ImageOffIcon, Loader2Icon, UploadIcon } from "lucide-react";
import { toast } from "sonner";

type ProductImageEditorProps = {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  /** Fixed-height preview; use inside modals so the dialog does not grow. */
  variant?: "default" | "dialog";
};

export function ProductImageEditor({
  imageUrl,
  onImageUrlChange,
  variant = "default",
}: ProductImageEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  /** Signed URL for preview (private buckets); falls back to imageUrl. */
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const hasImage = Boolean(imageUrl.trim());
  const isDialog = variant === "dialog";

  useEffect(() => {
    let cancelled = false;
    const raw = imageUrl.trim();

    if (!raw || !isSupabaseConfigured()) {
      setPreviewSrc(null);
      return;
    }

    const path = parseStorageObjectPathFromPublicUrl(raw);
    if (!path) {
      setPreviewSrc(null);
      return;
    }

    void (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const signed = await createSignedPreviewUrl(supabase, path);
        if (!cancelled) {
          setPreviewSrc(signed);
        }
      } catch {
        if (!cancelled) setPreviewSrc(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  const imgSrc = previewSrc ?? imageUrl;

  async function handleRemove() {
    setRemoving(true);
    try {
      if (isSupabaseConfigured()) {
        const path = parseStorageObjectPathFromPublicUrl(imageUrl);
        if (path) {
          const supabase = createSupabaseBrowserClient();
          await deleteStorageImage(supabase, path);
        }
      }
      onImageUrlChange("");
      setPreviewSrc(null);
      toast.success("Image removed");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not remove image");
    } finally {
      setRemoving(false);
    }
  }

  async function handleFile(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    if (!isSupabaseConfigured()) {
      toast.error("Configure Supabase to upload images.");
      return;
    }

    setUploading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const previousUrl = imageUrl.trim();
      const oldPath = previousUrl
        ? parseStorageObjectPathFromPublicUrl(previousUrl)
        : null;

      const { publicUrl, path } = await uploadStorageImage(supabase, file);

      if (oldPath) {
        const newPath = parseStorageObjectPathFromPublicUrl(publicUrl);
        if (newPath !== oldPath) {
          try {
            await deleteStorageImage(supabase, oldPath);
          } catch {
            /* best-effort */
          }
        }
      }

      const signed = await createSignedPreviewUrl(supabase, path);
      setPreviewSrc(signed);
      onImageUrlChange(publicUrl);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4",
        isDialog && "shrink-0",
      )}
    >
      <Label className="text-foreground">Product image</Label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => {
          void handleFile(e.target.files);
          e.target.value = "";
        }}
      />

      {hasImage ? (
        <div className="flex min-h-0 flex-col gap-3">
          <div
            className={cn(
              "relative w-full max-w-full overflow-hidden rounded-md border border-border bg-muted",
              isDialog ? "h-40 shrink-0" : "aspect-video max-w-md",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- mixed local + signed URLs */}
            <img
              src={imgSrc}
              alt=""
              className="size-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={removing}
              onClick={() => void handleRemove()}
            >
              {removing ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <ImageOffIcon data-icon="inline-start" />
              )}
              Remove image
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading || !isSupabaseConfigured()}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <UploadIcon data-icon="inline-start" />
              )}
              Replace image
            </Button>
          </div>
          <p className="min-w-0 truncate font-mono text-xs text-muted-foreground">
            {imageUrl}
          </p>
        </div>
      ) : (
        <div className="flex shrink-0 flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            No image yet. Upload a file to attach one to this product.
          </p>
          {!isSupabaseConfigured() ? (
            <p className="text-xs text-amber-700 dark:text-amber-200">
              Set Supabase environment variables to enable uploads.
            </p>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <UploadIcon data-icon="inline-start" />
            )}
            Upload image
          </Button>
        </div>
      )}
    </div>
  );
}
