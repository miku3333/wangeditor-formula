/**
 * @description formula module entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor/editor';
import withFormula from './plugin';
import renderElemConf from './render-elem';
import elemToHtmlConf from './elem-to-html';
import parseHtmlConf from './parse-elem-html';
import menu from './menu';

const module: Partial<IModuleConf> = {
    editorPlugin: withFormula,
    renderElems: [renderElemConf],
    elemsToHtml: [elemToHtmlConf],
    parseElemsHtml: [parseHtmlConf],
    menus: [menu],
};

export default module;
