import React, { useEffect } from 'react'

import { WizEditor, Editor, EditorOptions, EditorDoc, domUtils, assert } from 'wiz-editor-react'

const appId = '';

function handleUploadResource(editor: Editor, file: File): Promise<string> {
  assert(editor);
  return domUtils.fileToDataUrl(file);
}

const App = () => {
  const [docId, setDocId] = React.useState<string>('doc1');
  const [docData, setDocData] = React.useState<EditorDoc | null>(null);
  const editorRef = React.useRef<Editor | null>(null);
  //
  useEffect(() => {
    const initData = localStorage.getItem(docId);
    setDocData(initData ? JSON.parse(initData) : null);
  }, [docId]);

  const options: EditorOptions = {
    local: true,
    initLocalData: docData ? docData : undefined,
    titleInEditor: true,
    serverUrl: '',
    user: {
      userId: 'test-user',
      displayName: 'Test User',
    },
    callbacks: {
      onUploadResource: handleUploadResource,
    }
  };

  function handleCreated(editor: Editor) {
    editorRef.current = editor;
  }

  function loadDocument(id: string) {
    if (editorRef.current) {
      const id = editorRef.current.docId();
      const data = editorRef.current.data();
      localStorage.setItem(id, JSON.stringify(data));
    }
    setDocId(id);
    const initData = localStorage.getItem(id);
    setDocData(initData ? JSON.parse(initData) : null);
  }

  return <div>
    <div style={{
      height: 40,
      display: 'flex'
    }}>
      <button onClick={
        () => {
          loadDocument('doc1');
        }
      }>
        load doc1
      </button>
      <button onClick={
        () => {
          loadDocument('doc2');
        }
      }>
        load doc2
      </button>
    </div>
    <WizEditor
      appId={appId}
      docId={docId}
      options={options}
      permission={'w'}
      accessToken=""
      onCreate={handleCreated}
      containerStyle={{
        border: '1px solid #f0f0f0',
        maxWidth: 800,
        minHeight: 800,
        margin: '40px auto 40px auto'
      }}
    />
  </div>
}

export default App
