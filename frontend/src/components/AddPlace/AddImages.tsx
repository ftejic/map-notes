import { Label } from "../ui/label";
import { Input } from "../ui/input";

function AddImages() {
  return (
    <>
      <p className="mb-1">Images</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label>Image 1</Label>
          <Input id="picture1" type="file" accept="image/jpeg, image/png," />
        </div>
        <div>
          <Label>Image 2</Label>
          <Input id="picture2" type="file" accept="image/jpeg, image/png," />
        </div>
        <div>
          <Label>Image 3</Label>
          <Input id="picture3" type="file" accept="image/jpeg, image/png," />
        </div>
        <div>
          <Label>Image 4</Label>
          <Input id="picture4" type="file" accept="image/jpeg, image/png," />
        </div>
      </div>
    </>
  );
}

export default AddImages;
