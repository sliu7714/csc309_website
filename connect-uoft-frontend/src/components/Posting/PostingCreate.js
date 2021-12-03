import React from "react";
import Posting from "./Posting";
import PostingAdmin from "./PostingAdmin.js";

const Components = {
  posting: Posting, //User view of psotings
  postingAdmin: PostingAdmin, //Admin view of postings
};



const CreatePosting = (block, isAdmin) => {
  if (isAdmin) {
    return React.createElement(Posting, {
      key: block.id,
      block: block
    });
  }
  else {
    return React.createElement(Posting, {
      key: block.id,
      block: block
    });
  }
}

export default CreatePosting;