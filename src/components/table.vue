<template>
	<div class="table-parent">
		<v-table
      style="width:100%"
		  is-horizontal-resize
	      :columns="tableConfig.columns"
	      :table-data="tableConfig.tableData"
	      title-bg-color="#3D9CD9"
	      :title-row-height="22"
	      :row-height="30"
	      :show-vertical-border="false"
	      :show-horizontal-border="false"
	      error-content="无记录"
	      :rowClick="rowClick"
	    ></v-table>
	    <div v-if="pagination" class="table-pagination">
	    	<v-pagination size="small" :layout="['prev', 'pager', 'next', 'total']" :total="total" :page-size="pageSize" :show-paging-count="3" @page-change="pageChange"></v-pagination>
	    </div>
	</div>
</template>
<script>
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'
export default {
	props: {
		tableConfig: {
			type: Object,
			default: function () {
				return {};
			}
		},
		rowClick: {
			type: Function,
			default: function () {
				return {}
			}
		},
		pagination: {
			type: Boolean,
			default: false
		},
		total: {
			type: Number,
			default: 0
		},
		pageSize: {
			type: Number,
			default: 10
		}
	},
	components: {
		VTable,
		VPagination
	},
	data () {
		return {
			pageIndex: 0
		}
	},
	methods: {
		pageChange (pageIndex) {
			if (this.pageIndex === pageIndex) return;
			this.pageIndex = pageIndex;
			this.$emit('page-change', pageIndex);
		}
	},
	created () {

	}
}
</script>
<style scoped>
	.table-parent {
		width: 100%;
		height: 100%;
	}
	.table-parent /deep/ .v-table-views {
		border: none;
	}
	.table-parent /deep/ .v-table-rightview .v-table-body {
		overflow-y: hidden;
	}
	.table-parent /deep/ .v-table-title-class {
		color: #fff;
		background:rgb(61, 156, 217);
	}
	.table-parent /deep/ .v-table-title-cell {
		border-right: 1px solid #fff;
		box-sizing: border-box;
	}
	.table-parent /deep/ .v-table-title-cell last-child{
		border: none;
	}
	.table-parent /deep/ .v-table-body-cell {
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: .27rem;
		color: rgb(51, 51, 51);
		font-weight: 400;
	}
	.table-pagination {
		padding: 10px 0;
	}
	.table-pagination /deep/ .v-page-total {
		display: block;
		float: initial;
	}
</style>
