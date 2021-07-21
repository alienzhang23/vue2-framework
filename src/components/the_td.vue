<template>
  <td
    class="the_td"
    :rowspan="items.rowspan"
    :colspan="items.colspan"
    :style="{
      backgroundColor: items.disabled ? '#f3f3f3' : '',
      textAlign: items.align ? 'center' : '',
    }"
  >
    <el-select
      v-if="items.value_type === 'select'"
      v-model="items.value"
      :placeholder="
        items.placeholder ? items.placeholder : `请输入${nextItem.label}`
      "
      :disabled="items.disabled"
      clearable
      @clear="clearQuery(items)"
    >
      <el-option
        v-for="item in items.selectOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      class="selectChoose"
      v-else-if="items.value_type === 'selectSearch'"
      :placeholder="
        items.comName
          ? items.comName
          : items.placeholder
          ? items.placeholder
          : `请输入${nextItem.label}`
      "
      :disabled="items.disabled"
      :filter-method="(val) => changData(val, items)"
      :loading="loading"
      filterable
      clearable
      @change="(val) => changselectData(val, items)"
      @clear="clearQuery(items)"
    >
      <el-option
        v-for="item in items.selectOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input-number
      v-else-if="items.value_type === 'inputNumber'"
      v-model="items.value"
      :disabled="items.disabled"
      :placeholder="
        items.disabled
          ? ''
          : items.placeholder
          ? items.placeholder
          : `请输入${nextItem.label}`
      "
      :controls="false"
    ></el-input-number>
    <el-input
      v-else-if="items.value_type === 'input'"
      v-model="items.value"
      :placeholder="
        items.placeholder ? items.placeholder : `请输入${nextItem.label}`
      "
      :disabled="items.disabled"
      clearable
    ></el-input>
    <el-input
      v-else-if="items.value_type === 'textarea'"
      type="textarea"
      :rows="4"
      :autosize="{ minRows: 4 }"
      :max="400"
      show-word-limit
      v-model="items.value"
      :placeholder="
        items.disabled ? '' : `请输入${nextItem.label}（限制输入400个汉字）`
      "
      :disabled="items.disabled"
    >
    </el-input>
    <el-radio-group
      v-model="items.value"
      v-else-if="items.value_type === 'radio'"
    >
      <el-radio
        :disabled="items.disabled"
        v-for="(el, index) in items.options"
        :key="index"
        :label="el.label"
        ></el-radio
      >
    </el-radio-group>
    <el-checkbox-group  v-model="items.value" v-else-if="items.value_type === 'checkbox'">
        <el-checkbox 
            :disabled="items.disabled"
            v-for="(el, index) in items.options"
            :key="index"
            :label="el.label"
        ></el-checkbox>
    </el-checkbox-group>
     <el-date-picker
      v-else-if="items.value_type === 'date'"
      v-model="items.value"
      :type="items.date_type ? items.date_type : 'date'"
      :picker-options="dateOptions"
      placeholder="选择日期"
      :disabled="items.disabled"
      @change="dateChange"
      @focus="openChange"
       @blur="openChange">
    </el-date-picker>
    <div
      class="material"
      v-else-if="items.value_type === 'material' && !items.multiple"
    >
      <div
        v-for="(item, index) in items.value"
        :key="item"
        class="materialName"
      >
        <div>
          <a
            :href="items.oss_address[index]"
            target="_blank"
            v-if="items.oss_address[index]"
            >{{ item }}<i class="el-icon-error"></i></a>
          <a v-else @click="showMsg">{{ item }}</a>
        </div>
        <el-upload
        v-if="items.isUpload"
        ref="upload"
        class="fileUpload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :before-upload="(value) => uploadFileBtn(value, items, item)"
        :limit="3"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      
      </div>
    </div>
    <div
      class="material"
      v-else-if="items.value_type === 'material' && items.multiple"
    >
      <div
        v-for="(item, index) in items.value"
        :key="index"
        class="materialName"
      >
        <div>
          <a :href="item.url" target="_blank" v-if="item.url"
            >{{ item.name }}<i class="el-icon-check"></i></a>
          <a v-else @click="showMsg">{{ item.name }}</a>
        </div>
       <i class="el-icon-error"></i>
      </div>
       <el-upload
        v-if="items.isUpload"
        :multiple="true"
        ref="upload"
        class="fileUpload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :before-upload="(value) => uploadFileBtn(value, items, item)"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      
    </div>
    <div v-else-if="items.value_type === 'upload'" class="upload-box">
      <div class="img-box">
        <div v-for="(img, index) in items.value" :key="index">
          <img v-if="img" :src="img" />
          <i v-if="!items.disabled" class="el-icon-error" @click="delImg(index, items)"></i>
        </div>
      </div>
      <el-upload
        ref="upload"
        class="upload"
        :disabled="items.disabled"
        :class="[items.disabled ? 'disable-upload' : '']"
        :show-file-list="false"
        accept="image/png, image/jpeg, image/jpg"
        :before-upload="(value) => handleBeforeUpload(value, items)"
        multiple
        action="//jsonplaceholder.typicode.com/posts/"
      >
        <div v-if="!items.disabled">请上传图片</div>
      </el-upload>
    </div>
    <div v-else>
      {{ items.value }}
    </div>
  </td>
</template>

