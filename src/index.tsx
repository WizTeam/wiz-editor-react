import * as React from 'react'
import {
  Editor,
  EditorOptions,
  createEditor,
  AuthPermission,
  AuthMessage,
  assert
} from 'wiz-editor/client'

export * from 'wiz-editor/client'

interface EditorProps {
  options: EditorOptions
  containerStyle?: React.CSSProperties
  editorStyle?: React.CSSProperties
  containerClassName?: string
  className?: string
  userId: string
  displayName: string
  avatarUrl: string
  appId: string
  docId: string
  permission: AuthPermission
  accessToken: string
  userData?: any
  onCreate?: (editor: Editor) => void
  onDestroy?: (editor: Editor) => void
}

export const WizEditor = (props: EditorProps) => {
  const editorContainerRef = React.useRef(null)
  const editorRef = React.useRef<Editor | null>(null)
  //
  React.useEffect(() => {
    if (!editorContainerRef.current) {
      return
    }
    if (editorRef.current) {
      if (props.onDestroy) {
        props.onDestroy(editorRef.current)
      }
      editorRef.current.destroy()
      editorRef.current = null
    }
    //
    const auth: AuthMessage = {
      appId: props.appId,
      userId: props.userId,
      displayName: props.displayName,
      avatarUrl: props.avatarUrl,
      docId: props.docId,
      token: props.accessToken,
      permission: props.permission,
      userData: props.userData
    }

    assert(editorContainerRef.current)
    editorRef.current = createEditor(
      editorContainerRef.current!,
      props.options,
      auth
    )
    if (props.onCreate) {
      props.onCreate(editorRef.current)
    }
  }, [
    props.appId,
    props.docId,
    props.accessToken,
    props.permission,
    props.options,
    props.onCreate,
    editorContainerRef.current
  ])

  return (
    <div style={props.containerStyle} className={props.containerClassName}>
      <div
        ref={editorContainerRef}
        style={props.editorStyle}
        className={props.className}
      />
    </div>
  )
}
