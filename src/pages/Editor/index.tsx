import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { useState, useEffect, useRef } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import {
    Boot,
    IDomEditor,
    IEditorConfig,
    IToolbarConfig,
} from '@wangeditor/editor';
import formulaModule from '@/components/formulaModule';
import katex from '@/utils/katex';

Boot.registerModule(formulaModule);

const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: {
        index: 0,
        keys: ['myModalMenu'], // show menu in toolbar
    },
};

const MyEditor = () => {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null);
    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>');
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previewRef.current) {
            previewRef.current.innerHTML = html;
            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                for (const formula of previewRef.current?.querySelectorAll(
                    '.formula',
                )) {
                    // console.log('formula.dataset ===> ', formula.dataset);
                    katex.render(formula.dataset.value, formula, {
                        throwOnError: false,
                    });
                }
            });
        }
    }, [html]);

    // 工具栏配置

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
    };

    useEffect(() => {
        return () => {
            if (editor === null) return;
            editor.destroy();
            setEditor(null);
        };
    }, [editor]);

    return (
        <div>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div ref={previewRef} style={{ marginTop: '15px' }}></div>
        </div>
    );
};

export default MyEditor;
