<template>
  <div>
    <label>姓名：</label>
    <input type="text" v-model="stu.sname" />
    <br />
    <label>生日：</label>
    <input type="date" v-model="stu.birth" />
    <br />
    <label>性别：</label>
    <input type="radio" name="sex" value="男" v-model="stu.sex" />男
    <input type="radio" name="sex" value="女" v-model="stu.sex" />女
    <br />
    <label>电话：</label>
    <input type="tel" v-model="stu.mobile" />
    <br />
    <input type="button" value="保存" @click="add" />
    <br />
    <input type="text" placeholder="输入查询条件" v-model="qs" />
    <div>
      <table border="1">
        <tr>
          <th>姓名</th>
          <th>生日</th>
          <th>性别</th>
          <th>电话</th>
          <th>操作</th>
        </tr>
        <tr v-for="(s, i) of stus.value" :key="i">
          <td>{{ s.id }}</td>
          <td>{{ s.sname }}</td>
          <td>{{ s.birth }}</td>
          <td>{{ s.sex }}</td>
          <td>{{ s.mobile }}</td>
          <td>
            <input type="button" value="删除" @click="del" />
            <input type="button" value="修改" @click="update" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive, watch } from "vue";
import Qs from "qs";
export default {
  setup() {
    let stus = reactive([]);
    let qs = ref("");
    let stu = reactive({
      id: "",
      sname: "",
      birth: "",
      sex: "男",
      mobile: "",
    });
    const qey = (name) => {
      axios
        .get("", { params: { nm: name } })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    watch(
      qs,
      (val) => {
        qey();
      },
      { immmediate: true }
    );
    const add = () => {
      console.log("添加");
    };
    const update = () => {
      console.log("修改");
    };
    const del = () => {
      console.log("删除");
    };
    return {
      qs,
      stu,
      stus,
      add,
      update,
      del,
    };
  },
};
</script>

<style>
table {
  margin: 0 auto;
}
div {
  margin: 20px;
}
</style>