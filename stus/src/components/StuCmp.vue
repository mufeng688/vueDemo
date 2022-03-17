<template>
  <div>
    <label>姓名：</label>
    <input type="text" placeholder="请输入姓名" v-model="stu.sname" />
    <br />
    <label>生日：</label>
    <input type="date" placeholder="请输入生日" v-model="stu.birth" />
    <br />
    <label>性别：</label>
    <input type="radio" name="sex" value="男" v-model="stu.sex" />男
    <input type="radio" name="sex" value="女" v-model="stu.sex" />女
    <br />
    <label>电话：</label>
    <input type="tel" placeholder="请输入电话" v-model="stu.mobile" />
    <br />
    <input type="button" value="保存" @click="add" />
    <div>
      <input type="text" placeholder="请输入查询条件" v-model="qs" />
    </div>
    <table border="1">
      <tr>
        <th>编号</th>
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
          <input type="button" value="删除" @click="del(s.id)" />
          <input type="button" value="修改" @click="edit(s.id)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { ref, watch, reactive } from "vue";
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
        .get("/ajax/qy", { params: { nm: name } })
        .then((resp) => {
          // console.log(resp.data);
          stus.value = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    watch(
      qs,
      (val) => {
        //   console.log(val);
        qey(val);
      },
      { immediate: true }
    );

    const add = () => {
      //   console.log("执行添加");
      axios
        .post("/ajax/save", Qs.stringify(stu))
        .then((resp) => {
          console.log(stu);
          if (resp.data.ret > 0) {
            qs.value = stu.sname;
            stu.id = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const del = (id) => {
      console.log(id);
      axios
        .get("/ajax/del", { params: { id: id } })
        .then((resp) => {
          //   console.log(stu);
          if (resp.data.ret > 0) {
            qey("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const edit = (id) => {
      axios
        .get("/ajax/detail", { params: { id: id } })
        .then((resp) => {
          // console.log(resp.data);
          let { sname, birth, sex, mobile } = resp.data;
          stu.id = id;
          stu.sname = sname;
          stu.birth = birth;
          stu.sex = sex;
          stu.mobile = mobile;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      qs,
      stus,
      stu,
      add,
      del,
      edit,
    };
  },
};
</script>
    
<style>
input {
  margin: 5px;
}
table {
  margin: 0 auto;
}
</style>