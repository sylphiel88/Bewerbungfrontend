import React from "react";

function Preview(props){
    return(
    <div>
        <div dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
    )
}

export default Preview