import React from "react";
import Posting from "./ManagePosting";

const Components = {
  posting: Posting,
};

const CreatePosting = (block) => {
  if (typeof Components[block.component] !== "undefined") {
    return React.createElement(Components[block.component], {
      key: block.id,
      block: block
    });
  }
  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block.id }
  );
};

export default CreatePosting;