<template>
  <div :class="$style.root">
    <div :class="$style.search">
      <b-input
        v-model="searchDataArr[categoryNumber].title"
        placeholder="Введите название для поиска"
      ></b-input>
      <b-input
        v-model="searchDataArr[categoryNumber].description"
        placeholder="Введите описание для поиска"
      ></b-input>
    </div>
    <b-table-simple
      :bordered="true"
      striped
      responsive
      sticky-header="400px"
      show-empty
    >
      <b-thead>
        <b-tr>
          <b-th
            v-for="(columnName, columnNameIndex) in columnNames"
            :key="columnNameIndex"
            >{{ columnName[0].toUpperCase() + columnName.slice(1) }}</b-th
          >
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr
          v-for="(element, index) in getCategory(rows, categoryNumber)"
          :key="element._id"
        >
          <b-td>
            <b-button
              v-if="
                isChangeIndex === undefined ||
                  isChangeIndex !== index ||
                  isChangeID !== element._id
              "
              variant="warning"
              @click="
                change(index, element.title, element.description, element._id)
              "
              >Изменить</b-button
            >
            <b-button
              v-if="isChangeIndex === index && isChangeID === element._id"
              variant="warning"
              @click="reset"
              >Отмена</b-button
            >
            <b-button
              v-if="
                isChangeIndex !== undefined &&
                  isChangeIndex === index &&
                  isChangeID === element._id
              "
              variant="success"
              @click="
                send(
                  element.title,
                  element.description,
                  element.fileName,
                  element._id
                )
              "
              >Отправить</b-button
            >
            <b-button variant="danger" @click="deleteFromDB(element._id)"
              >Удалить</b-button
            >
          </b-td>
          <b-td v-if="isChangeIndex !== index || isChangeID !== element._id">
            {{ element.title }}
          </b-td>
          <b-td v-if="isChangeIndex !== index || isChangeID !== element._id">
            {{ element.description }}
          </b-td>
          <b-td v-if="isChangeIndex !== index || isChangeID !== element._id">
            {{ element.fileName }}
          </b-td>
          <b-td v-if="isChangeIndex === index && isChangeID === element._id">
            <b-form-input
              type="text"
              :placeholder="element.title"
              :value="element.title"
              v-model="changeData.title"
            />
          </b-td>
          <b-td v-if="isChangeIndex === index && isChangeID === element._id">
            <b-form-input
              type="text"
              :placeholder="element.description"
              :value="element.description"
              v-model="changeData.description"
            />
          </b-td>
          <b-td v-if="isChangeIndex === index && isChangeID === element._id">
            <b-form-file
              v-model="changeData.fileName"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file
          ></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  title: "L2SCategoryTable",
  data() {
    return {
      isChangeIndex: undefined,
      isChangeID: undefined,
      changeData: {
        title: "",
        description: "",
        fileName: null,
      },
    };
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
    columnNames: {
      type: Array,
      required: true,
    },
    categoryNumber: {
      type: Number,
      required: true,
    },
    searchDataArr: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(["DELETE_GESTURE_FROM_DB", "REFRESH_GESTURE_INFORMATION"]),
    getCategory(el, index) {
      const filtered = el.filter((item) => {
        return Object.keys(this.searchDataArr[index]).every((key) =>
          String(item[key]).includes(this.searchDataArr[index][key])
        );
      });
      return filtered.length > 0 ? filtered : [];
    },
    change(index, title, description, elID) {
      this.isChangeIndex = index;
      this.isChangeID = elID;
      this.changeData.title = title;
      this.changeData.description = description;
    },
    reset() {
      this.isChangeIndex = undefined;
      this.isChangeID = undefined;
      this.changeData.title = "";
      this.changeData.description = "";
      this.changeData.fileName = null;
    },
    deleteFromDB(id) {
      this.DELETE_GESTURE_FROM_DB({ id }).catch((err) => {
        console.log(err);
      });
    },
    send(title, description, fileName, id) {
      if (this.changeData.title && this.changeData.description) {
        if (
          this.changeData.title !== title ||
          this.changeData.description !== description
        ) {
          if (this.changeData.fileName) {
            if (
              this.changeData.fileName.name !== fileName &&
              this.changeData.fileName.name.length
            ) {
              this.REFRESH_GESTURE_INFORMATION({
                _id: id,
                title: this.changeData.title,
                description: this.changeData.description,
                fileName: this.changeData.fileName.name,
              }).then(() => {
                this.reset();
              });
            }
          } else {
            this.REFRESH_GESTURE_INFORMATION({
              _id: id,
              title: this.changeData.title,
              description: this.changeData.description,
            }).then(() => {
              this.reset();
            });
          }
        } else {
          console.log("Поля не изменились");
        }
      } else {
        console.log("Одно или оба из полей пустые");
      }
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
