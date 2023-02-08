import ReactDOM from 'react-dom/client';
import { Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

class BaseModalMenu {
    id: string = `modal-${Math.random().toString(36).slice(2)}`;
    title: string;
    tag: string;
    $ele: HTMLDivElement;
    $root: any;
    ifInit: boolean = false;
    controlShow: (i: boolean) => void = Function.prototype as any;

    constructor() {
        this.title = 'My Modal';
        this.tag = 'button';
        this.$ele = document.createElement('div');
        this.$ele.id = this.id;
        document.body.appendChild(this.$ele);
        this.$root = ReactDOM.createRoot(this.$ele!);
    }

    modalInit = (method: (i: boolean) => void) => {
        // 这里把控制react的方法透出
        this.controlShow = method;
    };

    isActive() {
        return false; // or false
    }

    isDisabled() {
        return false; // or true
    }

    exec(_, value) {
        if (this.ifInit) {
            this.controlShow(true);
            return;
        }
        // editor.insertText(value)
        this.$root.render(value);
        this.ifInit = true;
    }
}
function CsModal({ onInit, editor, id }) {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const close = () => {
        setIsModalVisible(false);
    };
    const onOk = () => {
        if (iframeRef.current) {
            const kfe = iframeRef.current.contentWindow.kfe;
            let latex = kfe.execCommand('get.source');
            latex = latex.replace(/\s/g, ''); // 去掉空格
            kfe.execCommand('render', '\\placeholder ');
            // editor.editor.dangerouslyInsertHtml(
            //     `<span class="formula" data-latex=${latex}>@F${latex}@</span>`,
            // );
            const formulaElem: FormulaElement = {
                type: 'formula',
                value: latex,
                children: [{ text: '' }], // void node 需要有一个空 text
            };
            editor.insertNode(formulaElem);
            // editor.dangerouslyInsertHtml(
            //     `<h1>标题</h1><p>文本 <b>加粗</b></p>`,
            // );
        }
        // const node = document.getElementById(inputIFrameId);
        setIsModalVisible(false);
    };

    useEffect(() => {
        onInit(setIsModalVisible);
    }, []);

    useEffect(() => {
        // if (isModalVisible && iframeRef.current) {
        //     const kfe = iframeRef.current.contentWindow.kfe;
        //     kfe?.execCommand('focus');
        // }
    }, [isModalVisible]);

    return (
        <Modal
            title="Basic Modal"
            open={isModalVisible}
            onOk={onOk}
            onCancel={close}
            width={900}
            forceRender
        >
            <iframe
                ref={iframeRef}
                width="100%"
                height={500}
                src="/kityformula/index.html"
            ></iframe>
        </Modal>
    );
}

export class ModalMenu extends BaseModalMenu {
    constructor() {
        super();
    }

    getValue(editor) {
        return <CsModal onInit={this.modalInit} editor={editor} id={this.id} />;
    }
}

const conf = {
    key: 'myModalMenu',
    factory() {
        return new ModalMenu();
    },
};

export default conf;
