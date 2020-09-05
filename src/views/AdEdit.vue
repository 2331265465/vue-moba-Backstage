<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}广告</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="text" size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item,index) in model.items" :key="index">
            <el-form-item label="跳转链接" style="border-top: 1px solid gray;padding-top: 0.5rem">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="model.items.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
  name: "AdEdit",
  mixins:[mixin],
  data() {
    return {
      model: {
        items: []
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
        res = await this.$http.put(`rest/ads/${this.id}`,this.model)
      }else {
        res = await this.$http.post('rest/ads',this.model)

      }
      if (res.status === 200) {
        this.$router.push('/ads/list')
        this.$message({
          type:"success",
          message: '保存成功'
        })
      }else {
        this.$message({
          type:"error",
          message: '保存失败'
        })
      }
    },
    async fetch() {
      const {data} = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({},this.model,data)
    }
  }
}
</script>

<style scoped>

</style>