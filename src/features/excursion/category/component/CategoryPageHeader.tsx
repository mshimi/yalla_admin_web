import React from "react";
import { Button, Stack } from "react-bootstrap";
import { Plus } from "lucide-react";

interface Props {
  onAddCategory: () => void;
}

const CategoryPageHeader: React.FC<Props> = ({ onAddCategory }) => {
  return (
    <Stack direction="horizontal" className="p-3" gap={3}>
      <h2 className="mb-0">Categories</h2>
      <div className="ms-auto">
        <Button variant="primary" onClick={onAddCategory} className="d-none d-sm-inline-flex align-items-center gap-2">
          <Plus size={18} /> Add Category
        </Button>
        <Button variant="primary" onClick={onAddCategory} className="d-inline-flex d-sm-none">
          <Plus size={18} />
        </Button>
      </div>
    </Stack>
  );
};

export default CategoryPageHeader;