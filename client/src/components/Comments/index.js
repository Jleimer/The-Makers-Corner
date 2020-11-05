import React, { useState } from 'react';
import { ADD_COMMENT } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

const commentForm = ({ postId }) => {

const [commentBody, setBody] = useState('');
const [characterCount, setCharacterCount] = useState(0);
const [addReaction, { error }] = useMutation(ADD_COMMENT);

const handleChange = event => {
  if (event.target.value.length <= 280) {
    setBody(event.target.value);
    setCharacterCount(event.target.value.length);
  }
};

const handleFormSubmit = async event => {
    await addReaction({
        variables: { commentBody, postId }
      });
  event.preventDefault();
  setBody('');
  setCharacterCount(0);
};

// return (
//     <div>
//       <p className="m-0">
//         {characterCount}: 0/280
//       </p>
//       <form className="flex-row justify-center justify-space-between-md align-stretch"
//       onSubmit={handleFormSubmit}>
//         <textarea
//           placeholder="Leave a reaction to this thought..."
//           value={reactionBody}
//           className="form-input col-12 col-md-9"
//           onChange={handleChange}
//         ></textarea>

//         <button className="btn col-12 col-md-3" type="submit">
//           Submit
//         </button>
//       </form>
//       {error && <span className="ml-2">Something went wrong...</span>}
//     </div>
//   );
};

export default commentForm