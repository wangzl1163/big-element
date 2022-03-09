import { vueVersion } from '../../../Store/index'

let TableColumnSlotRender = null
let name = 'TableColumnSlotRender'

if (vueVersion.isVue2()) {
	TableColumnSlotRender = {
		name,
		props: {
			row: Object,
			render: Function,
			index: Number,
			column: {
				type: Object,
				default: null
			}
		}
	}
	TableColumnSlotRender.functional = true
	TableColumnSlotRender.render = (h, ctx) => {
		const params = {
			row: ctx.props.row,
			index: ctx.props.index
		}

		if (ctx.props.column) params.column = ctx.props.column

		const render = ctx.props.render.bind(ctx)
		return render(h, params)
	}
}

if (vueVersion.isVue3()) {
	TableColumnSlotRender = (props, context) => {
		let params = {
			row: props.row,
			index: props.index
		}

		if (props.column) {
			params.column = props.column
		}

		const render = props.render.bind(context)

		return render(params)
	}
	TableColumnSlotRender.props = {
		row: Object,
		render: Function,
		index: Number,
		column: {
			type: Object,
			default: null
		}
	}
}

export default TableColumnSlotRender
