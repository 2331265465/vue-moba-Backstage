<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
     <el-tabs value="basic" type="border-card">
       <el-tab-pane label="基本信息" name="basic">
         <el-form-item label="名称">
           <el-input v-model.trim="model.name"></el-input>
         </el-form-item>
         <el-form-item label="称号">
           <el-input v-model.trim="model.title"></el-input>
         </el-form-item>

         <el-form-item label="头像">
           <el-upload
               class="avatar-uploader"
               :action="uploadUrl"
               :show-file-list="false"
               :on-success="afterUpload"
           >

             <img v-if="model.avatar" :src="model.avatar" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
         </el-form-item>

         <el-form-item label="类型">
           <el-select v-model="model.categories" multiple>
             <el-option
                 v-for="item in categories"
                 :key="item._id"
                 :value="item._id"
                 :label="item.name"
             >
             </el-option>
           </el-select>
         </el-form-item>
         <el-form-item  label="难度" v-if="model.scores">
           <el-rate style="margin-top: 10px" show-score v-model.trim="model.scores.difficult"></el-rate>
         </el-form-item>
         <el-form-item  label="技能" v-if="model.scores">
           <el-rate style="margin-top: 10px" show-score v-model.trim="model.scores.skills"></el-rate>
         </el-form-item>
         <el-form-item  label="攻击" v-if="model.scores">
           <el-rate style="margin-top: 10px" show-score v-model.trim="model.scores.attack"></el-rate>
         </el-form-item>
         <el-form-item  label="生存" v-if="model.scores">
           <el-rate style="margin-top: 10px" show-score v-model.trim="model.scores.survive"></el-rate>
         </el-form-item>

         <el-form-item label="顺风出装">
           <el-select v-model="model.items1" multiple>
             <el-option
                 v-for="item in items"
                 :key="item._id"
                 :value="item._id"
                 :label="item.name"
             >
             </el-option>
           </el-select>
         </el-form-item>

         <el-form-item label="逆风出装">
           <el-select v-model="model.items2" multiple>
             <el-option
                 v-for="item in items"
                 :key="item._id"
                 :value="item._id"
                 :label="item.name"
             >
             </el-option>
           </el-select>
         </el-form-item>

         <el-form-item label="使用技巧">
           <el-input type="textarea" v-model="model.usageTips"></el-input>
         </el-form-item>
         <el-form-item label="对线技巧">
           <el-input type="textarea" v-model="model.battleTips"></el-input>
         </el-form-item>
         <el-form-item label="团战思路">
           <el-input type="textarea" v-model="model.teamTips"></el-input>
         </el-form-item>
       </el-tab-pane>
       <el-tab-pane label="技能" name="skills">
         <el-button type="text" size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
         <el-row type="flex" style="flex-wrap: wrap">
           <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
             <el-form-item label="名称" style="border-top: 1px solid gray;padding-top: 0.5rem">
               <el-input v-model="item.name"></el-input>
             </el-form-item>
             <el-form-item label="图标">
                 <el-upload
                     class="avatar-uploader"
                     :action="uploadUrl"
                     :show-file-list="false"
                     :on-success="res => $set(item,'icon', res.url)"
                 >
                   <img v-if="item.icon" :src="item.icon" class="avatar">
                   <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                 </el-upload>
             </el-form-item>
             <el-form-item label="描述">
               <el-input type="textarea" v-model="item.description"></el-input>
             </el-form-item>
             <el-form-item>
               <el-button type="danger" size="small" @click="model.skills.splice(index,1)">删除</el-button>
             </el-form-item>
           </el-col>
         </el-row>
       </el-tab-pane>
     </el-tabs>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixin from '@/mixins/mixin'
export default {
  name: "HeroEdit",
  mixins:[mixin],
  data() {
    return {
      categories: [],
      items: [],
      model: {
        name:'',
        avatar:'',
        title: '',
        categories:[],
        usageTips:'',
        skills:[],
        scores: {
          difficult:0,
          skills:0,
          attack:0,
          survive:0
        }
      },
    }
  },
  props: ['id'],
  created() {
    this.fetchCategories()
    this.fetchItems()
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`,this.model)
      }else {
        res = await this.$http.post('rest/heroes',this.model)
      }
      if (res.status === 200) {
        this.$router.push('/heroes/list')
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
      const {data} = await this.$http.get(`rest/heroes/${this.id}`)
      this.model = Object.assign({},this.model,data)
    },
    async fetchCategories() {
      const {data} = await this.$http.get(`rest/categories`)
      this.categories = data
    },
    async fetchItems() {
      const {data} = await this.$http.get(`rest/items`)
      this.items = data
    },
    afterUpload(res) {
      this.model.avatar = res.url
    }
  }
}
</script>

<style scoped>

</style>