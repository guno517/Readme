import { compose, withHandlers } from "recompose";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import EditorView from "./EditorView";

export default compose(
    withHandlers({
        handleEditorStateChange: (props) => (editorState) => {
            console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        },
    })
)(EditorView);
