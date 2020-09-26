import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { Container, Input, Button } from "reactstrap";
import PropTypes from "prop-types";

const EditorView = ({ editorState, handleChange, handleSubmit, handleEditorStateChange }) => (
    <Container id="editorcontainer">
        <p />
        <Input type="text" name="title" id="title" placeholder="제목을 작성해주세요." onChange={handleChange} />
        <div className="demo-section">
            <Editor
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorState={editorState}
                localization={{
                    locale: "ko",
                }}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                }}
                onEditorStateChange={handleEditorStateChange}
            />
        </div>
        <p />
        <Button id="savebutton" onClick={handleSubmit}>저장하기</Button>
    </Container>
);

EditorView.propTypes = {
    editorState: PropTypes.shape([

    ]).isRequired,
    handleEditorStateChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleEditorStateChange: PropTypes.func.isRequired,
};

export default EditorView;
