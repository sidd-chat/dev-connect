import React, { useEffect, useRef } from "react";

import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { foldGutter, indentOnInput, bracketMatching } from "@codemirror/language";
import { defaultKeymap, indentWithTab, history, historyKeymap } from "@codemirror/commands";
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap, deleteBracketPair } from "@codemirror/autocomplete";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
// import { githubDark } from "@uiw/codemirror-theme-github";

const Editor = ({ code, setCode, readOnly }) => {
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);  // to store EditorView instance

  useEffect(() => {
    if(editorViewRef.current)
      editorViewRef.current.destroy()

    const state = EditorState.create({
      doc: code?.length > 0 ? code : "console.log('Hello World!');",
      extensions: [
        keymap.of([
          ...historyKeymap,
          ...defaultKeymap,
          ...completionKeymap,
          ...closeBracketsKeymap,
          // { key: "Backspace",
          //  run: (view) => deleteBracketPair(view) || defaultKeymap.find(k => k.key === "Backspace")?.run(view) },
          indentWithTab
        ]),
        javascript(),
        lineNumbers(),
        foldGutter(),
        indentOnInput(),
        bracketMatching(),
        history(),
        closeBrackets(),
        // autocompletion(),
        oneDark,
        EditorState.readOnly.of(readOnly), // ⬅️ Make editor read-only
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if(update.docChanged) {
            const newText = update.state.doc.toString()
            setCode(newText)
          }
        })
      ],
    });

    editorViewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => editorViewRef.current.destroy(); // Cleanup
  }, []);

  useEffect(() => {
    // condition when snippet has been posted, therefore code = ''
    // which is no longer equal to the editor code
    if (editorViewRef.current && code !== editorViewRef.current.state.doc.toString()) {
      editorViewRef.current.dispatch({
        changes: {
          from: 0, to: editorViewRef.current.state.doc.length,
          insert: code || "console.log('Hello World!');"
        }
      });
    }
  }, [code]);

  return (
    // <div>
    //   <select
    //     value={language}
    //     onChange={(e) => setLanguage(e.target.value)}
    //     style={{ marginBottom: "10px", padding: "5px" }}
    //   >
    //     <option value="javascript">JavaScript</option>
    //     <option value="python">Python</option>
    //     <option value="html">HTML</option>
    //   </select>

      <div className="w-xl" ref={editorRef} />
    // </div>
  )
};

export default Editor;