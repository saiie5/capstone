import React from 'react'

function Error({message}) {
    return (
      <>
        <div class="alert alert-danger" role="alert">
          {message}
        </div>
      </>
    );
}

export default Error
