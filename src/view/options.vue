<template>
  <div class="yl-container">
    收藏列表
    <h3></h3>
    <el-table :data="datalist" ref="multipleTable" stripe border>
        <el-table-column label="IP名称" prop="name" ></el-table-column>
        <el-table-column label="平台" prop="platform" ></el-table-column>
        <el-table-column label="视频链接" prop="url" ></el-table-column>
        <el-table-column label="标题" prop="title" ></el-table-column>
        <el-table-column label="时长" prop="timeSpan" ></el-table-column>
        <el-table-column label="发布时间" prop="publishDate" ></el-table-column>
        <el-table-column label="作者" prop="author" ></el-table-column>
        <el-table-column label="作者链接" prop="authorLink" ></el-table-column>
        <!-- <el-table-column label="操作" width="300" >
          <template slot-scope="scope">
            <div class="yl-table-operation">
            </div>
          </template>
        </el-table-column> -->
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'popupView',
  components: {},
  data () {
    return {
      datalist: []
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    const that = this
    console.log(this.Util, this.Config, this.ChromeStorage, this.GlobalApi)
    const params = {
      source: 1, // 来源表 0监测表；1 插件
      auditStatus: 0 // 审核状态:0未审核；1审核侵权；2不侵权;3审核中
    }
    this.GlobalApi.monitorWorkResultAuditUrlCollectList(params).then(res => {
      if (res.data && res.data.data) {
        that.datalist = res.data.data
      }
    }).catch(err => {
      console.log(err)
      that.$elMsg.error('未登录')
    })
  },
  beforeDestroy () {},
  destroyed () {},
  methods: {}
}
</script>

<style lang='scss' scoped>
.yl-container {
  background: #f7f8fa;
}
</style>
