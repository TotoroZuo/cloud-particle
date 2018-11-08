/*
 * @Description: 导入文件
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-11-08 13:49:07
 * @Email: zlf@zuolongfei.me
 */

<template>
    <div class="global-list-container royal-paper royal-paper-1">
        <div class="imports-btns">
            <el-button type="primary" size="small" v-if="type && fileLists.length" @click="submitUpload">确定导入</el-button>
            <el-button type="primary" size="small" @click="dialogVisible=true">模板下载</el-button>
        </div>
        <el-form ref="form"  label-width="80px" label-position="left" size="small">
            <el-form-item class="import-form-item" label="文件类型">
                <el-select v-model="type" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item class="import-form-item" label="上传文件">
                <el-upload
                    class="avatar-uploader"
                    ref="upload"
                    :with-credentials="true"
                    action="/apis/file/upload"
                    :on-success="uploadDone"
                    name="file"
                    :auto-upload="false"
                    :data="{type:type}"
                    :limit="2"
                    :file-list="fileLists"
                    :on-change="rechooseFile"
                    >
                    <i  class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="clear"></div>
        <el-dialog
            title="下载模板"
            :visible.sync="dialogVisible"
            @close="clearTemplateType"
            width="30%">
            <div>
                <el-radio-group v-model="templateType" size="medium" class="dowload-radios">
                    <el-radio  v-for="item in options"
                    :key="item.value" :label="item.value">{{item.name+'模板'}}
                    </el-radio>
                </el-radio-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="downloadTemplate" size="small" v-if="templateType">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'imports',
  data () {
    return {
      options: [],
      type: '',
      fileLists: [],
      dialogVisible: false,
      templateType: null
    }
  },
  created () {
    this.getTypeList()
  },
  methods: {

    rechooseFile (files, fileList) {
      if (fileList.length > 1) {
        this.fileLists = fileList.slice(-1)
      } else {
        this.fileLists = fileList
      }
    },
    getTypeList () {
      this.$apis.imports.getTypeList().then(res => {
        if (res.code == '0000') {
          this.options = res.data
        } else {
          this.$notify({
            title: '数据异常',
            message: res.data,
            position: 'top-right',
            type: 'warning'
          })
        }
      }).catch(error => {
        if (error) {
          console.log()
        }
      })
    },
    downloadTemplate () {
      const url = '/apis/file/downloadTemplate?type=' + this.templateType
      this.$common.openDownLoadLink(url)
      this.dialogVisible = false
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    uploadDone (res, file, fileList) {
      if (res.code == '0000') {
        this.$alert('导入成功', {
          confirmButtonText: '确定',
          type: 'success',
          center: true
        }).then(() => {
          this.type = ''
          this.$refs.upload.clearFiles()
        })
      } else {
        this.$alert(res.data, {
          confirmButtonText: '确定',
          type: 'error',
          center: true
        })
      }
    },
    clearTemplateType () {
      this.templateType = null
    }
  }
}
</script>
<style lang="stylus" scoped>
.global-list-container
    position relative
.import-form-item {
    float: left;
    margin-right: 20px;
}
.imports-btns
    position absolute
    right 15px
    top:15px;

>>>.import-form-item .el-form-item__label {
    font-size: 16px;
}
>>> .avatar-uploader .el-upload {
    border: 1px dashed #dcdfe6;
    // border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

>>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

>>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
}
>>>.dowload-radios .el-radio+.el-radio
    margin-left 0
.dowload-radios .el-radio
    margin-right 15px;
    margin-top 15px;
    width 150px;
.dowload-radios .el-radio,>>>.dowload-radios .el-radio__label
    font-size 16px!important
</style>
