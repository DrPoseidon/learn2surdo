<template>
  <div :class="$style.root">
    <b-input
      v-model="searchData.title"
      placeholder="Введите название для поиска"
      :class="$style.search"
    ></b-input>
    <b-table-simple
      :bordered="true"
      striped
      responsive
      sticky-header="400px"
      show-empty
    >
      <b-thead>
        <b-tr>
          <b-th>
            Категории
          </b-th>
          <b-th>
            Название
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="category in categories" :key="category._id">
          <b-td>
            <!--//////////////////////////////-->
            <b-button
              variant="warning"
              v-if="isChangeID !== category._id || isChangeID === undefined"
              @click="change(category.title, category._id)"
            >
              Изменить
            </b-button>

            <b-button
              variant="warning"
              @click="reset"
              v-if="isChangeID === category._id"
            >
              Отмена
            </b-button>
            <b-button
              variant="success"
              @click="send(category.title)"
              v-if="isChangeID === category._id"
              >Отправить</b-button
            >

            <b-button variant="danger" @click="deleteFromDB(category._id)"
              >Удалить</b-button
            >
            <!--//////////////////////////////-->
          </b-td>
          <b-td
            v-if="isChangeID !== category._id || isChangeID === undefined"
            >{{ category.title }}</b-td
          >
          <b-td v-if="isChangeID === category._id">
            <b-form-input
              type="text"
              :placeholder="category.title"
              :value="category.title"
              v-model="changeData.title"
            />
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  title: "L2SCategory",
  data() {
    return {
      isChangeID: undefined,
      changeData: {
        title: "",
      },
      searchData: {
        title: "",
      },
    };
  },
  methods: {
    ...mapActions(["REFRESH_CATEGORY_INFORMATION", "DELETE_CATEGORY_FROM_DB"]),
    change(title, id) {
      this.isChangeID = id;
      this.changeData.title = title;
    },
    reset() {
      this.isChangeID = undefined;
      this.changeData.title = "";
    },
    deleteFromDB(_id) {
      this.DELETE_CATEGORY_FROM_DB({ _id }).catch((err) => {
        console.log(err);
      });
    },
    send(title) {
      if (this.changeData.title) {
        if (this.changeData.title !== title) {
          this.REFRESH_CATEGORY_INFORMATION({
            _id: this.isChangeID,
            title: this.changeData.title,
          }).then(() => {
            this.reset();
          });
        } else {
          console.log("Поля не изменились");
        }
      } else {
        console.log("Одно или оба из полей пустые");
      }
    },
  },
  computed: {
    ...mapGetters(["CATEGORIES"]),
    categories() {
      const filtered = this.CATEGORIES.filter((item) => {
        return Object.keys(this.searchData).every((key) =>
          String(item[key]).includes(this.searchData[key])
        );
      });
      return filtered.length > 0 ? filtered : [];
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