<script>
import bus from "@/utils/bus";
export default {
  name: "the_td",
  props: {
    items: {
      type: Object,
      default: () => {},
    },
    nextItem: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      dateOptions: {},
    };
  },
  methods: {
    delFile(items, url) {
      items.value.forEach((item, index) => {
        if (item.url === url) {
          items.value.splice(index, 1);
          this.$forceUpdate();
        }
      });
    },
    showMsg() {
      this.$Message.error("暂无文件");
    },
    // 事件选择器
    dateChange(e) {
      this.items.value = e;
      if (this.items.key === "start_date") {
        window.sessionStorage.setItem("start_date", this.items.value);
        if (e === "") {
          window.sessionStorage.removeItem("start_date");
        }
      }
    },
    openChange(e) {
      const _this = this;
      if (e) {
        this.dateOptions = {
          disabledDate(date) {
            const startDate = window.sessionStorage.getItem("start_date");
            if (startDate && _this.items.key === "end_date") {
              return date && date.valueOf() < new Date(startDate);
            }
            return null;
          },
        };
      }
    },
    // 远程搜索
    changData(val, items) {
      console.log(val);
      const item = {
        items,
        key: items.key,
        val,
      };
      bus.$emit("changeInputData", item);
    },
    // 选中选项中的值
    changselectData(val, items) {
      const selectCompandy = {
        items,
        val,
      };
      bus.$emit("changselectData", selectCompandy);
    },
    // 清空下拉框选项
    clearQuery(items) {
      const item = {
        items,
        key: items.key,
        val: "",
      };
      bus.$emit("changeInputData", item);
    },
    // 多选上传
    uploadFileFuc1(file, items) {
      console.log(file, 222);
      const fileParams = getUploadFileParams(file);
      const formData = new FormData();
      fileParams.then((params) => {
        formData.append("key", params.key);
        formData.append("policy", params.policy);
        formData.append("OSSAccessKeyId", params.OSSAccessKeyId);
        formData.append("success_action_status", "200");
        formData.append("signature", params.signature);
        formData.append("file", file);
        uploadFile(params.host, formData).then(() => {
          // 获取oss中的地址赋予表单中的图标
          const ossfile = `${params.host}${params.key}`;
          console.log(ossfile, items);
          if (items.value && items.value.length === 3) {
            this.$Message.warning("附件不能超过三个");
            return;
          }
          if (items.value === null) {
            items.value = [];
          }
          if (items.value) {
            items.value.push({
              name: file.name,
              url: ossfile,
            });
            this.$forceUpdate();
          }
        });
      });
    },
    // 上传申报材料
    uploadFileBtn(value, items, item) {
      this.uploadFileFuc(value, items, item);
    },
    uploadFileFuc(file, items, item) {
      const index = items.value.indexOf(item);
      if (items.oss_address.length === 0) {
        items.value.forEach(() => {
          items.oss_address.push("");
        });
      }
      const fileParams = getUploadFileParams(file);
      const formData = new FormData();
      fileParams.then((params) => {
        formData.append("key", params.key);
        formData.append("policy", params.policy);
        formData.append("OSSAccessKeyId", params.OSSAccessKeyId);
        formData.append("success_action_status", "200");
        formData.append("signature", params.signature);
        formData.append("file", file);
        uploadFile(params.host, formData).then(() => {
          // 获取oss中的地址赋予表单中的图标
          const ossfile = `${params.host}${params.key}`;
          console.log(ossfile, items);
          if (items.value) {
            items.oss_address.splice(index, 1, ossfile);
          }
          this.$forceUpdate();
          console.log(items.oss_address, 111);
        });
      });
    },
    // 上传文件之前的钩子
    handleBeforeUpload(val, item) {
      this.upload(val, item);
      return false;
    },
    upload(file, item) {
      const fileParams = getUploadFileParams(file);
      const formData = new FormData();
      fileParams.then((params) => {
        formData.append("key", params.key);
        formData.append("policy", params.policy);
        formData.append("OSSAccessKeyId", params.OSSAccessKeyId);
        formData.append("success_action_status", "200");
        formData.append("signature", params.signature);
        formData.append("file", file);
        uploadFile(params.host, formData).then(() => {
          // 获取oss中的地址赋予表单中的图标
          const ossfile = `${params.host}${params.key}`;
          console.log(ossfile, item);
          if (item.value) {
            item.value.push(ossfile);
          } else {
            item.value = [];
            this.$set(item, "value", [ossfile]);
          }
        });
      });
    },
    delImg(index, items) {
      items.value.splice(index, 1);
    },
  },
};
</script>

<style lang="less">
.the_td {
  .upload-box {
    padding: 24px 20px;
    .img-box {
      overflow: auto;
      display: inline-block;
      div {
        position: relative;
        display: inline-block;
        img {
          width: 192px;
          height: 244px;
          display: inline-block;
          margin-right: 10px;
        }
        .del-img {
          position: absolute;
          right: 2px;
          top: -1px;
          color: #de6767;
          cursor: pointer;
        }
      }
    }
  }

  .upload {
    display: inline-block;
    &.disable-upload .ivu-upload-drag {
      background: #f3f3f3;
      border: 1px solid #f3f3f3;
    }

    .ivu-upload-drag {
      width: 192px;
      height: 244px;
      color: #1492ff;
      border: 1px dashed #1492ff;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
  }
  .selectChoose {
    .ivu-select-input::placeholder {
      color: black;
    }
    .ivu-select-input:focus::-webkit-input-placeholder {
      color: transparent;
    }
  }
}
</style>
<style lang="less" scoped>
.the_td {
  .materialName {
    display: flex;
    height: 48px;
    align-items: center;
    border-bottom: 1px solid #f6f8f9;
    div {
      width: 35%;
      line-height: 47px;
      padding-left: 20px;
      background-color: #e6f3ff;
    }
  }
  .fileUpload {
    width: 150px;
    display: flex;
    flex-direction: column;
  }
  .ivu-upload {
    background-color: #ffffff;
    margin-left: 20px;
  }
  .del-btn {
    cursor: pointer;
  }
}
</style>
