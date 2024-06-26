import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChangeEvent, SetStateAction, useState } from "react";
import { useToast } from "../ui/use-toast";

interface AddImagesProps {
  images: (File | null)[];
  setImages: (value: SetStateAction<(File | null)[]>) => void;
}

function AddImages({ images, setImages }: AddImagesProps) {
  const [fileInputs, setFileInputs] = useState<(string | null)[]>(
    images.map(() => null)
  );
  const { toast } = useToast();

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newImages = [...images];
    const selectedFile = e.target.files?.[0] || null;

    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      newImages[index] = selectedFile;
      setFileInputs((prev) => {
        const newInputs = [...prev];
        newInputs[index] = e.target.value;
        return newInputs;
      });
    } else {
      newImages[index] = null;
      setFileInputs((prev) => {
        const newInputs = [...prev];
        newInputs[index] = null;
        return newInputs;
      });
      toast({
        variant: "destructive",
        description: "Please upload a JPG or PNG image.",
      });
    }

    setImages(newImages);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((_, index) => (
        <div key={index}>
          <Label>Image {index + 1}</Label>
          <Input
            id={`picture${index}`}
            type="file"
            accept="image/jpeg, image/png,"
            value={fileInputs[index] || ""}
            onChange={(e) => handleFileChange(e, index)}
          />
        </div>
      ))}
    </div>
  );
}

export default AddImages;
