<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload"
            >
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixin from '@/mixins/mixin'

export default {
  name: "ItemEdit",
  mixins:[mixin],
  data() {
    return {
      model: {
        name: '',
        icon: ''
      },
    }
  },
  props: ['id'],
  created() {
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`,this.model)
      }else {
        res = await this.$http.post('rest/items',this.model)
      }
      if (res.status === 200) {
        this.$router.push('/items/list')
        this.$message({
          type:"success",
          message: '保存成功'
        })
      }
    },
    async fetch() {
      const {data} = await this.$http.get(`rest/items/${this.id}`)
      this.model = data
    },
    afterUpload(res) {
      this.model.icon = res.url
    }
  }
}
</script>

<style scoped>

</style>