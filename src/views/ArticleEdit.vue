<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
              v-for="item in categories"
              :key="item._id"
              :label="item.name"
              :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情" >
        <vue-editor
            style="height: 50vh"
            v-model="model.body"
            useCustomImageHandler
            @image-added="handleImageAdded"
        >

        </vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-top: 5rem" type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ArticleEdit",
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        categories: [],
        title: '',
        body: '',
      },
      categories: []
    }
  },
  props: ['id'],
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`,this.model)
      }else {
        res = await this.$http.post('rest/articles',this.model)
      }
      if (res.status === 200) {
        this.$router.push('/articles/list')
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
      const {data} = await this.$http.get(`rest/articles/${this.id}`)
      this.model = data
    },
    async fetchCategories() {
      const {data} = await this.$http.get('rest/categories')
      this.categories = data.filter(item => {
        return !item.parent
      })
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append('file', file);

      const {data} = await this.$http.post("https://fakeapi.yoursite.com/images", {data: formData})

        Editor.insertEmbed(cursorLocation, "image", data.url);
        resetUploader();
    }
  }
}
</script>

<style scoped>

</style>