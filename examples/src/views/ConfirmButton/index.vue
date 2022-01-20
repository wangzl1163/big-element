<template>
	<h2>基础用法</h2>
	<p>ConfirmButton 弹出一个对话框，用于操作时确认消息。</p>
	<section>
		<p>
			可以传入三个属性：title、message、confirmType、popconfirmButtonAttrs。title属性用于定义标题，它是可选的，默认值为“警告”，在confirmType为box时生效。message属性用于描述内容。confirmType属性用于指定对话框类型（box或pop）——messageBox或气泡确认框。popconfirmButtonAttrs属性用于当为气泡确认框时为按钮指定属性。更多messageBox或popconfirm属性可以参考
			element-ui 或 element-plus 的组件说明。
		</p>

		<div class="confirm-btn-list">
			<BEConfirmButton title="提示" message="确认删除吗？" @cancel="handleCancel" @confirm="handleConfirm"> </BEConfirmButton>

			<BEConfirmButton type="primary" title="提示" message="确认删除吗？" @cancel="handleCancel" @confirm="handleConfirm">
				点我展示message box的 confirm
			</BEConfirmButton>

			<BEConfirmButton
				confirmType="pop"
				:popconfirmButtonAttrs="{ type: 'primary' }"
				message="确认删除吗？"
				@cancel="handleCancel"
				@confirm="handleConfirm"
			>
				点我展示popconfirm
			</BEConfirmButton>
		</div>
	</section>
</template>

<script setup lang="ts">
const handleConfirm = () => {}
const handleCancel = () => {}
</script>

<style>
.confirm-btn-list{
	display: flex;
	justify-content: space-evenly;
}
</style>
