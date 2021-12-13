// element 组件注册器

import { isVue2, isVue3 } from 'vue-demi';

import { Table, TableColumn, Pagination,Dialog,Button } from 'element-ui';
import { ElDialog, ElButton, ElTable, ElTableColumn, ElPagination } from 'element-plus';

let VButton,VDialog, VTable, VTableColumn, VPagination

if (isVue2) {
	VDialog = Dialog
	VButton = Button
	VTable = Table
	VTableColumn = TableColumn
	VPagination = Pagination
}

if (isVue3) {
	VDialog = ElDialog
	VButton = ElButton
	VTable = ElTable
	VTableColumn = ElTableColumn
	VPagination = ElPagination
}

export {
	VButton,
	VDialog,
	VTable,
	VTableColumn,
	VPagination
}