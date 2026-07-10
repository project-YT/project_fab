import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { cloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";

export interface UploadedImage {
  url: string;
  public_id: string;
}

interface Props {
  value: UploadedImage[];
  onChange: (imgs: UploadedImage[]) => void;
  max?: number;
  folder?: string;
}

export function ImageDropzone({ value, onChange, max = 6, folder = "aurelle/products" }: Props) {
  const [progress, setProgress] = useState<Record<string, number>>({});

  const onDrop = useCallback(
    async (files: File[]) => {
      if (!cloudinaryConfigured) {
        toast.error("Cloudinary is not configured. See cloudinary-setup.md.");
        return;
      }
      const remaining = max - value.length;
      const accepted = files.slice(0, Math.max(0, remaining));
      const results: UploadedImage[] = [];
      for (const f of accepted) {
        if (!f.type.startsWith("image/")) {
          toast.error(`${f.name} is not an image`);
          continue;
        }
        if (f.size > 8 * 1024 * 1024) {
          toast.error(`${f.name} is over 8MB`);
          continue;
        }
        try {
          const res = await uploadToCloudinary(
            f,
            (pct) => setProgress((p) => ({ ...p, [f.name]: pct })),
            folder,
          );
          results.push({ url: res.secure_url, public_id: res.public_id });
        } catch (e: any) {
          toast.error(`${f.name}: ${e.message}`);
        } finally {
          setProgress((p) => {
            const { [f.name]: _, ...rest } = p;
            return rest;
          });
        }
      }
      if (results.length) onChange([...value, ...results]);
    },
    [value, onChange, max, folder],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`grid cursor-pointer place-items-center rounded-3xl border-2 border-dashed p-8 text-center transition ${isDragActive ? "border-primary bg-primary/10" : "border-border bg-muted/40 hover:bg-muted"}`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-8 w-8 text-primary" />
        <div className="mt-3 text-sm font-medium">Drag &amp; drop images here</div>
        <div className="mt-1 text-xs text-muted-foreground">or click to browse · up to {max} images · 8MB each</div>
      </div>
      {Object.entries(progress).map(([name, pct]) => (
        <div key={name} className="rounded-xl bg-muted p-3">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span className="truncate">{name}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-background">
            <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ))}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {value.map((img, i) => (
            <div key={img.public_id + i} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
              <img src={img.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/90 opacity-0 transition group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}