<template>
  <div class="yl-container">
    <h3>收藏列表</h3>
    <el-table v-loading="loading" :data="datalist" ref="multipleTable" stripe border>
        <el-table-column label="IP名称" prop="name" ></el-table-column>
        <el-table-column label="平台" prop="platform" ></el-table-column>
        <el-table-column label="视频链接" prop="url" >
          <template slot-scope="scope">
            <el-link :href="scope.row.h5Href" target="_blank">{{scope.row.url}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" ></el-table-column>
        <el-table-column label="时长" prop="timeSpan" ></el-table-column>
        <el-table-column label="发布时间" prop="publishDate" ></el-table-column>
        <el-table-column label="作者" prop="author" ></el-table-column>
        <el-table-column label="作者链接" prop="authorLink" >
          <template slot-scope="scope">
            <el-link :href="scope.row.authorLink" target="_blank">{{scope.row.authorLink}}</el-link>
          </template>
        </el-table-column>
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
      loading: true,
      datalist: []
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.getCollectList()
  },
  beforeDestroy () {},
  destroyed () {},
  methods: {
    async getCollectList () {
      const storageSelectpickerProjectList = await this.ChromeStorage.get('selectpicker-projectList')
      const storageSelectpickerProjectName = await this.ChromeStorage.get('selectpicker-project')
      const projectId = this.Util.findSelectpickerProjectId(storageSelectpickerProjectName, storageSelectpickerProjectList)
      const that = this
      const params = {
        source: 1, // 来源表 0监测表；1 插件
        auditStatus: 0, // 审核状态:0未审核；1审核侵权；2不侵权;3审核中
        projectId: projectId // 1标识3000部,稳定后会改成接口获取
      }
      this.loading = true
      this.GlobalApi.monitorWorkResultAuditUrlCollectList(params).then(res => {
        if (res.data && res.data.data) {
          that.datalist = that.dealDataList(res.data.data)
          that.loading = false
        }
      }).catch(err => {
        console.log(err)
        that.$elMsg.error('未登录')
        that.loading = false
      })
    },
    dealDataList (arr) {
      const that = this
      arr.forEach(li => {
        const siteName = that.Util.judgeWebType(li.url)
        if (siteName === '快手') {
          const origin = 'https://m.gifshow.com'
          const urlArr = li.url.split('/')
          const photoId = urlArr[urlArr.length - 1]
          const pathname = `/fw/photo/${photoId}`
          li.h5Href = `${origin}${pathname}`
        } else {
          li.h5Href = li.url
        }
      })
      return arr
    }
  }
}
</script>

<style lang='scss' scoped>
.yl-container {
  background: #f7f8fa;
}
</style>
