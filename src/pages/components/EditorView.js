import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Container, Input, Button } from "reactstrap";
import PropTypes from "prop-types";
import { convertFromRaw } from 'draft-js';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }

  onContentStateChange: Function = (contentState) => {
    this.setState({
      contentState,
    });
  };
}

function uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

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
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
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
