# wiz-editor-react

> wiz editor react component

## Install

```bash
npm install --save wiz-editor-react
```

## Usage

```tsx
import React, { Component } from 'react'

import { WizEditor } from 'wiz-editor-react'

const appId = '';

class Example extends Component {
  render() {
    const docId = 'doc1';

    const options: EditorOptions = {
      local: true,
      titleInEditor: true,
      serverUrl: '',
      user: {
        userId: 'test-user',
        displayName: 'Test User',
      },
    };

    return <WizEditor
      appId={appId}
      docId={docId}
      options={options}
      permission={'w'}
      accessToken=""
      containerStyle={{
        border: '1px solid #f0f0f0',
        maxWidth: 800,
        minHeight: 800,
        margin: '40px auto 40px auto'
      }}
    />
  }
}
```

## License

MIT © [wiz-editor](https://github.com/WizTeam)
