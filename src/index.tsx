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

interface Props {
  options: EditorOptions
  containerStyle?: React.CSSProperties
  editorStyle?: React.CSSProperties
  containerClassName?: string
  className?: string
  appId: string
  docId: string
  permission: AuthPermission
  accessToken: string
  onCreate?: (editor: Editor) => void
}

export const WizEditor = (props: Props) => {
  const editorContainerRef = React.useRef(null)
  const editorRef = React.useRef<Editor | null>(null)
  //
  React.useEffect(() => {
    if (!editorContainerRef.current) {
      return
    }
    const auth: AuthMessage = {
      appId: props.appId,
      userId: props.options.user.userId,
      docId: props.docId,
      token: props.accessToken,
      permission: props.permission
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
